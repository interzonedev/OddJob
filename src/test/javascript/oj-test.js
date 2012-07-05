$(function() {

	module("core");

	test("oj object defined in global namespace", function() {
		expect(2);
		ok( oj, "oj object defined" );
		equal("object", typeof(oj), "oj is an object");
	});

	test("oj.namespace function defined", function() {
		ok( oj.namespace, "oj.namespace defined" );
		equal("function", typeof(oj.namespace), "oj.namespace is a function");
	});

	test("oj.emptyFunction function defined", function() {
		ok( oj.emptyFunction, "oj.emptyFunction defined" );
		equal("function", typeof(oj.emptyFunction), "oj.emptyFunction is a function");
	});

});
