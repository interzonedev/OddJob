$(function() {

	module("oj.util.strings");

	// oj.util.strings object tests
	test("oj.util.strings object defined", function() {
		expect(2);

		ok(oj.util.strings, "oj.util.strings object defined");
		strictEqual("object", typeof(oj.util.strings), "oj.util.strings is an object");
	});

	// oj.util.strings.isString method tests
	test("oj.util.strings.isString function defined", function() {
		expect(2);

		ok(oj.util.strings.isString, "oj.util.strings.isString object defined");
		strictEqual("function", typeof(oj.util.strings.isString), "oj.util.strings.isString is a function");
	});

	test("oj.util.strings.isString called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.strings.isString(nonDefinedValue);
			strictEqual(false, result, "oj.util.strings.isString called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.util.strings.isString called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var result;

			result = oj.util.strings.isString(nonString);
			strictEqual(false, result, "oj.util.strings.isString called with " + nonString + " returns false");
		});
	});

	test("oj.util.strings.isString called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var result;

			result = oj.util.strings.isString(blankString);
			strictEqual(true, result, "oj.util.strings.isString called with \"" + blankString + "\" returns true");
		});
	});

	test("oj.util.strings.isString called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var result;

			result = oj.util.strings.isString(nonBlankString);
			strictEqual(true, result, "oj.util.strings.isString called with \"" + nonBlankString + "\" returns true");
		});
	});

	// oj.util.strings.isNotBlank method tests
	test("oj.util.strings.isNotBlank function defined", function() {
		expect(2);

		ok(oj.util.strings.isNotBlank, "oj.util.strings.isNotBlank object defined");
		strictEqual("function", typeof(oj.util.strings.isNotBlank), "oj.util.strings.isNotBlank is a function");
	});

	test("oj.util.strings.isNotBlank called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.strings.isNotBlank(nonDefinedValue);
			strictEqual(false, result, "oj.util.strings.isNotBlank called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.util.strings.isNotBlank called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var result;

			result = oj.util.strings.isNotBlank(nonString);
			strictEqual(null, result, "oj.util.strings.isNotBlank called with " + nonString + " returns null");
		});
	});

	test("oj.util.strings.isNotBlank called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var result;

			result = oj.util.strings.isNotBlank(blankString);
			strictEqual(false, result, "oj.util.strings.isNotBlank called with \"" + blankString + "\" returns false");
		});
	});

	test("oj.util.strings.isNotBlank called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var result;

			result = oj.util.strings.isNotBlank(nonBlankString);
			strictEqual(true, result, "oj.util.strings.isNotBlank called with \"" + nonBlankString + "\" returns true");
		});
	});

	// oj.util.strings.isBlank method tests
	test("oj.util.strings.isBlank function defined", function() {
		expect(2);

		ok(oj.util.strings.isBlank, "oj.util.strings.isBlank object defined");
		strictEqual("function", typeof(oj.util.strings.isBlank), "oj.util.strings.isBlank is a function");
	});

	test("oj.util.strings.isBlank called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.util.strings.isBlank(nonDefinedValue);
			strictEqual(true, result, "oj.util.strings.isBlank called with " + nonDefinedValue + " returns true");
		});
	});

	test("oj.util.strings.isBlank called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var result;

			result = oj.util.strings.isBlank(nonString);
			strictEqual(null, result, "oj.util.strings.isBlank called with " + nonString + " returns null");
		});
	});

	test("oj.util.strings.isBlank called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var result;

			result = oj.util.strings.isBlank(blankString);
			strictEqual(true, result, "oj.util.strings.isBlank called with \"" + blankString + "\" returns true");
		});
	});

	test("oj.util.strings.isBlank called with non blank strings", function() {
		expect(QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var result;

			result = oj.util.strings.isBlank(nonBlankString);
			strictEqual(false, result, "oj.util.strings.isBlank called with \"" + nonBlankString + "\" returns false");
		});
	});
});
