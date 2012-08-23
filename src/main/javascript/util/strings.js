(function() {
	"use strict";

	oj.namespace("oj.util");

	/**
	 * @namespace
	 * 
	 * Utility methods for handling strings.
	 */
	oj.util.strings = {
		/**
		 * Determines whether or not the specified input is a string.
		 * 
		 * @param {Object} obj The input to examine.
		 * 
		 * @returns {Boolean} Returns true if the specified input is not undefined, not null and is a string, otherwise
		 *                    false.
		 */
		isString: function(obj) {
			return oj.isDefined(obj) && (String === obj.constructor);
		},

		/**
		 * Determines whether or not the specified input is a non blank string.
		 * 
		 * @param {Object} obj The input to examine.
		 * 
		 * @returns {Boolean} Returns false if the specified input is undefined or null.  Returns null if the specified
		 *                    input is not a string.  If the specified input is defined and is a string, returns true if
		 *                    the specified input has at least one non whitespace character, otherwise false.
		 */
		isNotBlank: function(obj) {
			if (!oj.isDefined(obj)) {
				return false;
			}
			
			if (!oj.util.strings.isString(obj)) {
				return null;
			}

			return /\S/.test(obj);
		},

		/**
		 * Determines whether or not the specified input is a blank string.
		 * 
		 * @param {Object} obj The input to examine.
		 * 
		 * @returns {Boolean} Returns true if the specified input is undefined or null.  Returns null if the specified
		 *                    input is not a string.  If the specified input is defined and is a string, returns true if
		 *                    the specified input has only whitespace characters, otherwise false.
		 */
		isBlank: function(obj) {
			if (!oj.isDefined(obj)) {
				return true;
			}
			
			if (!oj.util.strings.isString(obj)) {
				return null;
			}

			return !/\S/.test(obj);
		}
	};
}());
