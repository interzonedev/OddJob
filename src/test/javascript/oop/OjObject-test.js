$(function() {
	var Singleton1, Singleton2, Prototype1, Prototype2;

	Singleton1 = null;
	Singleton2 = null;
	Prototype1 = null;
	Prototype2 = null;

	module( "oj.oop.OjObject", {
		setup: function() {
			// Define test classes
			Singleton1 = oj.oop.OjObject.extend({
				initializedCount: 0,

				constructor: function(params) {
					this.base(params);
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				}
			},{
				className: "Singleton1"
			}, true);

			Singleton2 = oj.oop.OjObject.extend({
				initializedCount: 0,

				constructor: function(params) {
					this.base(params);
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				}
			},{
				className: "Singleton2"
			}, true);

			Prototype1 = oj.oop.OjObject.extend({
				initializedCount: 0,

				constructor: function(params) {
					this.base(params);
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				}
			},{
				className: "Prototype1",
				classProperty: "classValue"
			});

			Prototype2 = Prototype1.extend({
				constructor: function(params) {
					this.base(params);
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				}
			},{
				className: "Prototype2"
			});
		},
		teardown: function() {
			Singleton1 = null;
			Singleton2 = null;
			Prototype1 = null;
			Prototype2 = null;
		}
	});

	// oj.oop.OjObject class tests
	test("oj.oop.OjObject class defined", function() {
		expect(2);

		ok(oj.oop.OjObject, "oj.oop.OjObject class defined");
		strictEqual("function", typeof(oj.oop.OjObject), "oj.oop.OjObject is a function");
	});

	test("oj.oop.OjObject class name", function() {
		expect(1);

		strictEqual("oj.oop.OjObject", oj.oop.OjObject.className, "oj.oop.OjObject.className is set");
	});

	// oj.oop.OjObject.getInstance method tests
	test("oj.oop.OjObject.getInstance method defined", function() {
		expect(2);

		ok(oj.oop.OjObject.getInstance, "oj.oop.OjObject.getInstance object defined");
		strictEqual("function", typeof(oj.oop.OjObject.getInstance), "oj.oop.OjObject.getInstance is a function");
	});

	test("oj.oop.OjObject.getInstance called with non defined values", function() {
		expect(4 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var instance;

			instance = oj.oop.OjObject.getInstance(nonDefinedValue, true);

			strictEqual("object", typeof(instance), "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance");
			strictEqual(0, instance.instanceName.indexOf("oj.oop.OjObject_instance_"), "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instantiated instance");
			strictEqual("oj.oop.OjObject", instance.className, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance with the class name set");
			strictEqual(oj.oop.OjObject, instance.clazz, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance with the class set");
		});
	});

	test("oj.oop.OjObject.getInstance called with defined values", function() {
		expect(4 * QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var instance;

			instance = oj.oop.OjObject.getInstance(definedValue, true);

			strictEqual("object", typeof(instance), "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance");
			strictEqual(0, instance.instanceName.indexOf("oj.oop.OjObject_instance_"), "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instantiated instance");
			strictEqual("oj.oop.OjObject", instance.className, "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance with the class name set");
			strictEqual(oj.oop.OjObject, instance.clazz, "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance with the class set");
		});
	});

	test("oj.oop.OjObject.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(4);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = oj.oop.OjObject.getInstance(params, true);

		strictEqual("object", typeof(instance), "oj.oop.OjObject.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("oj.oop.OjObject", instance.className, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(oj.oop.OjObject, instance.clazz, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with the class set");
	});

	// Singleton test class tests
	test("Singleton1.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(4);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Singleton1.getInstance(params, true);

		strictEqual("object", typeof(instance), "Singleton1.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "Singleton1.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("Singleton1", instance.className, "Singleton1.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(Singleton1, instance.clazz, "Singleton1.getInstance called with instanceName param returns an instance with the class set");
	});

	test("Singleton1.getInstance called twice", function() {
		var instance1, instance2;

		expect(10);

		instance1 = Singleton1.getInstance({}, true);
		instance2 = Singleton1.getInstance({}, true);

		strictEqual("object", typeof(instance1), "Singleton1.getInstance called twice returns an instance");
		strictEqual("object", typeof(instance2), "Singleton1.getInstance called twice returns an instance");
		strictEqual(instance1, instance2, "Singleton1.getInstance called twice returns the same instance");
		strictEqual(instance1.instanceName, instance2.instanceName, "Singleton1.getInstance called twice returns the same instance");
		strictEqual("Singleton1", instance1.className, "Singleton1.getInstance called twice returns an instance with the class name set");
		strictEqual("Singleton1", instance2.className, "Singleton1.getInstance called twice returns an instance with the class name set");
		strictEqual(Singleton1, instance1.clazz, "Singleton1.getInstance called twice returns an instance with the class set");
		strictEqual(Singleton1, instance2.clazz, "Singleton1.getInstance called twice returns an instance with the class set");		
		strictEqual(1, instance1.initializedCount, "Singleton1.getInstance called twice only initializes the instance once");
		strictEqual(1, instance2.initializedCount, "Singleton1.getInstance called twice only initializes the instance once");
	});

	// Prototype test class tests
	test("Prototype1.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(4);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Prototype1.getInstance(params, true);

		strictEqual("object", typeof(instance), "Prototype1.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "Prototype1.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("Prototype1", instance.className, "Prototype1.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(Prototype1, instance.clazz, "Prototype1.getInstance called with instanceName param returns an instance with the class set");
	});

	// TODO - Need more prototype tests.

	// oj.oop.OjObject.extend method tests
	test("oj.oop.OjObject.extend method defined", function() {
		expect(2);

		ok(oj.oop.OjObject.extend, "oj.oop.OjObject.extend object defined");
		strictEqual("function", typeof(oj.oop.OjObject.extend), "oj.oop.OjObject.extend is a function");
	});

});
