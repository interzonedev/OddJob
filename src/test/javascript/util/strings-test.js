$(function() {

	module("oj.util.strings");

	// oj.util.strings object tests
	test("oj.util.strings object defined", function() {
		expect(2);

		ok(oj.util.strings, "oj.util.strings object defined");

		strictEqual(typeof(oj.util.strings), "object", "oj.util.strings is an object");
	});

	// oj.util.strings.isString method tests
	test("oj.util.strings.isString function defined", function() {
		expect(1);

		strictEqual(typeof(oj.util.strings.isString), "function", "oj.util.strings.isString is a function");
	});

	test("oj.util.strings.isString called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.strings.isString(nonDefinedValue);

			strictEqual(result, false, "oj.util.strings.isString called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.util.strings.isString called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var result;

			result = oj.util.strings.isString(nonString);

			strictEqual(result, false, "oj.util.strings.isString called with " + nonString + " returns false");
		});
	});

	test("oj.util.strings.isString called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var result;

			result = oj.util.strings.isString(blankString);

			strictEqual(result, true, "oj.util.strings.isString called with \"" + blankString + "\" returns true");
		});
	});

	test("oj.util.strings.isString called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var result;

			result = oj.util.strings.isString(nonBlankString);

			strictEqual(result, true, "oj.util.strings.isString called with \"" + nonBlankString + "\" returns true");
		});
	});

	// oj.util.strings.isNotBlank method tests
	test("oj.util.strings.isNotBlank function defined", function() {
		expect(1);

		strictEqual(typeof(oj.util.strings.isNotBlank), "function", "oj.util.strings.isNotBlank is a function");
	});

	test("oj.util.strings.isNotBlank called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.strings.isNotBlank(nonDefinedValue);

			strictEqual(result, false, "oj.util.strings.isNotBlank called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.util.strings.isNotBlank called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var result;

			result = oj.util.strings.isNotBlank(nonString);

			strictEqual(result, null, "oj.util.strings.isNotBlank called with " + nonString + " returns null");
		});
	});

	test("oj.util.strings.isNotBlank called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var result;

			result = oj.util.strings.isNotBlank(blankString);

			strictEqual(result, false, "oj.util.strings.isNotBlank called with \"" + blankString + "\" returns false");
		});
	});

	test("oj.util.strings.isNotBlank called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var result;

			result = oj.util.strings.isNotBlank(nonBlankString);

			strictEqual(result, true, "oj.util.strings.isNotBlank called with \"" + nonBlankString + "\" returns true");
		});
	});

	// oj.util.strings.isBlank method tests
	test("oj.util.strings.isBlank function defined", function() {
		expect(1);

		strictEqual(typeof(oj.util.strings.isBlank), "function", "oj.util.strings.isBlank is a function");
	});

	test("oj.util.strings.isBlank called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.strings.isBlank(nonDefinedValue);

			strictEqual(result, true, "oj.util.strings.isBlank called with " + nonDefinedValue + " returns true");
		});
	});

	test("oj.util.strings.isBlank called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var result;

			result = oj.util.strings.isBlank(nonString);

			strictEqual(result, null, "oj.util.strings.isBlank called with " + nonString + " returns null");
		});
	});

	test("oj.util.strings.isBlank called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var result;

			result = oj.util.strings.isBlank(blankString);

			strictEqual(result, true, "oj.util.strings.isBlank called with \"" + blankString + "\" returns true");
		});
	});

	test("oj.util.strings.isBlank called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var result;

			result = oj.util.strings.isBlank(nonBlankString);

			strictEqual(result, false, "oj.util.strings.isBlank called with \"" + nonBlankString + "\" returns false");
		});
	});
});
