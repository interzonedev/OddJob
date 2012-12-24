$(function() {

	module("oj.Class22");

	// oj.Class2 class tests
	test("oj.Class2 class defined", function() {
		expect(1);

		strictEqual(typeof(oj.Class2), "function", "oj.Class2 is defined as a class");
	});

	// oj.Class2.extend method tests
	test("oj.Class2.extend method defined", function() {
		expect(1);

		strictEqual(typeof(oj.Class2.extend), "function", "oj.Class2.extend is a function");
	});

	test("oj.Class2.extend use", function() {
		var Prototype1, Prototype2, prototype1, prototype2;

		expect(8);

		Prototype1 = oj.Class2.extend({
			a: "b"
		}, {
			c: "d"
		}, false);

		Prototype2 = Prototype1.extend({
			e: "f"
		}, {
			g: "h"
		}, false);

		prototype1 = new Prototype1(1);
		prototype2 = new Prototype2(2);

		debugger;
		strictEqual(typeof(Prototype1), "function", "Prototype1 is a function");
		strictEqual(typeof(Prototype2), "function", "Prototype2 is a function");
		ok((prototype1 instanceof oj.Class2), "prototype1 is an instance of oj.Class2");
		ok((prototype1 instanceof Prototype1), "prototype1 is an instance of Prototype1");
		ok(!(prototype1 instanceof Prototype2), "prototype1 is not an instance of Prototype2");
		ok((prototype2 instanceof oj.Class2), "prototype2 is an instance of oj.Class2");
		ok((prototype2 instanceof Prototype1), "prototype2 is an instance of Prototype1");
		ok((prototype2 instanceof Prototype2), "prototype2 is an instance of Prototype2");
	});

});
