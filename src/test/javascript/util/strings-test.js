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

	test("oj.util.strings.isString called with undefined", function() {
		var result;

		expect(1);

		result = oj.util.strings.isString();
		strictEqual(false, result, "oj.util.strings.isString called with undefined returns false");
	});

	test("oj.util.strings.isString called with null", function() {
		var result;

		expect(1);

		result = oj.util.strings.isString(null);
		strictEqual(false, result, "oj.util.strings.isString called with null returns false");
	});

	test("oj.util.strings.isString called with a number", function() {
		var result;

		expect(1);

		result = oj.util.strings.isString(1);
		strictEqual(false, result, "oj.util.strings.isString called with a number returns false");
	});

	test("oj.util.strings.isString called with empty string", function() {
		var result;

		expect(1);

		result = oj.util.strings.isString("");
		strictEqual(true, result, "oj.util.strings.isString called with empty string returns true");
	});

	test("oj.util.strings.isString called with blank string", function() {
		var result;

		expect(1);

		result = oj.util.strings.isString("  ");
		strictEqual(true, result, "oj.util.strings.isString called with blank string returns true");
	});
});
