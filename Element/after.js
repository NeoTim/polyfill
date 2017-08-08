// This file is part of jdh8/polyfill.
//
// Copyright (C) 2017 Chen-Pang He <chen.pang.he@jdh8.org>
//
// This Source Code Form is subject to the terms of the Mozilla
// Public License v. 2.0. If a copy of the MPL was not distributed
// with this file, You can obtain one at http://mozilla.org/MPL/2.0/.

"use strict";
{
	function Fragment(array)
	{
		return array.map(x => x instanceof Node ? x : document.createTextNode(x))
			.reduce((fragment, node) => fragment.appendChild(node).parentNode, document.createDocumentFragment());
	}

	[Element.prototype, DocumentType.prototype, CharacterData.prototype].forEach(function(proto)
	{
		proto.after = proto.after || function(...list) { this.parentNode.insertBefore(Fragment(list), this.nextSibling) };
		proto.before = proto.before || function(...list) { this.parentNode.insertBefore(Fragment(list), this) };
	});

	[Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function(proto)
	{
		proto.append = proto.append || function(...list) { this.appendChild(Fragment(list)) };
		proto.prepend = proto.prepend || function(...list) { this.insertBefore(Fragment(list), this.firstChild) };
	});
}
