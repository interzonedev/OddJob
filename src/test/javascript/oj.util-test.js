(function(context, $){
	$(function() {
		var functionContext, wrappedFunction, cleanContext;

		functionContext = null;
		wrappedFunction = null;

		module("oj.util", {
			setup: function() {
				cleanContext();

				functionContext = {
					property1: "default1",
					property2: "default2"
				};

				wrappedFunction = function(val) {
					this.property1 = val;

					return this.property2;
				};
			},
			teardown: function() {
				cleanContext();

				functionContext = null;
				wrappedFunction = null;
			}
		});

		cleanContext = function() {
			delete context.property1;
		};

		// oj.util object tests
		test("oj.util object defined", function() {
			expect(2);

			ok(oj.util, "oj.util object defined");
			strictEqual(typeof(oj.util), "object", "oj.util is an object");
		});

		// oj.util.getUniqueId method tests
		test("oj.util.getUniqueId function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.getUniqueId), "function", "oj.util.getUniqueId is a function");
		});

		test("oj.util.getUniqueId called with non defined values", function() {
			expect(QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var uniqueId;

				uniqueId = oj.util.getUniqueId(nonDefinedValue);

				ok(/^\d/.test(uniqueId), "oj.util.getUniqueId called with " + nonDefinedValue + " returns a value with no prefix");
			});
		});

		test("oj.util.getUniqueId called with blank strings", function() {
			expect(QUnit.oj.blankStringInstances.length);

			$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
				var uniqueId;

				uniqueId = oj.util.getUniqueId(blankString);

				ok(/^\d/.test(uniqueId), "oj.util.getUniqueId called with \"" + blankString + "\" returns a value with no prefix");
			});
		});

		test("oj.util.getUniqueId called with non strings", function() {
			expect(QUnit.oj.nonStringInstances.length);

			$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
				var uniqueId;

				uniqueId = oj.util.getUniqueId(nonString);

				ok(/^\d/.test(uniqueId), "oj.util.getUniqueId called with \"" + nonString + "\" returns a value with no prefix");
			});
		});

		test("oj.util.getUniqueId called with non blank strings", function() {
			expect(QUnit.oj.nonBlankStringInstances.length);

			$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
				var prefixRegEx, uniqueId, matches;

				prefixRegEx = new RegExp(nonBlankString);

				uniqueId = oj.util.getUniqueId(nonBlankString);

				matches = uniqueId.match(prefixRegEx);

				strictEqual(matches.length, 1, "oj.util.getUniqueId called with \"" + nonBlankString + "\" returns a value with a prefix");
			});
		});

		// oj.util.isObject method tests
		test("oj.util.isObject function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.isObject), "function", "oj.util.isObject is a function");
		});

		test("oj.util.isObject called with non defined values", function() {
			expect(QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var result;

				result = oj.util.isObject(nonDefinedValue);

				strictEqual(result, false, "oj.util.isObject called with " + nonDefinedValue + " returns false");
			});
		});

		test("oj.util.isObject called with non Object values", function() {
			expect(QUnit.oj.nonObjectInstances.length);

			$.each(QUnit.oj.nonObjectInstances, function(i, nonObjectValue) {
				var result;

				result = oj.util.isObject(nonObjectValue);

				strictEqual(result, false, "oj.util.isObject called with " + nonObjectValue + " returns false");
			});
		});

		test("oj.util.isObject called with Object values", function() {
			expect(QUnit.oj.objectInstances.length);

			$.each(QUnit.oj.objectInstances, function(i, objectValue) {
				var result;

				result = oj.util.isObject(objectValue);

				strictEqual(result, true, "oj.util.isObject called with " + objectValue + " returns true");
			});
		});

		// oj.util.isArray method tests
		test("oj.util.isArray function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.isArray), "function", "oj.util.isArray is a function");
		});

		test("oj.util.isArray called with non defined values", function() {
			expect(QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var result;

				result = oj.util.isArray(nonDefinedValue);

				strictEqual(result, false, "oj.util.isArray called with " + nonDefinedValue + " returns false");
			});
		});

		test("oj.util.isArray called with non Array values", function() {
			expect(QUnit.oj.nonArrayInstances.length);

			$.each(QUnit.oj.nonArrayInstances, function(i, nonArrayValue) {
				var result;

				result = oj.util.isArray(nonArrayValue);

				strictEqual(result, false, "oj.util.isArray called with " + nonArrayValue + " returns false");
			});
		});

		test("oj.util.isArray called with Array values", function() {
			expect(QUnit.oj.arrayInstances.length);

			$.each(QUnit.oj.arrayInstances, function(i, arrayValue) {
				var result;

				result = oj.util.isArray(arrayValue);

				strictEqual(result, true, "oj.util.isArray called with " + arrayValue + " returns true");
			});
		});

		// oj.util.isString method tests
		test("oj.util.isString function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.isString), "function", "oj.util.isString is a function");
		});

		test("oj.util.isString called with non defined values", function() {
			expect(QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var result;

				result = oj.util.isString(nonDefinedValue);

				strictEqual(result, false, "oj.util.isString called with " + nonDefinedValue + " returns false");
			});
		});

		test("oj.util.isString called with non strings", function() {
			expect(QUnit.oj.nonStringInstances.length);

			$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
				var result;

				result = oj.util.isString(nonString);

				strictEqual(result, false, "oj.util.isString called with " + nonString + " returns false");
			});
		});

		test("oj.util.isString called with blank strings", function() {
			expect(QUnit.oj.blankStringInstances.length);

			$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
				var result;

				result = oj.util.isString(blankString);

				strictEqual(result, true, "oj.util.isString called with \"" + blankString + "\" returns true");
			});
		});

		test("oj.util.isString called with non blank strings", function() {
			expect(QUnit.oj.nonBlankStringInstances.length);

			$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
				var result;

				result = oj.util.isString(nonBlankString);

				strictEqual(result, true, "oj.util.isString called with \"" + nonBlankString + "\" returns true");
			});
		});

		// oj.util.isNotBlankString method tests
		test("oj.util.isNotBlankString function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.isNotBlankString), "function", "oj.util.isNotBlankString is a function");
		});

		test("oj.util.isNotBlankString called with non defined values", function() {
			expect(QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var result;

				result = oj.util.isNotBlankString(nonDefinedValue);

				strictEqual(result, false, "oj.util.isNotBlankString called with " + nonDefinedValue + " returns false");
			});
		});

		test("oj.util.isNotBlankString called with non strings", function() {
			expect(QUnit.oj.nonStringInstances.length);

			$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
				var result;

				result = oj.util.isNotBlankString(nonString);

				strictEqual(result, null, "oj.util.isNotBlankString called with " + nonString + " returns null");
			});
		});

		test("oj.util.isNotBlankString called with blank strings", function() {
			expect(QUnit.oj.blankStringInstances.length);

			$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
				var result;

				result = oj.util.isNotBlankString(blankString);

				strictEqual(result, false, "oj.util.isNotBlankString called with \"" + blankString + "\" returns false");
			});
		});

		test("oj.util.isNotBlankString called with non blank strings", function() {
			expect(QUnit.oj.nonBlankStringInstances.length);

			$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
				var result;

				result = oj.util.isNotBlankString(nonBlankString);

				strictEqual(result, true, "oj.util.isNotBlankString called with \"" + nonBlankString + "\" returns true");
			});
		});

		// oj.util.isBlankString method tests
		test("oj.util.isBlankString function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.isBlankString), "function", "oj.util.isBlankString is a function");
		});

		test("oj.util.isBlankString called with non defined values", function() {
			expect(QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var result;

				result = oj.util.isBlankString(nonDefinedValue);

				strictEqual(result, true, "oj.util.isBlankString called with " + nonDefinedValue + " returns true");
			});
		});

		test("oj.util.isBlankString called with non strings", function() {
			expect(QUnit.oj.nonStringInstances.length);

			$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
				var result;

				result = oj.util.isBlankString(nonString);

				strictEqual(result, null, "oj.util.isBlankString called with " + nonString + " returns null");
			});
		});

		test("oj.util.isBlankString called with blank strings", function() {
			expect(QUnit.oj.blankStringInstances.length);

			$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
				var result;

				result = oj.util.isBlankString(blankString);

				strictEqual(result, true, "oj.util.isBlankString called with \"" + blankString + "\" returns true");
			});
		});

		test("oj.util.isBlankString called with non blank strings", function() {
			expect(QUnit.oj.nonBlankStringInstances.length);

			$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
				var result;

				result = oj.util.isBlankString(nonBlankString);

				strictEqual(result, false, "oj.util.isBlankString called with \"" + nonBlankString + "\" returns false");
			});
		});

		// oj.util.getFunctionInContext method tests
		test("oj.util.getFunctionInContext function defined", function() {
			expect(1);

			strictEqual(typeof(oj.util.getFunctionInContext), "function", "oj.util.getFunctionInContext is a function");
		});

		test("oj.util.getFunctionInContext called with valid values", function() {
			var functionInContext, value, result;

			expect(3);

			functionInContext = oj.util.getFunctionInContext(functionContext, wrappedFunction);

			strictEqual(typeof(functionInContext), "function", "oj.util.getFunctionInContext called with valid values returns a function");

			value = "value";

			result = functionInContext(value);

			strictEqual(functionContext.property1, value, "oj.util.getFunctionInContext called with valid values returns a function that runs in the specified context");
			strictEqual(result, functionContext.property2, "oj.util.getFunctionInContext called with valid values returns a function that runs in the specified context");
		});

		test("oj.util.getFunctionInContext called with non defined values for the context", function() {
			expect(5 * QUnit.oj.nonDefinedValues.length);

			$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
				var functionInContext, value, result;

				cleanContext();

				functionInContext = oj.util.getFunctionInContext(nonDefinedValue, wrappedFunction);

				strictEqual(typeof(functionInContext), "function", "oj.util.getFunctionInContext called with non defined values for the context returns a function");

				value = "value";

				result = functionInContext(value);

				strictEqual(functionContext.property1, "default1", "oj.util.getFunctionInContext called with non defined values for the context does not alter the intended context");
				strictEqual(functionContext.property2, "default2", "oj.util.getFunctionInContext called with non defined values for the context does not alter the intended context");
				strictEqual(context.property1, value, "oj.util.getFunctionInContext called with non defined values for the context altered the top level context");
				ok(!result, "The result of calling oj.util.getFunctionInContext called with non defined values for the context is undefined");
			});
		});

		test("oj.util.getFunctionInContext called with non function values for the function", function() {
			expect(QUnit.oj.nonFunctionInstances.length);

			$.each(QUnit.oj.nonFunctionInstances, function(i, nonFunctionValue) {
				raises(function() {
					oj.util.getFunctionInContext(functionContext, nonFunctionValue);
				}, Error, "oj.util.getFunctionInContext called with non function values for the function should throw an Error");
			});
		});
	});
}(this, jQuery));
