$(function() {

	module("oj.util.framework");

	// oj.util.framework object tests
	test("oj.util.framework object defined", function() {
		expect(2);

		ok(oj.util.framework, "oj.util.framework object defined");
		strictEqual("object", typeof(oj.util.framework), "oj.util.framework is an object");
	});

	// oj.util.framework.getUniqueId method tests
	test("oj.util.framework.getUniqueId function defined", function() {
		expect(2);

		ok(oj.util.framework.getUniqueId, "oj.util.framework.getUniqueId object defined");
		strictEqual("function", typeof(oj.util.framework.getUniqueId), "oj.util.framework.getUniqueId is a function");
	});


	test("oj.util.framework.getUniqueId called with non defined values", function() {
		expect(2 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var uniqueId;

			uniqueId = oj.util.framework.getUniqueId(nonDefinedValue);

			ok(uniqueId, "oj.util.framework.getUniqueId called with " + nonDefinedValue + " returns a value");
			ok(/^\d/.test(uniqueId), "oj.util.framework.getUniqueId called with " + nonDefinedValue + " returns a value with no prefix");
		});
	});

	test("oj.util.framework.getUniqueId called with blank strings", function() {
		expect(2 * QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			var uniqueId;

			uniqueId = oj.util.framework.getUniqueId(blankString);

			ok(uniqueId, "oj.util.framework.getUniqueId called with \"" + blankString + "\" returns a value");
			ok(/^\d/.test(uniqueId), "oj.util.framework.getUniqueId called with \"" + blankString + "\" returns a value with no prefix");
		});
	});

	test("oj.util.framework.getUniqueId called with non strings", function() {
		expect(2 * QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			var uniqueId;

			uniqueId = oj.util.framework.getUniqueId(nonString);

			ok(uniqueId, "oj.util.framework.getUniqueId called with \"" + nonString + "\" returns a value");
			ok(/^\d/.test(uniqueId), "oj.util.framework.getUniqueId called with \"" + nonString + "\" returns a value with no prefix");
		});
	});

	test("oj.util.framework.getUniqueId called with non blank strings", function() {
		expect(2 * QUnit.oj.nonBlankStringInstances.length);

		$.each(QUnit.oj.nonBlankStringInstances, function(i, nonBlankString) {
			var prefixRegEx, uniqueId, matches;

			prefixRegEx = new RegExp(nonBlankString);

			uniqueId = oj.util.framework.getUniqueId(nonBlankString);

			matches = uniqueId.match(prefixRegEx);

			ok(uniqueId, "oj.util.framework.getUniqueId called with \"" + nonBlankString + "\" returns a value");
			strictEqual(1, matches.length, "oj.util.framework.getUniqueId called with \"" + nonBlankString + "\" returns a value with a prefix");
		});
	});

});
