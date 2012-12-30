$(function() {
	var testLogger, logger;

	testLogger = null;
	logger = null;

	module("oj.Logger", {
		setup: function() {
			testLogger = {

				levelCounts: {
					"TRACE": 0,
					"DEBUG": 0,
					"INFO": 0,
					"WARN": 0,
					"ERROR": 0,
					"FATAL": 0
				},

				trace: function(message) {
					levelCounts["TRACE"] += 1;
				}
			};
			logger = oj.Logger.getInstance({
				logger: testLogger
			}, true);
		},
		teardown: function() {
			testLogger = null;
			logger = null;
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

	// oj.Logger test class getInstance method tests
	test("oj.Logger.getInstance called with no params sets default properties on instance", function() {
		var logger;

		expect(9);

		logger = oj.Logger.getInstance();

		ok(logger, "oj.Logger.getInstance called with no params returns a defined value");
		strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with no params returns an instance");
		strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with no params returns an instance with the class name set");
		strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with no params returns an instance with the class set");
		strictEqual(logger.name, "", "oj.Logger.getInstance called with no params returns an instance with the default name property set");
		strictEqual(logger.logger, null, "oj.Logger.getInstance called with no params returns an instance with the logger property set to null");
		strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with no params returns an instance with the prependLevelToMessage property set to false");
		strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with no params returns an instance with the alertLogErrors property set to false");
	});

	test("oj.Logger.getInstance called with empty params and no initialization sets default properties on instance", function() {
		var logger;

		expect(9);

		logger = oj.Logger.getInstance({});

		ok(logger, "oj.Logger.getInstance called with empty params and no initialization returns a defined value");
		strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with empty params and no initialization returns an instance");
		strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the default instanceName set");
		strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with empty params and no initialization returns an instance with the class name set");
		strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the class set");
		strictEqual(logger.name, "", "oj.Logger.getInstance called with empty params and no initialization returns an instance with the default name property set");
		strictEqual(logger.logger, null, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the logger property set to null");
		strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the prependLevelToMessage property set to false");
		strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with empty params and no initialization returns an instance with the alertLogErrors property set to false");
	});

	test("oj.Logger.getInstance called with empty params and initialization sets default properties on instance", function() {
		var logger, loggerProperty;

		expect(10);

		logger = oj.Logger.getInstance({}, true);

		loggerProperty = logger.logger;

		ok(logger, "oj.Logger.getInstance called with empty params and initialization returns a defined value");
		strictEqual(typeof(logger), "object", "oj.Logger.getInstance called with empty params and initialization returns an instance");
		strictEqual(logger.instanceName.indexOf("oj.Logger_instance_"), 0, "oj.Logger.getInstance called with empty params and initialization returns an instance with the default instanceName set");
		strictEqual(logger.className, "oj.Logger", "oj.Logger.getInstance called with empty params and initialization returns an instance with the class name set");
		strictEqual(logger.clazz, oj.Logger, "oj.Logger.getInstance called with empty params and initialization returns an instance with the class set");
		strictEqual(logger.name, "", "oj.Logger.getInstance called with empty params and initialization returns an instance with the default name property set");
		strictEqual(typeof(loggerProperty), "object", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set");
		strictEqual(typeof(loggerProperty.debug), "function", "oj.Logger.getInstance called with empty params and initialization returns an instance with the logger property set with a debug method");
		strictEqual(logger.prependLevelToMessage, false, "oj.Logger.getInstance called with empty params and initialization returns an instance with the prependLevelToMessage property set to false");
		strictEqual(logger.alertLogErrors, false, "oj.Logger.getInstance called with empty params and initialization returns an instance with the alertLogErrors property set to false");
	});
});
