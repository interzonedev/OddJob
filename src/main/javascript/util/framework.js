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
		},

		/**
		 * Determines whether or not the specified input is an object.
		 * 
		 * @param {Object} input The input to examine.
		 * 
		 * @returns {Boolean} True if the specified input is defined, not null, has an Object constructor, and not an
		 *                    array, otherwise false.
		 */
		isObject: function(input) {
			return (!!input && (Object === input.constructor) && !oj.util.framework.isArray(input));
		},

		/**
		 * Determines whether or not the specified input is an array.
		 * 
		 * @param {Object} input The input to examine.
		 * 
		 * @returns {Boolean} True if the specified input is an array, otherwise false.
		 */
		isArray: function(input) {
			return ("[object Array]" === Object.prototype.toString.apply(input));
		}
	};
}());
