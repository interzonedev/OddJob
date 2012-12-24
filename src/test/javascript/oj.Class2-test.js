$(function() {

	var Singleton1, Prototype1, Singleton2, Prototype2, anonymousSubclassNameRegEx;

	anonymousSubclassNameRegEx = /^oj\.OjObject_subclass_\d+$/;

	Singleton1 = null;
	Prototype1 = null;
	Singleton2 = null;
	Prototype2 = null;

	module("oj.Class2", {
		// Redefine the classes before each test to wipe out any state altered at the class level between test
		// (especially singleton instance state).
		setup: function() {
			Singleton1 = oj.Class2.extend({
				initializedCount: 0,

				instanceProperty1: "instanceValue1",

				construct: function(params) {
					//this._super(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
				},

				init: function() {
					//this._super();

					this.initializedCount += 1;
				},

				instanceMethod1: function(arg) {
					return "instanceMethod1" + " - " + arg;
				},

				instanceMethod2: function(arg) {
					return this.instanceProperty1 + " - " + arg;
				}
			},{
				className: "Singleton1",

				classProperty1: "classValue1",

				classMethod1: function(arg) {
					return "classMethod1" + " - " + arg;
				},

				classMethod2: function(arg) {
					return this.classProperty1 + " - " + arg;
				}
			}, true);

			Prototype1 = oj.Class2.extend({
				initializedCount: 0,

				instanceProperty1: "instanceValue1",

				construct: function(params) {
					//this._super(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
				},

				init: function() {
					//this._super();

					this.initializedCount += 1;
				},

				instanceMethod1: function(arg) {
					return "instanceMethod1" + " - " + arg;
				},

				instanceMethod2: function(arg) {
					return this.instanceProperty1 + " - " + arg;
				}
			},{
				className: "Prototype1",

				classProperty1: "classValue1",

				classMethod1: function(arg) {
					return "classMethod1" + " - " + arg;
				},

				classMethod2: function(arg) {
					return this.classProperty1 + " - " + arg;
				}
			});

			Singleton2 = Prototype1.extend({
				instanceProperty2: "instanceValue2",

				construct: function(params) {
					//this._super(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
					this.instanceProperty2 = params.instanceProperty2 || this.instanceProperty2;
				},

				init: function() {
					//this._super();

					this.initializedCount += 1;
				},

				instanceMethod2: function(arg) {
					return /*this._super(arg) +*/ " - " + this.instanceProperty2 + " - " + arg;
				}
			},{
				className: "Singleton2",

				classProperty2: "classValue2",

				classMethod2: function(arg) {
					return this.ancestor.classMethod2(arg) + " - " + this.classProperty2 + " - " + arg;
				}
			}, true);

			Prototype2 = Singleton1.extend({
				instanceProperty2: "instanceValue2",

				construct: function(params) {
					//this._super(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
					this.instanceProperty2 = params.instanceProperty2 || this.instanceProperty2;
				},

				init: function() {
					//this._super();

					this.initializedCount += 1;
				},

				instanceMethod2: function(arg) {
					return /*this._super(arg) +*/ " - " + this.instanceProperty2 + " - " + arg;
				}
			},{
				className: "Prototype2",

				classProperty2: "classValue2",

				classMethod2: function(arg) {
					return this.ancestor.classMethod2(arg) + " - " + this.classProperty2 + " - " + arg;
				}
			});
		},
		teardown: function() {
			Singleton1 = null;
			Prototype1 = null;
			Singleton2 = null;
			Prototype2 = null;
		}
	});

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
		var prototype1, prototype2;

		expect(8);

		prototype1 = Prototype1.getInstance({a: "b"}, true);
		prototype2 = Prototype2.getInstance({c: "d"}, true);
		singleton1 = Singleton1.getInstance({d: "e"}, true);
		singleton2 = Singleton2.getInstance({f: "g"}, true);

		strictEqual(typeof(Prototype1), "function", "Prototype1 is a function");
		strictEqual(typeof(Prototype2), "function", "Prototype2 is a function");
		ok((prototype1 instanceof oj.Class2), "prototype1 is an instance of oj.Class2");
		ok((prototype1 instanceof Prototype1), "prototype1 is an instance of Prototype1");
		ok(!(prototype1 instanceof Prototype2), "prototype1 is not an instance of Prototype2");
		ok((prototype2 instanceof oj.Class2), "prototype2 is an instance of oj.Class2");
		ok(!(prototype2 instanceof Prototype1), "prototype2 is not an instance of Prototype1");
		ok((prototype2 instanceof Prototype2), "prototype2 is an instance of Prototype2");
	});

});
