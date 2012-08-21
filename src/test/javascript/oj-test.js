$(function() {

	module("oj");

	// oj object tests
	test("oj object defined in global namespace", function() {
		expect(2);

		ok(oj, "oj object defined");
		strictEqual(typeof(oj), "object", "oj is an object");
	});

	// oj.emptyFunction tests
	test("oj.emptyFunction function defined", function() {
		expect(1);

		strictEqual(typeof(oj.emptyFunction), "function", "oj.emptyFunction is a function");
	});

	test("oj.emptyFunction called with no args", function() {
		var result;

		expect(1);

		result = oj.emptyFunction();

		strictEqual(typeof(result), "undefined", "oj.emptyFunction called with no args returns undefined");
	});

	test("oj.emptyFunction called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.emptyFunction(nonDefinedValue);
			strictEqual(typeof(result), "undefined", "oj.emptyFunction called with " + nonDefinedValue + " returns undefined");
		});
	});

	test("oj.emptyFunction called with defined values", function() {
		expect(QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var result;

			result = oj.emptyFunction(definedValue);
			strictEqual(typeof(result), "undefined", "oj.emptyFunction called with " + definedValue + " returns undefined");
		});
	});

	// oj.isDefined tests
	test("oj.isDefined function defined", function() {
		expect(1);

		strictEqual(typeof(oj.isDefined), "function", "oj.isDefined is a function");
	});

	test("oj.isDefined called with no args", function() {
		var result;

		expect(1);

		result = oj.isDefined();

		strictEqual(result, false, "oj.isDefined called with no args false");
	});

	test("oj.isDefined called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var result;

			result = oj.isDefined(nonDefinedValue);
			strictEqual(result, false, "oj.isDefined called with " + nonDefinedValue + " returns false");
		});
	});

	test("oj.isDefined called with defined values", function() {
		expect(QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var result;

			result = oj.isDefined(definedValue);
			strictEqual(result, true, "oj.isDefined called with " + definedValue + " returns true");
		});
	});

	// oj.namespace tests
	test("oj.namespace function defined", function() {
		expect(1);

		strictEqual(typeof(oj.namespace), "function", "oj.namespace is a function");
	});

	test("oj.namespace called with no args", function() {
		expect(1);

		raises(function() {
			oj.namespace();
		}, Error, "oj.namespace called with no args should throw an Error");
	});

	test("oj.namespace called with non defined values", function() {
		expect(QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			raises(function() {
				oj.namespace(nonDefinedValue);
			}, Error, "oj.namespace called with " + nonDefinedValue + " should throw an Error");
		});
	});

	test("oj.namespace called with non strings", function() {
		expect(QUnit.oj.nonStringInstances.length);

		$.each(QUnit.oj.nonStringInstances, function(i, nonString) {
			raises(function() {
				oj.namespace(nonString);
			}, Error, "oj.namespace called with " + nonString + " should throw an Error");
		});
	});

	test("oj.namespace called with blank strings", function() {
		expect(QUnit.oj.blankStringInstances.length);

		$.each(QUnit.oj.blankStringInstances, function(i, blankString) {
			raises(function() {
				oj.namespace(blankString);
			}, Error, "oj.namespace called with " + blankString + " should throw an Error");
		});
	});


	test("oj.namespace called with invalid namespaces", function() {
		var invalidNamespaces;

		invalidNamespaces = [
			"xyz,abc", "xy_z.abc", "2yz.abc", "xyz..abc"
		];

		expect(invalidNamespaces.length);

		$.each(invalidNamespaces, function(i, invalidNamespace) {
			raises(function() {
				oj.namespace(invalidNamespace);
			}, Error, "oj.namespace called with " + invalidNamespace + " should throw an Error");
		});
	});

	test("oj.namespace valid", function() {
		var test5Namespace1, test5Namespace2;

		expect(6);

		// Define a valid namespace.
		test5Namespace1 = oj.namespace("oj.test4.test5");

		ok(test5Namespace1, "test5Namespace1 defined");
		strictEqual(test5Namespace1, oj.test4.test5, "oj.test4.test5 and test5Namespace1 are the same object");
		strictEqual(typeof(test5Namespace1), "object", "test5Namespace1 is an object");

		// Redefine the same namespace.
		test5Namespace2 = oj.namespace("oj.test4.test5");

		ok(test5Namespace2, "test5Namespace2 defined");
		strictEqual(test5Namespace2, oj.test4.test5, "oj.test4.test5 and test5Namespace2 are the same object");
		strictEqual(typeof(test5Namespace2), "object", "test5Namespace2 is an object");
	});

	test("oj.namespace redefine $ namespace", function() {
		var $namespace;

		expect(3);

		$namespace = oj.namespace("$");

		strictEqual(typeof($namespace), "function", "$namespace is a function");
		strictEqual($namespace, $, "$ and $namespace are the same object");
		strictEqual($, jQuery, "$ is still the jQuery object");
	});

	test("oj.namespace extend $ namespace", function() {
		var $ojNamespace;

		expect(3);

		$ojNamespace = oj.namespace("$.oj");

		ok($ojNamespace, "$ojNamespace defined");
		strictEqual($ojNamespace, $.oj, "$ and $ojNamespace are the same object");
		strictEqual(typeof($ojNamespace), "object", "$ojNamespace is an object");
	});

	test("oj.namespace redefine oj", function() {
		var ojObject;

		expect(3);

		ojObject = oj.namespace("oj");
		ok(ojObject, "ojObject defined");
		strictEqual(ojObject, oj, "oj and ojObject are the same object");
		strictEqual(typeof(ojObject), "object", "ojObject is an object");
	});

	test("oj.namespace redefine oj.namespace", function() {
		var ojNamespace, test1Namespace;

		expect(6);

		ojNamespace = oj.namespace("oj.namespace");
		strictEqual(typeof(ojNamespace), "function", "ojNamespace defined as a function");
		strictEqual(ojNamespace, oj.namespace, "oj.namespace and ojNamespace are the same object");
		strictEqual(typeof(oj.namespace), "function", "oj.namespace is still a function");

		// Make sure the oj.namespace function still works as before.
		test1Namespace = oj.namespace("oj.test1");

		ok(test1Namespace, "test1Namespace defined");
		strictEqual(test1Namespace, oj.test1, "oj.test1 and test1Namespace are the same object");
		strictEqual(typeof(test1Namespace), "object", "test1Namespace is an object");
	});

	test("oj.namespace append to oj.namespace", function() {
		var test2Namespace, test3Namespace;

		expect(7);

		test2Namespace = oj.namespace("oj.namespace.test2");

		ok(test2Namespace, "test2Namespace defined");
		strictEqual(test2Namespace, oj.namespace.test2, "oj.namespace.test2 and test2Namespace are the same object");
		strictEqual(typeof(test2Namespace), "object", "test2Namespace is an object");
		strictEqual(typeof(oj.namespace), "function", "oj.namespace is still a function");

		// Make sure the oj.namespace function still works as before.
		test3Namespace = oj.namespace("oj.test3");

		ok(test3Namespace, "test3Namespace defined");
		strictEqual(test3Namespace, oj.test3, "oj.test3 and test3Namespace are the same object");
		strictEqual(typeof(test3Namespace), "object", "test3Namespace is an object");
	});

});
