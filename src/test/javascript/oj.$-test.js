$(function() {

	module("oj.$");

	// oj.$ object tests
	test("oj.$ object defined", function() {
		expect(2);

		ok(oj.$, "oj.$ object defined");
		strictEqual(typeof(oj.$), "object", "oj.$ is an object");
	});

	// oj.$.bindAsEventListener method tests
	test("oj.$.bindAsEventListener function defined", function() {
		expect(1);

		strictEqual(typeof(oj.$.bindAsEventListener), "function", "oj.$.bindAsEventListener is a function");
	});
});
