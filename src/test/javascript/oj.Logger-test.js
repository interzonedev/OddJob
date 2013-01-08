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

	// oj.Logger logging method tests
	test("oj.Logger.trace called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger
		}, true);

		level = "TRACE";
		logger.trace("trace method called with TRACE logger level");

		logger.level = "DEBUG";
		logger.trace("trace method called with DEBUG logger level");

		logger.level = "INFO";
		logger.trace("trace method called with INFO logger level");

		logger.level = "WARN";
		logger.trace("trace method called with WARN logger level");

		logger.level = "ERROR";
		logger.trace("trace method called with ERROR logger level");

		logger.level = "FATAL";
		logger.trace("trace method called with FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 6, "oj.Logger.trace called with different logger levels should log messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.trace called with different logger levels should not log messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.trace called with different logger levels should not log messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.trace called with different logger levels should not log messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.trace called with different logger levels should not log messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.trace called with different logger levels should not log messages at the fatal level");
	});

	test("oj.Logger.debug called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger
		}, true);

		logger.level = "TRACE";
		logger.debug("debug method called with TRACE logger level");

		logger.level = "DEBUG";
		logger.debug("debug method called with DEBUG logger level");

		logger.level = "INFO";
		logger.debug("debug method called with INFO logger level");

		logger.level = "WARN";
		logger.debug("debug method called with WARN logger level");

		logger.level = "ERROR";
		logger.debug("debug method called with ERROR logger level");

		logger.level = "FATAL";
		logger.debug("debug method called with FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 0, "oj.Logger.debug called with different logger levels should not log messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 5, "oj.Logger.debug called with different logger levels should log messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.debug called with different logger levels should not log messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.debug called with different logger levels should not log messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.debug called with different logger levels should not log messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.debug called with different logger levels should not log messages at the fatal level");
	});

	test("oj.Logger.info called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger
		}, true);

		level = "TRACE";
		logger.info("info method called with TRACE logger level");

		logger.level = "DEBUG";
		logger.info("info method called with DEBUG logger level");

		logger.level = "INFO";
		logger.info("info method called with INFO logger level");

		logger.level = "WARN";
		logger.info("info method called with WARN logger level");

		logger.level = "ERROR";
		logger.info("info method called with ERROR logger level");

		logger.level = "FATAL";
		logger.info("info method called with FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 0, "oj.Logger.info called with different logger levels should not log messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.info called with different logger levels should not log messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 4, "oj.Logger.info called with different logger levels should log messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.info called with different logger levels should not log messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.info called with different logger levels should not log messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.info called with different logger levels should not log messages at the fatal level");
	});

	test("oj.Logger.warn called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger
		}, true);

		level = "TRACE";
		logger.warn("warn method called with TRACE logger level");

		logger.level = "DEBUG";
		logger.warn("warn method called with DEBUG logger level");

		logger.level = "INFO";
		logger.warn("warn method called with INFO logger level");

		logger.level = "WARN";
		logger.warn("warn method called with WARN logger level");

		logger.level = "ERROR";
		logger.warn("warn method called with ERROR logger level");

		logger.level = "FATAL";
		logger.warn("warn method called with FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 0, "oj.Logger.warn called with different logger levels should not log messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.warn called with different logger levels should not log messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.warn called with different logger levels should not log messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 3, "oj.Logger.warn called with different logger levels should log messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.warn called with different logger levels should not log messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.warn called with different logger levels should not log messages at the fatal level");
	});

	test("oj.Logger.error called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger
		}, true);

		level = "TRACE";
		logger.error("error method called with TRACE logger level");

		logger.level = "DEBUG";
		logger.error("error method called with DEBUG logger level");

		logger.level = "INFO";
		logger.error("error method called with INFO logger level");

		logger.level = "WARN";
		logger.error("error method called with WARN logger level");

		logger.level = "ERROR";
		logger.error("error method called with ERROR logger level");

		logger.level = "FATAL";
		logger.error("error method called with FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 0, "oj.Logger.error called with different logger levels should not log messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.error called with different logger levels should not log messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.error called with different logger levels should not log messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.error called with different logger levels should not log messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 2, "oj.Logger.error called with different logger levels should log messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.error called with different logger levels should not log messages at the fatal level");
	});

	test("oj.Logger.fatal called with different logger levels", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger
		}, true);

		level = "TRACE";
		logger.fatal("fatal method called with TRACE logger level");

		logger.level = "DEBUG";
		logger.fatal("fatal method called with DEBUG logger level");

		logger.level = "INFO";
		logger.fatal("fatal method called with INFO logger level");

		logger.level = "WARN";
		logger.fatal("fatal method called with WARN logger level");

		logger.level = "ERROR";
		logger.fatal("fatal method called with ERROR logger level");

		logger.level = "FATAL";
		logger.fatal("fatal method called with FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 0, "oj.Logger.fatal called with different logger levels should not log messages at the trace level");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.fatal called with different logger levels should not log messages at the debug level");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.fatal called with different logger levels should not log messages at the info level");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.fatal called with different logger levels should not log messages at the warn level");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.fatal called with different logger levels should not log messages at the error level");
		strictEqual(testLogger.levelMessages.FATAL.length, 1, "oj.Logger.fatal called with different logger levels should log messages at the fatal level");
	});

	// oj.Logger level method tests
	test("oj.Logger logging methods called at the TRACE logger level", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "TRACE"
		}, true);

		logger.trace("trace method called at the TRACE logger level");
		logger.debug("debug method called at the TRACE logger level");
		logger.info("info method called at the TRACE logger level");
		logger.warn("warn method called at the TRACE logger level");
		logger.error("error method called at the TRACE logger level");
		logger.fatal("fatal method called at the TRACE logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called at the TRACE logger level should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 0, "oj.Logger.debug called at the TRACE logger level should not log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.info called at the TRACE logger level should not log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.warn called at the TRACE logger level should not log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.error called at the TRACE logger level should not log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.fatal called at the TRACE logger level should not log a message");
	});

	test("oj.Logger logging methods called at the DEBUG logger level", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "DEBUG"
		}, true);

		logger.trace("trace method called at the DEBUG logger level");
		logger.debug("debug method called at the DEBUG logger level");
		logger.info("info method called at the DEBUG logger level");
		logger.warn("warn method called at the DEBUG logger level");
		logger.error("error method called at the DEBUG logger level");
		logger.fatal("fatal method called at the DEBUG logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called at the DEBUG logger level should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 1, "oj.Logger.debug called at the DEBUG logger level should log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 0, "oj.Logger.info called at the DEBUG logger level should not log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.warn called at the DEBUG logger level should not log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.error called at the DEBUG logger level should not log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.fatal called at the DEBUG logger level should not log a message");
	});

	test("oj.Logger logging methods called at the INFO logger level", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "INFO"
		}, true);

		logger.trace("trace method called at the INFO logger level");
		logger.debug("debug method called at the INFO logger level");
		logger.info("info method called at the INFO logger level");
		logger.warn("warn method called at the INFO logger level");
		logger.error("error method called at the INFO logger level");
		logger.fatal("fatal method called at the INFO logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called at the INFO logger level should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 1, "oj.Logger.debug called at the INFO logger level should log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 1, "oj.Logger.info called at the INFO logger level should log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 0, "oj.Logger.warn called at the INFO logger level should not log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.error called at the INFO logger level should not log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.fatal called at the INFO logger level should not log a message");
	});

	test("oj.Logger logging methods called at the WARN logger level", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "WARN"
		}, true);

		logger.trace("trace method called at the WARN logger level");
		logger.debug("debug method called at the WARN logger level");
		logger.info("info method called at the WARN logger level");
		logger.warn("warn method called at the WARN logger level");
		logger.error("error method called at the WARN logger level");
		logger.fatal("fatal method called at the WARN logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called at the WARN logger level should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 1, "oj.Logger.debug called at the WARN logger level should log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 1, "oj.Logger.info called at the WARN logger level should log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 1, "oj.Logger.warn called at the WARN logger level should log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 0, "oj.Logger.error called at the WARN logger level should not log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.fatal called at the WARN logger level should not log a message");
	});

	test("oj.Logger logging methods called at the ERROR logger level", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "ERROR"
		}, true);

		logger.trace("trace method called at the ERROR logger level");
		logger.debug("debug method called at the ERROR logger level");
		logger.info("info method called at the ERROR logger level");
		logger.warn("warn method called at the ERROR logger level");
		logger.error("error method called at the ERROR logger level");
		logger.fatal("fatal method called at the ERROR logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called at the ERROR logger level should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 1, "oj.Logger.debug called at the ERROR logger level should log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 1, "oj.Logger.info called at the ERROR logger level should log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 1, "oj.Logger.warn called at the ERROR logger level should log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 1, "oj.Logger.error called at the ERROR logger level should log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 0, "oj.Logger.fatal called at the ERROR logger level should not log a message");
	});

	test("oj.Logger logging methods called at the FATAL logger level", function() {
		var logger;

		expect(6);

		logger = oj.Logger.getInstance({
			logger: testLogger,
			level: "FATAL"
		}, true);

		logger.trace("trace method called at the FATAL logger level");
		logger.debug("debug method called at the FATAL logger level");
		logger.info("info method called at the FATAL logger level");
		logger.warn("warn method called at the FATAL logger level");
		logger.error("error method called at the FATAL logger level");
		logger.fatal("fatal method called at the FATAL logger level");

		strictEqual(testLogger.levelMessages.TRACE.length, 1, "oj.Logger.trace called at the FATAL logger level should log a message");
		strictEqual(testLogger.levelMessages.DEBUG.length, 1, "oj.Logger.debug called at the FATAL logger level should log a message");
		strictEqual(testLogger.levelMessages.INFO.length, 1, "oj.Logger.info called at the FATAL logger level should log a message");
		strictEqual(testLogger.levelMessages.WARN.length, 1, "oj.Logger.warn called at the FATAL logger level should log a message");
		strictEqual(testLogger.levelMessages.ERROR.length, 1, "oj.Logger.error called at the FATAL logger level should log a message");
		strictEqual(testLogger.levelMessages.FATAL.length, 1, "oj.Logger.fatal called at the FATAL logger level should log a message");
	});
});
