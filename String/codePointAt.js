// This file is part of jdh8/polyfill.
//
// Copyright (C) 2017 Chen-Pang He <chen.pang.he@jdh8.org>
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

"use strict";

String.prototype.codePointAt = String.prototype.codePointAt || function(index)
{
	index = index|0;

	var first = this.charCodeAt(index)|0;
	var high = (first - 0xD800) >>> 0;

	if (high < 0x400) {
		var second = this.charCodeAt(index + 1)|0;
		var low = (second - 0xDC00) >>> 0;
		
		if (low < 0x400)
			return low | high << 10 | 0x10000;
	}

	return first;
}
