(function() {
	"use strict";

	oj.namespace("oj.util");

	/**
	 * @namespace
	 * 
	 * General framework utility methods.
	 * 
	 * @requires oj.util.strings
	 */
	oj.util.framework = {
		/**
		 * Gets a (mostly) unique identifier using the client's timestamp and a random number. Optional prefix parameter
		 * prefixes the unique id with an arbitrary string.
		 * 
		 * @param {String} prefix A value that is prepended to the randomly generated identifier if it is a non blank
		 *                        string, otherwise no prefix is prepended.
		 * 
		 * @returns {String} A (mostly) unique identifier.
		 */
		getUniqueId : function(prefix) {
			var timeStamp, rand;

			prefix = prefix || "";
			if (!oj.util.strings.isString(prefix) || !/\S/.test(prefix)) {
				prefix = "";
			}

			timeStamp = (new Date().getTime()).toString();
			rand = (Math.floor((Math.random() * 100000))).toString();
			return prefix + timeStamp + rand;
		}
	};
}());
