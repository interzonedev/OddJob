(function() {
	"use strict";

	/**
	 * @class
	 * @extends oj.OjObject
	 * <br />
	 * General logging class.
	 */
	oj.Logger = oj.OjObject.extend({
		/**
		 * @lends oj.Logger.prototype
		 * @property {Object} logger The 3rd party framework logger instance to which to send log messages.  It should
		 *                           define the trace, debug, warn and error methods.
		 */
		logger: null,

		/**
		 * @lends oj.Logger.prototype
		 * @property {String} name The name of this logger.  This value will be prepended to every message.
		 */
		name: null,

		/**
		 * @lends oj.Logger.prototype
		 * @property {String} level The minimum level of logging below which messages will not be output to the logging
		 *                          console.
		 */
		level: null,

		/**
		 * @lends oj.Logger.prototype
		 * @property {Boolean} prependLevelToMessage Whether or not to prepend the log level to each log message.
		 */
		prependLevelToMessage: false,

		/**
		 * @lends oj.Logger.prototype
		 * @property {Boolean} level Whether or not to send an alert when there is an error attemtping to call a log
		 *                           method on the logger instance.
		 */
		alertLogErrors: false,

		/**
		 * Creates a new instance of this class.
		 * 
		 * @param {Object} params An associative array of instantiation
		 *                        properties.<br />
		 *                        params.logger {Object} A logger instance that has the standard logging methods.
		 *                        params.name {String} The name of this logger.<br />
		 *                        params.level {String} The level of this logger.
		 *                        params.prependLevelToMessage {String} Whether or not to prepend the log level to each
		 *                                                              message.
		 *                        params.alertLogErrors {String} Whether or not to alert each log messag if the call to
		 *                                                       the logger throws an error.
		 */
		construct: function(params) {
			this._super(params);
			this.logger = params.logger;
			this.name = params.name || "";
			this.level = params.level || "debug";
			this.prependLevelToMessage = params.prependLevelToMessage || false;
			this.alertLogErrors = params.alertLogErrors || false;
		},

		/**
		 * Initializs this Logger instance.  Default the logger instance to the console if it is not specified.
		 */
		init: function() {
			this._super();

			// Default to the console if no 3rd party framework logger is set.
			if (!this.logger) {
				try {
					this.logger = $.extend({}, console);
				} catch(e) {}
			}
		},

		/**
		 * Logs messages at the trace level.
		 * 
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		trace: function(msg, functionHandle, category) {
			if($.inArray(this.level, ["trace"]) > -1) {
				this.logMessage("trace", msg, functionHandle, category);
			}
		},

		/**
		 * Logs messages at the debug level.
		 * 
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		debug: function(msg, functionHandle, category) {
			if($.inArray(this.level, ["trace", "debug"]) > -1) {
				this.logMessage("debug", msg, functionHandle, category);
			}
		},

		/**
		 * Logs messages at the info level.
		 * 
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		info: function(msg, functionHandle, category) {
			if($.inArray(this.level, ["trace", "debug", "info"]) > -1) {
				this.logMessage("info", msg, functionHandle, category);
			}
		},

		/**
		 * Logs messages at the warn level.
		 * 
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		warn: function(msg, functionHandle, category) {
			if($.inArray(this.level, ["trace", "debug", "info", "warn"]) > -1) {
				this.logMessage("warn", msg, functionHandle, category);
			}
		},

		/**
		 * Logs messages at the error level.
		 * 
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		error: function(msg, functionHandle, category) {
			if($.inArray(this.level, ["trace", "debug", "info", "warn", "error"]) > -1) {
				this.logMessage("error", msg, functionHandle, category);
			}
		},

		/**
		 * Logs messages at the fatal level.
		 * 
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		fatal: function(msg, functionHandle, category) {
			if($.inArray(this.level, ["trace", "debug", "info", "warn", "error", "fatal"]) > -1) {
				this.logMessage("fatal", msg, functionHandle, category);
			}
		},

		/**
		 * Logs messages at the specified level.
		 *
		 * @param {String} level The level at which to output the logging message.
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 */
		logMessage: function(level, msg, functionHandle, category) {
			var logMessage, errorMessage;

			if (!this.logger) {
				return;
			}
			functionHandle = functionHandle || "";
			category = category || this.clazz.defaultCategory;
			if (undefined === this.clazz.categories[category]) {
				this.clazz.categories[category] = true;
			}
			if (this.clazz.categories[category]) {
				logMessage = this.formatMessage(level, msg, functionHandle, category);
				try {
					this.logger[level](logMessage);
				} catch(e) {
					if (this.alertLogErrors) {
						errorMessage = this.name + " - Error attempt to log with " + level;
						alert(errorMessage);
					}
				}
			}
		},

		/**
		 * Calls the method with the specified name on the logger instance with the specified array of arguments.
		 * 
		 * @param {String} methodName The name of the method to call on the logger instance.
		 * @param {Array} args The array of arguments to pass to the method.
		 * 
		 * @returns {Object} Returns whatever the specified method call returns.
		 */
		loggerCall: function(methodName, args) {
			return this.logger[methodName].apply(this.logger, args);
		},

		/**
		 * Creates a formatted logging message according to the specified parameters.
		 * 
		 * @param {String} level The level at which to output the logging message.
		 * @param {String} msg The message to output to the logging console.
		 * @param {String} functionHandle The name of the function in which the debugging is taking place.
		 * @param {String} category The name of the logging category in which to place the specified logging message. 
		 * 
		 * @returns {String} A formatted logging message according to the specified parameters.
		 */
		formatMessage: function(level, msg, functionHandle, category) {
			var message;

			message = "";

			if (this.prependLevelToMessage) {
				message += level.toUpperCase() + " - ";
			}

			message += this.name;

			if (/\S/.test(functionHandle)) {
				message += "[" + functionHandle + "]";
			}

			if (/\S/.test(category) && (category !== this.clazz.defaultCategory)) {
				message += "[" + category + "]";
			}

			message += ": ";

			if (/\S/.test(msg)) {
				if (("object" === typeof(msg)) && JSON && JSON.stringify) {
					message += JSON.stringify(msg);
				} else {
					message += msg;	
				}
			}

			return message;
		}
	},
	{
		/**
		 * @lends oj.Logger
		 * @property {String} className The name of this class.
		 */
		className: "oj.Logger",

		/**
		 * @lends oj.Logger
		 * @property {Object} categories A collection of names by which to categorize logging messages.
		 */
		categories: {},

		/**
		 * @lends oj.Logger
		 * @constant
		 * @property {String} defaultCategory The default logging category.  This label will not be output in the log
		 *                                    message.
		 */
		defaultCategory: "default"
	});
}());
