$(function() {

	module("oj");

	// oj object tests
	test("oj object defined in global namespace", function() {
		expect(2);

		ok(oj, "oj object defined");
		strictEqual("object", typeof(oj), "oj is an object");
	});

	// oj.emptyFunction tests
	test("oj.emptyFunction function defined", function() {
		expect(2);

		ok(oj.emptyFunction, "oj.emptyFunction defined");
		strictEqual("function", typeof(oj.emptyFunction), "oj.emptyFunction is a function");
	});

	test("oj.emptyFunction function callable", function() {
		var result1, result2;

		expect(4);

		// Call with no arguments.
		result1 = oj.emptyFunction();

		ok(!result1, "result1 undefined");
		strictEqual("undefined", typeof(result1), "result1 is undefined");

		// Call with argument.
		result2 = oj.emptyFunction("test");

		ok(!result2, "result2 undefined");
		strictEqual("undefined", typeof(result2), "result2 is undefined");
	});

	// oj.namespace tests
	test("oj.namespace function defined", function() {
		expect(2);

		ok(oj.namespace, "oj.namespace defined");
		strictEqual("function", typeof(oj.namespace), "oj.namespace is a function");
	});

	test("oj.namespace called with undefined", function() {
		expect(1);

		raises(function() {
			oj.namespace();
		}, Error, "oj.namespace called with undefined should throw an Error");
	});

	test("oj.namespace called with null", function() {
		expect(1);

		raises(function() {
			oj.namespace(null);
		}, Error, "oj.namespace called with null should throw an Error");
	});

	test("oj.namespace called with a number", function() {
		expect(1);

		raises(function() {
			oj.namespace(1);
		}, Error, "oj.namespace called with a number should throw an Error");
	});

	test("oj.namespace called with an empty string", function() {
		expect(1);

		raises(function() {
			oj.namespace("");
		}, Error, "oj.namespace called with an empty string should throw an Error");
	});

	test("oj.namespace called with a blank string", function() {
		expect(1);

		raises(function() {
			oj.namespace("  ");
		}, Error, "oj.namespace called with a blank string should throw an Error");
	});

	test("oj.namespace called with a comma separator", function() {
		expect(1);

		raises(function() {
			oj.namespace("xyz,abc");
		}, Error, "oj.namespace called with a comma separator should throw an Error");
	});

	test("oj.namespace called with an underscore namespace", function() {
		expect(1);

		raises(function() {
			oj.namespace("xy_z.abc");
		}, Error, "oj.namespace called with an underscore namespace should throw an Error");
	});

	test("oj.namespace called with a namespace starting with a number", function() {
		expect(1);

		raises(function() {
			oj.namespace("2yz.abc");
		}, Error, "oj.namespace called with a namespace starting with a number should throw an Error");
	});

	test("oj.namespace called with a namespace with two periods", function() {
		expect(1);

		raises(function() {
			oj.namespace("xyz..abc");
		}, Error, "oj.namespace called with a namespace starting with two periods should throw an Error");
	});

	test("oj.namespace valid", function() {
		var test5Namespace1, test5Namespace2;

		expect(6);

		// Define a valid namespace.
		test5Namespace1 = oj.namespace("oj.test4.test5");

		ok(test5Namespace1, "test5Namespace1 defined");
		strictEqual(oj.test4.test5, test5Namespace1, "oj.test4.test5 and test5Namespace1 are the same object");
		strictEqual("object", typeof(test5Namespace1), "test5Namespace1 is an object");

		// Redefine the same namespace.
		test5Namespace2 = oj.namespace("oj.test4.test5");

		ok(test5Namespace2, "test5Namespace2 defined");
		strictEqual(oj.test4.test5, test5Namespace2, "oj.test4.test5 and test5Namespace2 are the same object");
		strictEqual("object", typeof(test5Namespace2), "test5Namespace2 is an object");
	});

	test("oj.namespace redefine $ namespace", function() {
		var $namespace;

		expect(4);

		$namespace = oj.namespace("$");

		ok($namespace, "$namespace defined");
		strictEqual($, $namespace, "$ and $namespace are the same object");
		strictEqual("function", typeof($namespace), "$namespace is a function");
		strictEqual(jQuery, $, "$ is still the jQuery object");
	});

	test("oj.namespace extend $ namespace", function() {
		var $ojNamespace;

		expect(3);

		$ojNamespace = oj.namespace("$.oj");

		ok($ojNamespace, "$ojNamespace defined");
		strictEqual($.oj, $ojNamespace, "$ and $ojNamespace are the same object");
		strictEqual("object", typeof($ojNamespace), "$ojNamespace is an object");
	});

	test("oj.namespace redefine oj", function() {
		var ojObject;

		expect(3);

		ojObject = oj.namespace("oj");
		ok(ojObject, "ojObject defined");
		strictEqual(oj, ojObject, "oj and ojObject are the same object");
		strictEqual("object", typeof(ojObject), "ojObject is an object");
	});

	test("oj.namespace redefine oj.namespace", function() {
		var ojNamespace, test1Namespace;

		expect(6);

		ojNamespace = oj.namespace("oj.namespace");
		ok(ojNamespace, "ojNamespace defined");
		strictEqual(oj.namespace, ojNamespace, "oj.namespace and ojNamespace are the same object");
		strictEqual("function", typeof(oj.namespace), "oj.namespace is still a function");

		// Make sure the oj.namespace function still works as before.
		test1Namespace = oj.namespace("oj.test1");

		ok(test1Namespace, "test1Namespace defined");
		strictEqual(oj.test1, test1Namespace, "oj.test1 and test1Namespace are the same object");
		strictEqual("object", typeof(test1Namespace), "test1Namespace is an object");
	});

	test("oj.namespace append to oj.namespace", function() {
		var test2Namespace, test3Namespace;

		expect(7);

		test2Namespace = oj.namespace("oj.namespace.test2");
		ok(test2Namespace, "test2Namespace defined");
		strictEqual(oj.namespace.test2, test2Namespace, "oj.namespace.test2 and test2Namespace are the same object");
		strictEqual("object", typeof(test2Namespace), "test2Namespace is an object");
		strictEqual("function", typeof(oj.namespace), "oj.namespace is still a function");

		// Make sure the oj.namespace function still works as before.
		test3Namespace = oj.namespace("oj.test3");

		ok(test3Namespace, "test3Namespace defined");
		strictEqual(oj.test3, test3Namespace, "oj.test3 and test3Namespace are the same object");
		strictEqual("object", typeof(test3Namespace), "test3Namespace is an object");
	});

});
