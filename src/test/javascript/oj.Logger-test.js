$(function() {
	var dummyLogger;

	dummyLogger = null;

	module("oj.Logger", {
		setup: function() {
		},
		teardown: function() {
			dummyLogger = null;
		}
	});

	// oj.Logger class tests
	test("oj.Logger class defined", function() {
		expect(1);

		strictEqual(typeof(oj.Logger), "function", "oj.Logger is defined as a class");
	});

	test("oj.Logger class name", function() {
		expect(1);

		strictEqual(oj.Logger.className, "oj.Logger", "oj.Logger.className is set");
	});

});
