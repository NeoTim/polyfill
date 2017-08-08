// This file is part of jdh8/polyfill.
//
// Copyright (C) 2017 Chen-Pang He <chen.pang.he@jdh8.org>
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

"use strict";

if (!("valueAsDate" in HTMLInputElement.prototype))
{
	function MaybeDate(string)
	{
		const time = Date.parse(string);
		return time == time ? new Date(time) : null;
	}

	function identity(x) { return x }

	const converter =
	{
		"datetime-local": identity,
		date: identity,
		time: function(s) { return "1970-01-01T" + s + "Z" }
	}

	const extractor =
	{
		"datetime-local": function(s) { return s.slice(0, -1) },
		date: function(s) { return /[^T]*/.exec(s)[0] },
		time: function(s) { return /T([^Z]*)/.exec(s)[1] }
	}

	Object.defineProperty(HTMLInputElement.prototype, "valueAsDate",
	{
		get: function()
		{
			const f = converter[this.getAttribute("type").toLowerCase()];
			return f ? MaybeDate(f(this.value)): null;
		},
		set: function(date)
		{
			const s = date.toJSON();
			this.value = s || extractor[this.getAttribute("type").toLowerCase()](s);
		}
	})
}
