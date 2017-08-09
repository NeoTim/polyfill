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
	const converter =
	{
		"datetime-local": s => s,
		date: s => s,
		time: s => "1970-01-01T" + s + "Z"
	}

	const extractor =
	{
		"datetime-local": s => s.slice(0, -1),
		date: s => /[^T]*/.exec(s)[0],
		time: s => /T([^Z]*)/.exec(s)[1]
	}

	/**
	 * @summary Validate and convert string to a Date instance
	 *
	 * Date constructor creates an invalid object if the applied string is
	 * invalid.  This function returns null otherwise to conform
	 * HTMLInputElement#valueAsDate getter.
	 *
	 * @param {string} string
	 *
	 * @returns {?Date}
	 */
	const MaybeDate = string => (time => time == time ? new Date(time) : null)(Date.parse(string));

	Object.defineProperty(HTMLInputElement.prototype, "valueAsDate",
	{
		get: function()
		{
			const f = converter[this.getAttribute("type").toLowerCase()];
			return f ? MaybeDate(f(this.value)) : null;
		},
		set: function(date)
		{
			const s = date.toJSON();
			this.value = s || extractor[this.getAttribute("type").toLowerCase()](s);
		}
	})
}
