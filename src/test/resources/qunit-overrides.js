(function() {
	var UNDEFINED_VALUE, commonValues, consoleLogger;

	// Define an object containing common values used across various test cases.
	commonValues = {
		nonDefinedValues: [
			UNDEFINED_VALUE,
			null,
		],
		definedInstances: [
			new Object(),
			{},
			new Array(),
			[],
			new Function(""),
			function() {},
			new String("hello"),
			"hello",
			new Number(1),
			1,
			new Boolean(false),
			false,
			new Error(),
			new Date(),
			new RegExp("/\d+/"),
			/\d+/
		],
		objectInstances: [
			new Object(),
			{}
		],
		nonObjectInstances: [
			new Array(),
			[],
			new Function(""),
			function() {},
			new String("hello"),
			"hello",
			new Number(1),
			1,
			new Boolean(false),
			false,
			new Error(),
			new Date(),
			new RegExp("/\d+/"),
			/\d+/
		],
		arrayInstances: [
			new Array(),
			[]
		],
		nonArrayInstances: [
			new Object(),
			{},
			new Function(""),
			function() {},
			new Number(1),
			1,
			new Boolean(false),
			false,
			new Error(),
			new Date(),
			new RegExp("/\d+/"),
			/\d+/
		],
		nonStringInstances: [
			new Object(),
			{},
			new Array(),
			[],
			new Function(""),
			function() {},
			new Number(1),
			1,
			new Boolean(false),
			false,
			new Error(),
			new Date(),
			new RegExp("/\d+/"),
			/\d+/
		],
		blankStringInstances: [
			new String(""),
			"",
			new String("  "),
			"  "
		],
		nonBlankStringInstances: [
			new String("hello"),
			"hello"
		]
	};

	/**
	 * Defines a log method to register with the QUnit.log stack.  Specifically looks for a console.log object to which
	 * to output log messages.
	 * 
	 * @param {Object} assertionArguments An object containing the arguments by name passed to the test assertion being
	 *                                    logged.
	 */
	consoleLogger = function(assertionArguments) {
		var logMessage;

		if (window.console && window.console.log) {
			logMessage = "";

			if (assertionArguments.message) {
				logMessage += assertionArguments.message + " - ";
			}

			logMessage += assertionArguments.result;

			if (assertionArguments.expected) {
				logMessage += " - expected [" + assertionArguments.expected + "]";
			}

			if (assertionArguments.actual) {
				logMessage += " - actual [" + assertionArguments.actual + "]";
			}

			window.console.log(logMessage);
		}
	}; 

	// Tack on the object containing common test values to the oj namespace of the QUnit object. 
	QUnit.oj = commonValues;

	// Register the console logger to be called for each assertion.
	QUnit.log(consoleLogger);
}());
