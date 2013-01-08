$(function() {
	var testLogger;

	testLogger = null;

	module("oj.Logger", {
		setup: function() {
			testLogger = {

				levelMessages: {
					"TRACE": [],
					"DEBUG": [],
					"INFO": [],
					"WARN": [],
					"ERROR": [],
					"FATAL": []
				},

				trace: function(message) {
					this.levelMessages.TRACE.push(message);
				},

				debug: function(message) {
					this.levelMessages.DEBUG.push(message);
				},

				info: function(message) {
					this.levelMessages.INFO.push(message);
				},

				warn: function(message) {
					this.levelMessages.WARN.push(message);
				},

				error: function(message) {
					this.levelMessages.ERROR.push(message);
				},

				fatal: function(message) {
					this.levelMessages.FATAL.push(message);
				}
			};
		},
		teardown: function() {
			testLogger = null;
		}
	});

	// oj.Logger class tests
	test("oj.Logger class defined", function() {
		expect(1);

		strictEqual(typeof(oj.Logger), "function", "oj.Logger is defined as a class");
	});

	test("oj.Logger class name", function() {
		expect(1);

		strictEqual(oj.Logger.className, "oj.Logger", "oj.Logger.className is set");
	});

	// oj.Logger getInstance method tests
	test("oj.Logger.getInstance called with no params sets default properties on instance", function() {
		var logger;

		expect(10);

		logger = oj.Logger.getInstance();

		ok(logger, "oj.Logger.getInstance called with no params returns a defined value");
		strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with no params returns an instance");
		strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with no params returns an instance with the class name set");
		strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with no params returns an instance with the class set");
		strictEqual(logger.name, "", "oj.Logger.getInstance called with no params returns an instance with the default name property set");
		strictEqual(logger.level, "DEBUG", "oj.Logger.getInstance called with no params returns an instance with the default level property set");
		strictEqual(logger.logger, null, "oj.Logger.getInstance called with no params returns an instance with the logger property set to null");
		strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with no params returns an instance with the prependLevelToMessage property set to false");
		strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with no params returns an instance with the alertLogErrors property set to false");
	});

	test("oj.Logger.getInstance called with non defined values", function() {
		expect(15 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var logger, loggerProperty;

			logger = oj.Logger.getInstance(nonDefinedValue, true);

			loggerProperty = logger.logger;

			ok(logger, "oj.Logger.getInstance called with " + nonDefinedValue + " returns a defined value");
			strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance");
			strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instantiated instance");
			strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the class name set");
			strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the class set");
			strictEqual(logger.name, "", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the default name property set");
			strictEqual(logger.level, "DEBUG", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the default level property set");
			strictEqual(typeof(loggerProperty), "object", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the logger property set");
			strictEqual(typeof(loggerProperty.trace), "function", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the logger property set with a trace method");
			strictEqual(typeof(loggerProperty.debug), "function", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the logger property set with a debug method");
			strictEqual(typeof(loggerProperty.info), "function", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the logger property set with a info method");
			strictEqual(typeof(loggerProperty.warn), "function", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the logger property set with a warn method");
			strictEqual(typeof(loggerProperty.error), "function", "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the logger property set with a error method");			
			strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the prependLevelToMessage property set to false");
			strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with " + nonDefinedValue + " returns an instance with the alertLogErrors property set to false");
		});
	});

	test("oj.Logger.getInstance called with empty params and no initialization sets default properties on instance", function() {
		var logger;

		expect(10);

		logger = oj.Logger.getInstance({});

		ok(logger, "oj.Logger.getInstance called with empty params and no initialization returns a defined value");
		strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with empty params and no initialization returns an instance");
		strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the default instanceName set");
		strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with empty params and no initialization returns an instance with the class name set");
		strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the class set");
		strictEqual(logger.name, "", "oj.Logger.getInstance called with empty params and no initialization returns an instance with the default name property set");
		strictEqual(logger.level, "DEBUG", "oj.Logger.getInstance called with empty params and no initialization returns an instance with the default level property set");
		strictEqual(logger.logger, null, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the logger property set to null");
		strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the prependLevelToMessage property set to false");
		strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the alertLogErrors property set to false");
	});

	test("oj.Logger.getInstance called with empty params and initialization sets default properties on instance", function() {
		var logger, loggerProperty;

		expect(15);

		logger = oj.Logger.getInstance({}, true);

		loggerProperty = logger.logger;

		ok(logger, "oj.Logger.getInstance called with empty params and initialization returns a defined value");
		strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with empty params and initialization returns an instance");
		strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with empty params and initialization returns an instance with the default instanceName set");
		strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with empty params and initialization returns an instance with the class name set");
		strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with empty params and initialization returns an instance with the class set");
		strictEqual(logger.name, "", "oj.Logger.getInstance called with empty params and initialization returns an instance with the default name property set");
		strictEqual(logger.level, "DEBUG", "oj.Logger.getInstance called with empty params and initialization returns an instance with the default level property set");
		strictEqual(typeof(loggerProperty), "object", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set");
		strictEqual(typeof(loggerProperty.trace), "function", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set with a trace method");
		strictEqual(typeof(loggerProperty.debug), "function", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set with a debug method");
		strictEqual(typeof(loggerProperty.info), "function", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set with a info method");
		strictEqual(typeof(loggerProperty.warn), "function", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set with a warn method");
		strictEqual(typeof(loggerProperty.error), "function", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set with a error method");
		strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with empty params and initialization returns an instance with the prependLevelToMessage property set to false");
		strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with empty params and initialization returns an instance with the alertLogErrors property set to false");
	});

	/**
	 * This is for testing the use of the native console logger when no 3rd party logger instance is specified.  It's
	 * difficult to make meaningful assertions on the console however.  The console output itself needs to be inspected
	 * manually to see if this worked.  There should be a trace and 
	 */
	test("oj.Logger.logMessage called with default initialized instance - test the native console", function() {
		var logger;

		expect(0);

		logger = oj.Logger.getInstance({
			level: "FATAL"
		}, true);

		logger.trace("trace logger level");
		logger.debug("debug logger level");
		logger.info("info logger level");
		logger.warn("warn logger level");
		logger.error("error logger level");
		logger.fatal("fatal logger level");
	});

	// oj.Logger trace method tests
	test("oj.Logger.trace called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "TRACE"
		}, true);

		logger.trace("trace logger level");

		logger.level = "DEBUG";
		logger.trace("debug logger level");

		logger.level = "INFO";
		logger.trace("info logger level");

		logger.level = "WARN";
		logger.trace("warn logger level");

		logger.level = "ERROR";
		logger.trace("error logger level");

		logger.level = "FATAL";
		logger.trace("fatal logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 6, "oj.Logger.trace called with different logger levels should log all messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.trace called with different logger levels should log no messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.trace called with different logger levels should log no messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.trace called with different logger levels should log no messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.trace called with different logger levels should log no messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.trace called with different logger levels should log no messages at the fatal level");
	});

	// oj.Logger level method tests
	test("oj.Logger logging methods called with TRACE logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "TRACE"
		}, true);

		logger.trace("trace logger level");
		logger.debug("debug logger level");
		logger.info("info logger level");
		logger.warn("warn logger level");
		logger.error("error logger level");
		logger.fatal("fatal logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called with TRACE logger levels should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.debug called with TRACE logger levels should not log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.info called with TRACE logger levels should not log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.warn called with TRACE logger levels should not log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.error called with TRACE logger levels should not log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.fatal called with TRACE logger levels should not log a message");
	});
});
