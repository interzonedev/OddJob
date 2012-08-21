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
		},

		/**
		 * Returns a function that executes the specified function in the specified context when called.
		 * 
		 * @param {Object} context The context in which the function executes. The context will be the object the "this"
		 *                         keyword refers to inside the function definition.
		 * @param {Function} func The function that should execute in the specified context when called.
		 * 
		 * @returns {Function} An anonymous function that executes func in context, and returns whatever func returns.
		 *                     If func does not have a return statement, the JavaScript interpretter will return an
		 *                     undefined value for func, and therefore the anonymous function will return undefined.
		 */
		getFunctionInContext: function(context, func) {
			if ("function" !== typeof(func)) {
				throw new Error("oj.util.framework.getFunctionInContext: The func argument must be a function");
			}

			return function() {
				return func.apply(context, arguments);
			};
		}
	};
}());
