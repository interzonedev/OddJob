$(function() {

	module("oj.util.framework");

	// oj.util.framework object tests
	test("oj.util.framework object defined", function() {
		expect(2);

		ok(oj.util.framework, "oj.util.framework object defined");
		strictEqual(typeof(oj.util.framework), "object", "oj.util.framework is an object");
	});

	// oj.util.framework.getUniqueId method tests
	test("oj.util.framework.getUniqueId function defined", function() {
		expect(1);

		strictEqual(typeof(oj.util.framework.getUniqueId), "function", "oj.util.framework.getUniqueId is a function");
	});

	test("oj.util.framework.getUniqueId called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var uniqueId;

			uniqueId = oj.util.framework.getUniqueId(nonDefinedValue);

			ok(/^\d/.test(uniqueId), "oj.util.framework.getUniqueId called with " + nonDefinedValue + " returns a value with no prefix");
		});
	});

	test("oj.util.framework.getUniqueId called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var uniqueId;

			uniqueId = oj.util.framework.getUniqueId(blankString);

			ok(/^\d/.test(uniqueId), "oj.util.framework.getUniqueId called with \"" + blankString + "\" returns a value with no prefix");
		});
	});

	test("oj.util.framework.getUniqueId called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var uniqueId;

			uniqueId = oj.util.framework.getUniqueId(nonString);

			ok(/^\d/.test(uniqueId), "oj.util.framework.getUniqueId called with \"" + nonString + "\" returns a value with no prefix");
		});
	});

	test("oj.util.framework.getUniqueId called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var prefixRegEx, uniqueId, matches;

			prefixRegEx = new RegExp(nonBlankString);

			uniqueId = oj.util.framework.getUniqueId(nonBlankString);

			matches = uniqueId.match(prefixRegEx);

			strictEqual(matches.length, 1, "oj.util.framework.getUniqueId called with \"" + nonBlankString + "\" returns a value with a prefix");
		});
	});

	// oj.util.framework.isObject method tests
	test("oj.util.framework.isObject function defined", function() {
		expect(1);

		strictEqual(typeof(oj.util.framework.isObject), "function", "oj.util.framework.isObject is a function");
	});

	test("oj.util.framework.isObject called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.framework.isObject(nonDefinedValue);

			strictEqual(result, false, "oj.util.framework.isObject called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.util.framework.isObject called with non Object values", function() {
		expect(QUnit.oj.nonObjectInstances.length);

		$.each(QUnit.oj.nonObjectInstances, function(i, nonObjectValue) {
			var result;

			result = oj.util.framework.isObject(nonObjectValue);

			strictEqual(result, false, "oj.util.framework.isObject called with " + nonObjectValue + " returns false");
		});
	});

	test("oj.util.framework.isObject called with Object values", function() {
		expect(QUnit.oj.objectInstances.length);

		$.each(QUnit.oj.objectInstances, function(i, objectValue) {
			var result;

			result = oj.util.framework.isObject(objectValue);

			strictEqual(result, true, "oj.util.framework.isObject called with " + objectValue + " returns true");
		});
	});

	// oj.util.framework.isArray method tests
	test("oj.util.framework.isArray function defined", function() {
		expect(1);

		strictEqual(typeof(oj.util.framework.isArray), "function", "oj.util.framework.isArray is a function");
	});

	test("oj.util.framework.isArray called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.framework.isArray(nonDefinedValue);

			strictEqual(result, false, "oj.util.framework.isArray called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.util.framework.isArray called with non Array values", function() {
		expect(QUnit.oj.nonArrayInstances.length);

		$.each(QUnit.oj.nonArrayInstances, function(i, nonArrayValue) {
			var result;

			result = oj.util.framework.isArray(nonArrayValue);

			strictEqual(result, false, "oj.util.framework.isArray called with " + nonArrayValue + " returns false");
		});
	});

	test("oj.util.framework.isArray called with Array values", function() {
		expect(QUnit.oj.arrayInstances.length);

		$.each(QUnit.oj.arrayInstances, function(i, arrayValue) {
			var result;

			result = oj.util.framework.isArray(arrayValue);

			strictEqual(result, true, "oj.util.framework.isArray called with " + arrayValue + " returns true");
		});
	});
});
