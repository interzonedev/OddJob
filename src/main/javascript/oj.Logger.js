(function(context) {
	"use strict";

	var logLevels, allowableLevel;

	logLevels = {
		"TRACE": 1,
		"DEBUG": 2,
		"INFO": 3,
		"WARN": 4,
		"ERROR": 5,
		"FATAL": 6
	};

	allowableLevel = function(loggerLevel, messageLevel) {
		var loggerLevelNum, messageLevelNum;

		loggerLevelNum = logLevels[loggerLevel];
		messageLevelNum = logLevels[messageLevel];

		if (!loggerLevelNum) {
			throw(new Error("Unsupported logger logging level: \"" + loggerLevel + "\""));
		}

		if (!messageLevelNum) {
			throw(new Error("Unsupported message logging level: \"" + messageLevel + "\""));
		}

		return (messageLevelNum <= loggerLevelNum);
	};

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
		name: "",

		/**
		 * @lends oj.Logger.prototype
		 * @property {String} level The minimum level of logging below which messages will not be output to the logging
		 *                          console.
		 */
		level: "DEBUG",

		/**
		 * @lends oj.Logger.prototype
		 * @property {Boolean} prependLevelToMessage Whether or not to prepend the log level to each log message.
		 */
		prependLevelToMessage: false,

		/**
		 * @lends oj.Logger.prototype
		 * @property {Boolean} alertLogErrors Whether or not to send an alert when there is an error attemtping to call
		 *                                    a log method on the logger instance.
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

			if (!params) {
				return;
			}

			this.logger = params.logger || null;
			this.name = params.name || "";
			this.level = params.level || "DEBUG";
			this.prependLevelToMessage = params.prependLevelToMessage || false;
			this.alertLogErrors = params.alertLogErrors || false;
		},

		/**
		 * Initializs this Logger instance.  Default the logger instance to the console if it is not specified.
		 */
		init: function() {
			var propName = null, loggerMethodNames, i = 0, loggerMethodName;

			this._super();

			// If the logger instance is not set, set it.
			if (!this.logger) {
				this.logger = {};

				// If the console is present copy its properties onto the logger instance.
				if (context.console) {
					for (propName in context.console) {
						if (context.console.hasOwnProperty(propName)) {
							this.logger[propName] = context.console[propName]; 
						}
					}	
				}
			}

			loggerMethodNames = [ "trace", "debug", "info", "warn", "error", "fatal" ];

			// If the logger instance is missing a logger method set it to an anonymous no-op function.
			for (i in loggerMethodNames) {
				loggerMethodName = loggerMethodNames[i]; 
				if (!this.logger[loggerMethodName]) {
					this.logger[loggerMethodName] = function() {};
				}
			}
		},

		/**
		 * Logs messages at the trace level.
		 * 
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		trace: function(message, functionHandle) {
			this.logMessage("TRACE", message, functionHandle);
		},

		/**
		 * Logs messages at the debug level.
		 * 
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		debug: function(message, functionHandle) {
			this.logMessage("DEBUG", message, functionHandle);
		},

		/**
		 * Logs messages at the info level.
		 * 
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		info: function(message, functionHandle) {
			this.logMessage("INFO", message, functionHandle);
		},

		/**
		 * Logs messages at the warn level.
		 * 
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		warn: function(message, functionHandle) {
			this.logMessage("WARN", message, functionHandle);
		},

		/**
		 * Logs messages at the error level.
		 * 
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		error: function(message, functionHandle) {
			this.logMessage("ERROR", message, functionHandle);
		},

		/**
		 * Logs messages at the fatal level.
		 * 
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		fatal: function(message, functionHandle) {
			this.logMessage("FATAL", message, functionHandle);
		},

		/**
		 * Logs messages at the specified level.
		 *
		 * @param {String} messageLevel The level at which to output the logging message.
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 */
		logMessage: function(messageLevel, message, functionHandle) {
			var formattedMessage, errorMessage;

			if (!this.logger) {
				return;
			}

			if (!allowableLevel(this.level, messageLevel)) {
				return;
			}

			functionHandle = functionHandle || "";

			formattedMessage = this.formatMessage(messageLevel, message, functionHandle);

			try {
				this.loggerCall(messageLevel.toLowerCase(), [formattedMessage]);
			} catch(e) {
				if (this.alertLogErrors) {
					errorMessage = this.name + " - Error attempt to log with " + messageLevel;
					alert(errorMessage);
				}
			}
		},

		/**
		 * Creates a formatted logging message according to the specified parameters.
		 * 
		 * @param {String} messageLevel The level at which to output the logging message.
		 * @param {String} message The message to output to the logging console.
		 * @param {String} [functionHandle] The name of the function in which the logging is taking place. 
		 * 
		 * @returns {String} A formatted logging message according to the specified parameters.
		 */
		formatMessage: function(messageLevel, message, functionHandle) {
			var formattedMessage;

			formattedMessage = "";

			if (this.prependLevelToMessage) {
				formattedMessage += messageLevel.toUpperCase() + " - ";
			}

			formattedMessage += this.name;

			if (/\S/.test(functionHandle)) {
				formattedMessage += "[" + functionHandle + "]";
			}

			if (/\S/.test(formattedMessage)) {
				formattedMessage += ": ";
			}

			if (/\S/.test(message)) {
				if (("object" === typeof(message)) && JSON && JSON.stringify) {
					formattedMessage += JSON.stringify(message);
				} else {
					formattedMessage += message;	
				}
			}

			return formattedMessage;
		},

		/**
		 * Calls the method with the specified name on the logger instance with the specified array of arguments.  This
		 * is a convenience method for making calls directly on the underlying logger instance.
		 * 
		 * @param {String} methodName The name of the method to call on the logger instance.
		 * @param {Array} args The array of arguments to pass to the method.
		 * 
		 * @returns {Object} Returns whatever the specified method call returns.  If the logger is not set returns null.
		 */
		loggerCall: function(methodName, args) {
			if (!this.logger) {
				return null;
			}

			return this.logger[methodName].apply(this.logger, args);
		}
	},
	{
		/**
		 * @lends oj.Logger
		 * @property {String} className The name of this class.
		 */
		className: "oj.Logger"
	});
}(this));
