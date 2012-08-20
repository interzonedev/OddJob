$(function() {
	var Singleton1, Prototype1, Singleton2, Prototype2, anonymousSubclassNameRegEx;

	anonymousSubclassNameRegEx = /^oj\.oop\.OjObject_subclass_\d+$/;

	Singleton1 = null;
	Prototype1 = null;
	Singleton2 = null;
	Prototype2 = null;

	module("oj.oop.OjObject", {
		// Redefine the classes before each test to wipe out any state altered at the class level between test
		// (especially singleton instance state).
		setup: function() {
			Singleton1 = oj.oop.OjObject.extend({
				initializedCount: 0,

				instanceProperty1: "instanceValue1",

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
				},

				init: function() {
					this.base();

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

			Prototype1 = oj.oop.OjObject.extend({
				initializedCount: 0,

				instanceProperty1: "instanceValue1",

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
				},

				init: function() {
					this.base();

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

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
					this.instanceProperty2 = params.instanceProperty2 || this.instanceProperty2;
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				},

				instanceMethod2: function(arg) {
					return this.base(arg) + " - " + this.instanceProperty2 + " - " + arg;
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

				constructor: function(params) {
					this.base(params);

					if (!params) {
						return;
					}

					this.instanceProperty1 = params.instanceProperty1 || this.instanceProperty1;
					this.instanceProperty2 = params.instanceProperty2 || this.instanceProperty2;
				},

				init: function() {
					this.base();

					this.initializedCount += 1;
				},

				instanceMethod2: function(arg) {
					return this.base(arg) + " - " + this.instanceProperty2 + " - " + arg;
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

	// oj.oop.OjObject class tests
	test("oj.oop.OjObject class defined", function() {
		expect(1);

		strictEqual("function", typeof(oj.oop.OjObject), "oj.oop.OjObject is defined as a class");
	});

	test("oj.oop.OjObject class name", function() {
		expect(1);

		strictEqual("oj.oop.OjObject", oj.oop.OjObject.className, "oj.oop.OjObject.className is set");
	});

	// oj.oop.OjObject.getInstance method tests
	test("oj.oop.OjObject.getInstance method defined", function() {
		expect(1);

		strictEqual("function", typeof(oj.oop.OjObject.getInstance), "oj.oop.OjObject.getInstance is a function");
	});

	test("oj.oop.OjObject.getInstance called with non defined values", function() {
		expect(5 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var instance;

			instance = oj.oop.OjObject.getInstance(nonDefinedValue, true);

			ok(instance, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns a defined value");
			strictEqual("object", typeof(instance), "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance");
			strictEqual(0, instance.instanceName.indexOf("oj.oop.OjObject_instance_"), "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instantiated instance");
			strictEqual("oj.oop.OjObject", instance.className, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance with the class name set");
			strictEqual(oj.oop.OjObject, instance.clazz, "oj.oop.OjObject.getInstance called with " + nonDefinedValue + " returns an instance with the class set");
		});
	});

	test("oj.oop.OjObject.getInstance called with defined values", function() {
		expect(5 * QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var instance;

			instance = oj.oop.OjObject.getInstance(definedValue, true);

			ok(instance, "oj.oop.OjObject.getInstance called with " + definedValue + " returns a defined value");
			strictEqual("object", typeof(instance), "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance");
			strictEqual(0, instance.instanceName.indexOf("oj.oop.OjObject_instance_"), "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instantiated instance");
			strictEqual("oj.oop.OjObject", instance.className, "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance with the class name set");
			strictEqual(oj.oop.OjObject, instance.clazz, "oj.oop.OjObject.getInstance called with " + definedValue + " returns an instance with the class set");
		});
	});

	test("oj.oop.OjObject.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(5);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = oj.oop.OjObject.getInstance(params, true);

		ok(instance, "oj.oop.OjObject.getInstance called with instanceName param returns a defined value");
		strictEqual("object", typeof(instance), "oj.oop.OjObject.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("oj.oop.OjObject", instance.className, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(oj.oop.OjObject, instance.clazz, "oj.oop.OjObject.getInstance called with instanceName param returns an instance with the class set");
	});

	// Singleton1 test class properties tests
	test("Singleton1 class properties", function() {
		expect(3);

		strictEqual("function", typeof(Singleton1), "Singleton1 is defined as a class");
		strictEqual("Singleton1", Singleton1.className, "The Singleton1.className class property is defined");
		strictEqual("classValue1", Singleton1.classProperty1, "The Singleton1.classProperty1 class property is defined");
	});

	// Singleton1 test class getInstance method tests
	test("Singleton1.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Singleton1.getInstance();

		ok(instance, "Singleton1.getInstance called with no params returns a defined value");
		strictEqual("object", typeof(instance), "Singleton1.getInstance called with no params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton1_instance_"), "Singleton1.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual("Singleton1", instance.className, "Singleton1.getInstance called with no params returns an instance with the class name set");
		strictEqual(Singleton1, instance.clazz, "Singleton1.getInstance called with no params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton1.getInstance called with no params returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Singleton1.getInstance({}, false);

		ok(instance, "Singleton1.getInstance called with empty params returns a defined value");
		strictEqual("object", typeof(instance), "Singleton1.getInstance called with empty params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton1_instance_"), "Singleton1.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual("Singleton1", instance.className, "Singleton1.getInstance called with empty params returns an instance with the class name set");
		strictEqual(Singleton1, instance.clazz, "Singleton1.getInstance called with empty params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton1.getInstance called with empty params returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(6);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Singleton1.getInstance(params, false);

		ok(instance, "Singleton1.getInstance called with instanceName param returns a defined value");
		strictEqual("object", typeof(instance), "Singleton1.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "Singleton1.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("Singleton1", instance.className, "Singleton1.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(Singleton1, instance.clazz, "Singleton1.getInstance called with instanceName param returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton1.getInstance called with instanceName param returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with no initialization", function() {
		var instance;

		expect(7);

		instance = Singleton1.getInstance({}, false);

		ok(instance, "Singleton1.getInstance called with no initialization returns a defined value");
		strictEqual("object", typeof(instance), "Singleton1.getInstance called with no initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton1_instance_"), "Singleton1.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual("Singleton1", instance.className, "Singleton1.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(Singleton1, instance.clazz, "Singleton1.getInstance called with no initialization returns an instance with the class set");
		strictEqual(0, instance.initializedCount, "Singleton1.getInstance called with no initialization does not initialize the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton1.getInstance called with no initialization returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called with initialization", function() {
		var instance;

		expect(7);

		instance = Singleton1.getInstance({}, true);

		ok(instance, "Singleton1.getInstance called with initialization returns a defined value");
		strictEqual("object", typeof(instance), "Singleton1.getInstance called with initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton1_instance_"), "Singleton1.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual("Singleton1", instance.className, "Singleton1.getInstance called with initialization returns an instance with the class name set");
		strictEqual(Singleton1, instance.clazz, "Singleton1.getInstance called with initialization returns an instance with the class set");
		strictEqual(1, instance.initializedCount, "Singleton1.getInstance called with initialization initializes the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton1.getInstance called with initialization returns an instance with the instance property set");
	});

	test("Singleton1.getInstance called twice", function() {
		var instance1, instance2;

		expect(14);

		instance1 = Singleton1.getInstance({}, true);
		instance2 = Singleton1.getInstance({}, true);

		ok(instance1, "Singleton1.getInstance called twice returns a defined value");
		ok(instance2, "Singleton1.getInstance called twice returns a defined value");
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
		strictEqual("instanceValue1", instance1.instanceProperty1, "Singleton1.getInstance called twice returns an instance with the instance property set");
		strictEqual("instanceValue1", instance2.instanceProperty1, "Singleton1.getInstance called twice returns an instance with the instance property set");
	});

	// Singleton1 test class instanceMethod1 instance method tests
	test("Singleton1.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton1.getInstance();

		strictEqual("function", typeof(instance.instanceMethod1), "Instances of Singleton1 should have the instanceMethod1 instance method defined");
	});
 
	test("Singleton1.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton1.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual("instanceMethod1" + " - " + arg, result, "The Singleton1.instanceMethod1 instance should return the correct result");
	});

	// Singleton1 test class instanceMethod2 instance method tests
	test("Singleton1.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton1.getInstance();

		strictEqual("function", typeof(instance.instanceMethod2), "Instances of Singleton1 should have the instanceMethod2 instance method defined");
	});

	test("Singleton1.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton1.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(instance.instanceProperty1 + " - " + arg, result, "The Singleton1.instanceMethod2 instance should return the correct result");
	});

	// Singleton1 test class classMethod1 class method tests
	test("Singleton1.classMethod1 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Singleton1.classMethod1), "Singleton1 should have the classMethod1 class method defined");
	});
 
	test("Singleton1.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton1.classMethod1(arg);

		strictEqual("classMethod1" + " - " + arg, result, "The Singleton1.classMethod1 class method should return the correct result");
	});

	// Singleton1 test class classMethod2 class method tests
	test("Singleton1.classMethod2 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Singleton1.classMethod2), "Singleton1 should have the classMethod2 class method defined");
	});
 
	test("Singleton1.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton1.classMethod2(arg);

		strictEqual(Singleton1.classProperty1 + " - " + arg, result, "The Singleton1.classMethod2 class method should return the correct result");
	});

	// Singleton2 test class properties tests
	test("Singleton2 class properties", function() {
		expect(4);

		strictEqual("function", typeof(Singleton2), "Singleton2 is defined as a class");
		strictEqual("Singleton2", Singleton2.className, "The Singleton2.className class property is defined");
		strictEqual("classValue1", Singleton2.classProperty1, "The Singleton2.classProperty1 class property is defined");
		strictEqual("classValue2", Singleton2.classProperty2, "The Singleton2.classProperty2 class property is defined");
	});

	// Singleton2 test class getInstance method tests
	test("Singleton2.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Singleton2.getInstance();

		ok(instance, "Singleton2.getInstance called with no params returns a defined value");
		strictEqual("object", typeof(instance), "Singleton2.getInstance called with no params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton2_instance_"), "Singleton2.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual("Singleton2", instance.className, "Singleton2.getInstance called with no params returns an instance with the class name set");
		strictEqual(Singleton2, instance.clazz, "Singleton2.getInstance called with no params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton2.getInstance called with no params returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Singleton2.getInstance called with no params returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Singleton2.getInstance({}, false);

		ok(instance, "Singleton2.getInstance called with empty params returns a defined value");
		strictEqual("object", typeof(instance), "Singleton2.getInstance called with empty params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton2_instance_"), "Singleton2.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual("Singleton2", instance.className, "Singleton2.getInstance called with empty params returns an instance with the class name set");
		strictEqual(Singleton2, instance.clazz, "Singleton2.getInstance called with empty params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton2.getInstance called with empty params returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Singleton2.getInstance called with empty params returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(7);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Singleton2.getInstance(params, false);

		ok(instance, "Singleton2.getInstance called with instanceName param returns a defined value");
		strictEqual("object", typeof(instance), "Singleton2.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "Singleton2.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("Singleton2", instance.className, "Singleton2.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(Singleton2, instance.clazz, "Singleton2.getInstance called with instanceName param returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton2.getInstance called with instanceName param returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Singleton2.getInstance called with instanceName param returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with no initialization", function() {
		var instance;

		expect(8);

		instance = Singleton2.getInstance({}, false);

		ok(instance, "Singleton2.getInstance called with no initialization returns a defined value");
		strictEqual("object", typeof(instance), "Singleton2.getInstance called with no initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton2_instance_"), "Singleton2.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual("Singleton2", instance.className, "Singleton2.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(Singleton2, instance.clazz, "Singleton2.getInstance called with no initialization returns an instance with the class set");
		strictEqual(0, instance.initializedCount, "Singleton2.getInstance called with no initialization does not initialize the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton2.getInstance called with no initialization returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Singleton2.getInstance called with no initialization returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with initialization", function() {
		var instance;

		expect(8);

		instance = Singleton2.getInstance({}, true);

		ok(instance, "Singleton2.getInstance called with initialization returns a defined value");
		strictEqual("object", typeof(instance), "Singleton2.getInstance called with initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton2_instance_"), "Singleton2.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual("Singleton2", instance.className, "Singleton2.getInstance called with initialization returns an instance with the class name set");
		strictEqual(Singleton2, instance.clazz, "Singleton2.getInstance called with initialization returns an instance with the class set");
		strictEqual(2, instance.initializedCount, "Singleton2.getInstance called with initialization initializes the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Singleton2.getInstance called with initialization returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Singleton2.getInstance called with initialization returns an instance with the instance properties set");
	});

	test("Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param", function() {
		var instancePropertyValue1, instancePropertyValue2, params, instance;

		expect(8);

		instancePropertyValue1 = "test1";
		instancePropertyValue2 = "test2";

		params = {
			"instanceProperty1": instancePropertyValue1,
			"instanceProperty2": instancePropertyValue2
		};

		instance = Singleton2.getInstance(params, true);

		ok(instance, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns a defined value");
		strictEqual("object", typeof(instance), "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Singleton2_instance_"), "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the default instanceName set");
		strictEqual("Singleton2", instance.className, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class name set");
		strictEqual(Singleton2, instance.clazz, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class set");
		strictEqual(instancePropertyValue1, instance.instanceProperty1, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty2 properties set");
		strictEqual(instancePropertyValue2, instance.instanceProperty2, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty2 properties set");
		strictEqual(2, instance.initializedCount, "Singleton2.getInstance called with instanceProperty1 and instanceProperty2 param only initializes the instance once");
	});

	test("Singleton2.getInstance called twice", function() {
		var instance1, instance2;

		expect(16);

		instance1 = Singleton2.getInstance({}, true);
		instance2 = Singleton2.getInstance({}, true);

		ok(instance1, "Singleton2.getInstance called twice returns a defined value");
		ok(instance1, "Singleton2.getInstance called twice returns a defined value");
		strictEqual("object", typeof(instance1), "Singleton2.getInstance called twice returns an instance");
		strictEqual("object", typeof(instance2), "Singleton2.getInstance called twice returns an instance");
		strictEqual(instance1, instance2, "Singleton2.getInstance called twice returns the same instance");
		strictEqual(instance1.instanceName, instance2.instanceName, "Singleton2.getInstance called twice returns the same instance");
		strictEqual("Singleton2", instance1.className, "Singleton2.getInstance called twice returns an instance with the class name set");
		strictEqual("Singleton2", instance2.className, "Singleton2.getInstance called twice returns an instance with the class name set");
		strictEqual(Singleton2, instance1.clazz, "Singleton2.getInstance called twice returns an instance with the class set");
		strictEqual(Singleton2, instance2.clazz, "Singleton2.getInstance called twice returns an instance with the class set");		
		strictEqual(2, instance1.initializedCount, "Singleton2.getInstance called twice only initializes the instance once");
		strictEqual(2, instance2.initializedCount, "Singleton2.getInstance called twice only initializes the instance once");
		strictEqual("instanceValue1", instance1.instanceProperty1, "Singleton2.getInstance called twice returns an instance with the instance properties set");
		strictEqual("instanceValue1", instance2.instanceProperty1, "Singleton2.getInstance called twice returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance1.instanceProperty2, "Singleton2.getInstance called twice returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance2.instanceProperty2, "Singleton2.getInstance called twice returns an instance with the instance properties set");
	});

	// Singleton1 and Singleton2 test classes getInstance method tests
	test("Singleton1.getInstance and Singleton2.getInstance called", function() {
		var instance1, instance2;

		expect(15);

		instance1 = Singleton1.getInstance({}, true);
		instance2 = Singleton2.getInstance({}, true);

		ok(instance1, "Singleton1.getInstance and Singleton2.getInstance called returns a defined value");
		ok(instance2, "Singleton1.getInstance and Singleton2.getInstance called returns a defined value");
		strictEqual("object", typeof(instance1), "Singleton1.getInstance and Singleton2.getInstance called returns an instance for Singleton1");
		strictEqual("object", typeof(instance2), "Singleton1.getInstance and Singleton2.getInstance called returns an instance for Singleton2");
		strictEqual(0, instance1.instanceName.indexOf("Singleton1_instance_"), "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the default instanceName set for Singleton1");
		strictEqual(0, instance2.instanceName.indexOf("Singleton2_instance_"), "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the default instanceName set for Singleton2");
		strictEqual("Singleton1", instance1.className, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class name set for Singleton1");
		strictEqual("Singleton2", instance2.className, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class name set for Singleton2");
		strictEqual(Singleton1, instance1.clazz, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class set for Singleton1");
		strictEqual(Singleton2, instance2.clazz, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the class set for Singleton2");
		strictEqual(1, instance1.initializedCount, "Singleton1.getInstance and Singleton2.getInstance called only initializes the instance once for Singleton1");
		strictEqual(2, instance2.initializedCount, "Singleton1.getInstance and Singleton2.getInstance called only initializes the instance once for Singleton2");
		strictEqual("instanceValue1", instance1.instanceProperty1, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the instance property set for Singleton1");
		strictEqual("instanceValue1", instance2.instanceProperty1, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the instance properties set for Singleton2");
		strictEqual("instanceValue2", instance2.instanceProperty2, "Singleton1.getInstance and Singleton2.getInstance called returns an instance with the instance properties set for Singleton2");
	});

	// Singleton2 test class instanceMethod1 instance method tests
	test("Singleton2.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton2.getInstance();

		strictEqual("function", typeof(instance.instanceMethod1), "Instances of Singleton2 should have the instanceMethod1 instance method defined");
	});

	test("Singleton2.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton2.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual("instanceMethod1" + " - " + arg, result, "The Singleton2.instanceMethod1 instance should return the correct result");
	});

	// Singleton2 test class instanceMethod2 instance method tests
	test("Singleton2.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Singleton2.getInstance();

		strictEqual("function", typeof(instance.instanceMethod2), "Instances of Singleton2 should have the instanceMethod2 instance method defined");
	});

	test("Singleton2.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Singleton2.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(instance.instanceProperty1 + " - " + arg + " - " + instance.instanceProperty2 + " - " + arg, result, "The Singleton2.instanceMethod2 instance should return the correct result");
	});

	// Singleton2 test class classMethod1 class method tests
	test("Singleton2.classMethod1 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Singleton2.classMethod1), "Singleton2 should have the classMethod1 class method defined");
	});

	test("Singleton2.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton2.classMethod1(arg);

		strictEqual("classMethod1" + " - " + arg, result, "The Singleton2.classMethod1 class method should return the correct result");
	});

	// Singleton2 test class classMethod2 class method tests
	test("Singleton2.classMethod2 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Singleton2.classMethod2), "Singleton2 should have the classMethod2 class method defined");
	});

	test("Singleton2.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Singleton2.classMethod2(arg);

		strictEqual(Singleton1.classProperty1 + " - " + arg + " - " + Singleton2.classProperty2 + " - " + arg, result, "The Singleton2.classMethod2 class method should return the correct result");
	});

	// Prototype1 test class properties tests
	test("Prototype1 class properties", function() {
		expect(3);

		strictEqual("function", typeof(Prototype1), "Prototype1 is defined as a class");
		strictEqual("Prototype1", Prototype1.className, "The Prototype1.className class property is defined");
		strictEqual("classValue1", Prototype1.classProperty1, "The Prototype1.classProperty1 class property is defined");
	});

	// Prototype1 test class getInstance method tests
	test("Prototype1.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Prototype1.getInstance();

		ok(instance, "Prototype1.getInstance called with no params returns a defined value");
		strictEqual("object", typeof(instance), "Prototype1.getInstance called with no params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual("Prototype1", instance.className, "Prototype1.getInstance called with no params returns an instance with the class name set");
		strictEqual(Prototype1, instance.clazz, "Prototype1.getInstance called with no params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype1.getInstance called with no params returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(6);

		instance = Prototype1.getInstance({}, false);

		ok(instance, "Prototype1.getInstance called with empty params returns a defined value");
		strictEqual("object", typeof(instance), "Prototype1.getInstance called with empty params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual("Prototype1", instance.className, "Prototype1.getInstance called with empty params returns an instance with the class name set");
		strictEqual(Prototype1, instance.clazz, "Prototype1.getInstance called with empty params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype1.getInstance called with empty params returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(6);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Prototype1.getInstance(params, false);

		ok(instance, "Prototype1.getInstance called with instanceName param returns a defined value");
		strictEqual("object", typeof(instance), "Prototype1.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "Prototype1.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("Prototype1", instance.className, "Prototype1.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(Prototype1, instance.clazz, "Prototype1.getInstance called with instanceName param returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype1.getInstance called with instanceName param returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with no initialization", function() {
		var instance;

		expect(7);

		instance = Prototype1.getInstance({}, false);

		ok(instance, "Prototype1.getInstance called with no initialization returns a defined value");
		strictEqual("object", typeof(instance), "Prototype1.getInstance called with no initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual("Prototype1", instance.className, "Prototype1.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(Prototype1, instance.clazz, "Prototype1.getInstance called with no initialization returns an instance with the class set");
		strictEqual(0, instance.initializedCount, "Prototype1.getInstance called with no initialization does not initialize the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype1.getInstance called with no initialization returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called with initialization", function() {
		var instance;

		expect(7);

		instance = Prototype1.getInstance({}, true);

		ok(instance, "Prototype1.getInstance called with initialization returns a defined value");
		strictEqual("object", typeof(instance), "Prototype1.getInstance called with initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual("Prototype1", instance.className, "Prototype1.getInstance called with initialization returns an instance with the class name set");
		strictEqual(Prototype1, instance.clazz, "Prototype1.getInstance called with initialization returns an instance with the class set");
		strictEqual(1, instance.initializedCount, "Prototype1.getInstance called with initialization initializes the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype1.getInstance called with initialization returns an instance with the instance property set");
	});

	test("Prototype1.getInstance called twice", function() {
		var instance1, instance2;

		expect(16);

		instance1 = Prototype1.getInstance({}, true);
		instance2 = Prototype1.getInstance({}, true);

		ok(instance1 !== instance2, "Prototype1.getInstance called twice returns the distinct instances");
		ok(instance1, "Prototype1.getInstance called twice returns a defined value");
		ok(instance2, "Prototype1.getInstance called twice returns a defined value");
		strictEqual("object", typeof(instance1), "Prototype1.getInstance called twice returns an instance");
		strictEqual("object", typeof(instance2), "Prototype1.getInstance called twice returns an instance");
		strictEqual(0, instance1.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance called twice returns an instance with the default instanceName set");
		strictEqual(0, instance2.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance called twice returns an instance with the default instanceName set");
		ok(instance1.instanceName !== instance2.instanceName, "Prototype1.getInstance called twice returns the distinct instances");
		strictEqual("Prototype1", instance1.className, "Prototype1.getInstance called twice returns an instance with the class name set");
		strictEqual("Prototype1", instance2.className, "Prototype1.getInstance called twice returns an instance with the class name set");
		strictEqual(Prototype1, instance1.clazz, "Prototype1.getInstance called twice returns an instance with the class set");
		strictEqual(Prototype1, instance2.clazz, "Prototype1.getInstance called twice returns an instance with the class set");
		strictEqual(1, instance1.initializedCount, "Prototype1.getInstance called twice only initializes the instance once");
		strictEqual(1, instance2.initializedCount, "Prototype1.getInstance called twice only initializes the instance once");
		strictEqual("instanceValue1", instance1.instanceProperty1, "Prototype1.getInstance called twice returns an instance with the instance property set");
		strictEqual("instanceValue1", instance2.instanceProperty1, "Prototype1.getInstance called twice returns an instance with the instance property set");
	});

	// Prototype1 test class instanceMethod1 instance method tests
	test("Prototype1.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype1.getInstance();

		strictEqual("function", typeof(instance.instanceMethod1), "Instances of Prototype1 should have the instanceMethod1 instance method defined");
	});

	test("Prototype1.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype1.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual("instanceMethod1" + " - " + arg, result, "The Prototype1.instanceMethod1 instance should return the correct result");
	});

	// Prototype1 test class instanceMethod2 instance method tests
	test("Prototype1.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype1.getInstance();

		strictEqual("function", typeof(instance.instanceMethod2), "Instances of Prototype1 should have the instanceMethod2 instance method defined");
	});

	test("Prototype1.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype1.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(instance.instanceProperty1 + " - " + arg, result, "The Prototype1.instanceMethod2 instance should return the correct result");
	});

	// Prototype1 test class classMethod1 class method tests
	test("Prototype1.classMethod1 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Prototype1.classMethod1), "Prototype1 should have the classMethod1 class method defined");
	});

	test("Prototype1.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype1.classMethod1(arg);

		strictEqual("classMethod1" + " - " + arg, result, "The Prototype1.classMethod1 class method should return the correct result");
	});

	// Prototype1 test class classMethod2 class method tests
	test("Prototype1.classMethod2 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Prototype1.classMethod2), "Prototype1 should have the classMethod2 class method defined");
	});

	test("Prototype1.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype1.classMethod2(arg);

		strictEqual(Prototype1.classProperty1 + " - " + arg, result, "The Prototype1.classMethod2 class method should return the correct result");
	});

	// Prototype2 test class properties tests
	test("Prototype2 class properties", function() {
		expect(4);

		strictEqual("function", typeof(Prototype2), "Prototype2 is defined as a class");
		strictEqual("Prototype2", Prototype2.className, "The Prototype2.className class property is defined");
		strictEqual("classValue1", Prototype2.classProperty1, "The Prototype2.classProperty1 class property is defined");
		strictEqual("classValue2", Prototype2.classProperty2, "The Prototype2.classProperty2 class property is defined");
	});

	// Prototype2 test class getInstance method tests
	test("Prototype2.getInstance called with no params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Prototype2.getInstance();

		ok(instance, "Prototype2.getInstance called with no params returns a defined value");
		strictEqual("object", typeof(instance), "Prototype2.getInstance called with no params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called with no params returns an instance with the default instanceName set");
		strictEqual("Prototype2", instance.className, "Prototype2.getInstance called with no params returns an instance with the class name set");
		strictEqual(Prototype2, instance.clazz, "Prototype2.getInstance called with no params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype2.getInstance called with no params returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Prototype2.getInstance called with no params returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with empty params sets default properties on instance", function() {
		var instance;

		expect(7);

		instance = Prototype2.getInstance({}, false);

		ok(instance, "Prototype2.getInstance called with empty params returns a defined value");
		strictEqual("object", typeof(instance), "Prototype2.getInstance called with empty params returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called with empty params returns an instance with the default instanceName set");
		strictEqual("Prototype2", instance.className, "Prototype2.getInstance called with empty params returns an instance with the class name set");
		strictEqual(Prototype2, instance.clazz, "Prototype2.getInstance called with empty params returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype2.getInstance called with empty params returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Prototype2.getInstance called with empty params returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with instanceName param", function() {
		var instanceName, params, instance;

		expect(7);

		instanceName = "instance1";

		params = {
			"instanceName": instanceName
		};

		instance = Prototype2.getInstance(params, false);

		ok(instance, "Prototype2.getInstance called with instanceName param returns a defined value");
		strictEqual("object", typeof(instance), "Prototype2.getInstance called with instanceName param returns an instance");
		strictEqual(instanceName, instance.instanceName, "Prototype2.getInstance called with instanceName param returns an instance with instanceName set");
		strictEqual("Prototype2", instance.className, "Prototype2.getInstance called with instanceName param returns an instance with the class name set");
		strictEqual(Prototype2, instance.clazz, "Prototype2.getInstance called with instanceName param returns an instance with the class set");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype2.getInstance called with instanceName param returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Prototype2.getInstance called with instanceName param returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with no initialization", function() {
		var instance;

		expect(8);

		instance = Prototype2.getInstance({}, false);

		ok(instance, "Prototype2.getInstance called with no initialization returns a defined value");
		strictEqual("object", typeof(instance), "Prototype2.getInstance called with no initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called with no initialization returns an instance with the default instanceName set");
		strictEqual("Prototype2", instance.className, "Prototype2.getInstance called with no initialization returns an instance with the class name set");
		strictEqual(Prototype2, instance.clazz, "Prototype2.getInstance called with no initialization returns an instance with the class set");
		strictEqual(0, instance.initializedCount, "Prototype2.getInstance called with no initialization does not initialize the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype2.getInstance called with no initialization returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Prototype2.getInstance called with no initialization returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with initialization", function() {
		var instance;

		expect(8);

		instance = Prototype2.getInstance({}, true);

		ok(instance, "Prototype2.getInstance called with initialization returns a defined value");
		strictEqual("object", typeof(instance), "Prototype2.getInstance called with initialization returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called with initialization returns an instance with the default instanceName set");
		strictEqual("Prototype2", instance.className, "Prototype2.getInstance called with initialization returns an instance with the class name set");
		strictEqual(Prototype2, instance.clazz, "Prototype2.getInstance called with initialization returns an instance with the class set");
		strictEqual(2, instance.initializedCount, "Prototype2.getInstance called with initialization initializes the instance");
		strictEqual("instanceValue1", instance.instanceProperty1, "Prototype2.getInstance called with initialization returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance.instanceProperty2, "Prototype2.getInstance called with initialization returns an instance with the instance properties set");
	});

	test("Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param", function() {
		var instancePropertyValue1, instancePropertyValue2, params, instance;

		expect(8);

		instancePropertyValue1 = "test1";
		instancePropertyValue2 = "test2";

		params = {
			"instanceProperty1": instancePropertyValue1,
			"instanceProperty2": instancePropertyValue2
		};

		instance = Prototype2.getInstance(params, true);

		ok(instance, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns a defined value");
		strictEqual("object", typeof(instance), "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance");
		strictEqual(0, instance.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the default instanceName set");
		strictEqual("Prototype2", instance.className, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class name set");
		strictEqual(Prototype2, instance.clazz, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the class set");
		strictEqual(instancePropertyValue1, instance.instanceProperty1, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty1 property set");
		strictEqual(instancePropertyValue2, instance.instanceProperty2, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param returns an instance with the instanceProperty2 property set");
		strictEqual(2, instance.initializedCount, "Prototype2.getInstance called with instanceProperty1 and instanceProperty2 param only initializes the instance once");
	});

	test("Prototype2.getInstance called twice", function() {
		var instance1, instance2;

		expect(18);

		instance1 = Prototype2.getInstance({}, true);
		instance2 = Prototype2.getInstance({}, true);

		ok(instance1 !== instance2, "Prototype2.getInstance called twice returns the distinct instances");
		ok(instance1, "Prototype2.getInstance called twice returns a defined value");
		ok(instance2, "Prototype2.getInstance called twice returns a defined value");
		strictEqual("object", typeof(instance1), "Prototype2.getInstance called twice returns an instance");
		strictEqual("object", typeof(instance2), "Prototype2.getInstance called twice returns an instance");
		strictEqual(0, instance1.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called twice returns an instance with the default instanceName set");
		strictEqual(0, instance2.instanceName.indexOf("Prototype2_instance_"), "Prototype2.getInstance called twice returns an instance with the default instanceName set");
		ok(instance1.instanceName !== instance2.instanceName, "Prototype2.getInstance called twice returns the distinct instances");
		strictEqual("Prototype2", instance1.className, "Prototype2.getInstance called twice returns an instance with the class name set");
		strictEqual("Prototype2", instance2.className, "Prototype2.getInstance called twice returns an instance with the class name set");
		strictEqual(Prototype2, instance1.clazz, "Prototype2.getInstance called twice returns an instance with the class set");
		strictEqual(Prototype2, instance2.clazz, "Prototype2.getInstance called twice returns an instance with the class set");
		strictEqual(2, instance1.initializedCount, "Prototype2.getInstance called twice only initializes the instance once");
		strictEqual(2, instance2.initializedCount, "Prototype2.getInstance called twice only initializes the instance once");
		strictEqual("instanceValue1", instance1.instanceProperty1, "Prototype2.getInstance called twice returns an instance with the instance properties set");
		strictEqual("instanceValue1", instance2.instanceProperty1, "Prototype2.getInstance called twice returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance1.instanceProperty2, "Prototype2.getInstance called twice returns an instance with the instance properties set");
		strictEqual("instanceValue2", instance2.instanceProperty2, "Prototype2.getInstance called twice returns an instance with the instance properties set");
	});

	// Prototype1 and Prototype2 test classes getInstance method tests
	test("Prototype1.getInstance and Prototype2.getInstance called", function() {
		var instance1, instance2;

		expect(15);

		instance1 = Prototype1.getInstance({}, true);
		instance2 = Prototype2.getInstance({}, true);

		ok(instance1, "Prototype1.getInstance and Prototype2.getInstance called returns a defined value");
		ok(instance2, "Prototype1.getInstance and Prototype2.getInstance called returns a defined value");
		strictEqual("object", typeof(instance1), "Prototype1.getInstance and Prototype2.getInstance called returns an instance for Prototype1");
		strictEqual("object", typeof(instance2), "Prototype1.getInstance and Prototype2.getInstance called returns an instance for Prototype2");
		strictEqual(0, instance1.instanceName.indexOf("Prototype1_instance_"), "Prototype1.getInstance and Prototype2.getInstance called returns for Prototype1 an instance with the default instanceName set");
		strictEqual(0, instance2.instanceName.indexOf("Prototype2_instance_"), "Prototype1.getInstance and Prototype2.getInstance called returns for Prototype2 an instance with the default instanceName set");
		strictEqual("Prototype1", instance1.className, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class name set for Prototype1");
		strictEqual("Prototype2", instance2.className, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class name set for Prototype2");
		strictEqual(Prototype1, instance1.clazz, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class set for Prototype1");
		strictEqual(Prototype2, instance2.clazz, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the class set for Prototype2");
		strictEqual(1, instance1.initializedCount, "Prototype1.getInstance and Prototype2.getInstance called only initializes the instance once for Prototype1");
		strictEqual(2, instance2.initializedCount, "Prototype1.getInstance and Prototype2.getInstance called only initializes the instance once for Prototype2");
		strictEqual("instanceValue1", instance1.instanceProperty1, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the instance property set for Prototype1");
		strictEqual("instanceValue1", instance2.instanceProperty1, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the instance properties set for Prototype2");
		strictEqual("instanceValue2", instance2.instanceProperty2, "Prototype1.getInstance and Prototype2.getInstance called returns an instance with the instance properties set for Prototype2");
	});

	// Prototype2 test class instanceMethod1 instance method tests
	test("Prototype2.instanceMethod1 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype2.getInstance();

		strictEqual("function", typeof(instance.instanceMethod1), "Instances of Prototype2 should have the instanceMethod1 instance method defined");
	});

	test("Prototype2.instanceMethod1 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype2.getInstance();

		arg = "test1";

		result = instance.instanceMethod1(arg);

		strictEqual("instanceMethod1" + " - " + arg, result, "The Prototype2.instanceMethod1 instance should return the correct result");
	});

	// Prototype2 test class instanceMethod2 instance method tests
	test("Prototype2.instanceMethod2 instance method defined", function() {
		var instance;

		expect(1);

		instance = Prototype2.getInstance();

		strictEqual("function", typeof(instance.instanceMethod2), "Instances of Prototype2 should have the instanceMethod2 instance method defined");
	});

	test("Prototype2.instanceMethod2 instance method called", function() {
		var instance, arg, result;

		expect(1);

		instance = Prototype2.getInstance();

		arg = "test1";

		result = instance.instanceMethod2(arg);

		strictEqual(instance.instanceProperty1 + " - " + arg + " - " + instance.instanceProperty2 + " - " + arg, result, "The Prototype2.instanceMethod2 instance should return the correct result");
	});

	// Prototype2 test class classMethod1 class method tests
	test("Prototype2.classMethod1 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Prototype2.classMethod1), "Prototype2 should have the classMethod1 class method defined");
	});

	test("Prototype2.classMethod1 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype2.classMethod1(arg);

		strictEqual("classMethod1" + " - " + arg, result, "The Prototype2.classMethod1 class method should return the correct result");
	});

	// Prototype2 test class classMethod2 class method tests
	test("Prototype2.classMethod2 class method defined", function() {
		expect(1);

		strictEqual("function", typeof(Prototype2.classMethod2), "Prototype2 should have the classMethod2 class method defined");
	});

	test("Prototype2.classMethod2 class method called", function() {
		var arg, result;

		expect(1);

		arg = "test1";

		result = Prototype2.classMethod2(arg);

		strictEqual(Prototype2.classProperty1 + " - " + arg + " - " + Prototype2.classProperty2 + " - " + arg, result, "The Prototype2.classMethod2 class method should return the correct result");
	});

	// oj.oop.OjObject.extend method tests
	test("oj.oop.OjObject.extend method defined", function() {
		expect(1);

		strictEqual("function", typeof(oj.oop.OjObject.extend), "oj.oop.OjObject.extend is a function");
	});

	test("oj.oop.OjObject.extend called with non defined values", function() {
		expect(10 * QUnit.oj.nonDefinedValues.length);

		$.each(QUnit.oj.nonDefinedValues, function(i, nonDefinedValue) {
			var subClass, instance;

			subClass = oj.oop.OjObject.extend(nonDefinedValue, nonDefinedValue, nonDefinedValue);

			strictEqual("function", typeof(subClass), "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a defined subclass");
			ok(anonymousSubclassNameRegEx.test(subClass.className), "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a subclass with the class name set to a random value");
			strictEqual("function", typeof(subClass.getInstance), "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a subclass with the getInstance method defined");
			strictEqual("function", typeof(subClass.extend), "oj.oop.OjObject.extend called with " + nonDefinedValue + " returns a subclass with the extend method defined");

			instance = subClass.getInstance();

			ok(instance, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns a defined value");
			strictEqual("object", typeof(instance), "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance");
			strictEqual(0, instance.instanceName.indexOf(subClass.className + "_instance_"), "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the default instanceName set");
			strictEqual(subClass.className, instance.className, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the class name set");
			strictEqual(subClass, instance.clazz, "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the class set");
			strictEqual("function", typeof(instance.init), "getInstance called on anonymous subclass of oj.oop.OjObject with " + nonDefinedValue + " returns an instance with the init method defined");
		});
	});

	test("oj.oop.OjObject.extend called with defined values", function() {
		expect(10 * QUnit.oj.definedInstances.length);

		$.each(QUnit.oj.definedInstances, function(i, definedValue) {
			var subClass, instance;

			subClass = oj.oop.OjObject.extend(definedValue, definedValue, definedValue);

			strictEqual("function", typeof(subClass), "oj.oop.OjObject.extend called with " + definedValue + " returns a defined subclass");
			ok(anonymousSubclassNameRegEx.test(subClass.className), "oj.oop.OjObject.extend called with " + definedValue + " returns a subclass with the class name set to a random value");
			strictEqual("function", typeof(subClass.getInstance), "oj.oop.OjObject.extend called with " + definedValue + " returns a subclass with the getInstance method defined");
			strictEqual("function", typeof(subClass.extend), "oj.oop.OjObject.extend called with " + definedValue + " returns a subclass with the extend method defined");

			instance = subClass.getInstance();

			ok(instance, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns a defined value");
			strictEqual("object", typeof(instance), "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance");
			strictEqual(0, instance.instanceName.indexOf(subClass.className + "_instance_"), "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the default instanceName set");
			strictEqual(subClass.className, instance.className, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the class name set");
			strictEqual(subClass, instance.clazz, "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the class set");
			strictEqual("function", typeof(instance.init), "getInstance called on anonymous subclass of oj.oop.OjObject with " + definedValue + " returns an instance with the init method defined");
		});
	});

	test("oj.oop.OjObject.extend called with empty params", function() {
		var subClass, instance;

		expect(10);

		subClass = oj.oop.OjObject.extend({}, {}, false);

		strictEqual("function", typeof(subClass), "oj.oop.OjObject.extend called with empty params returns a defined subclass");
		ok(anonymousSubclassNameRegEx.test(subClass.className), "oj.oop.OjObject.extend called with empty params returns a subclass with the class name set to a random value");
		strictEqual("function", typeof(subClass.getInstance), "oj.oop.OjObject.extend called with empty params returns a subclass with the getInstance method defined");
		strictEqual("function", typeof(subClass.extend), "oj.oop.OjObject.extend called with empty params returns a subclass with the extend method defined");

		instance = subClass.getInstance();

		ok(instance, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns a defined value");
		strictEqual("object", typeof(instance), "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance");
		strictEqual(0, instance.instanceName.indexOf(subClass.className + "_instance_"), "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the default instanceName set");
		strictEqual(subClass.className, instance.className, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the class name set");
		strictEqual(subClass, instance.clazz, "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the class set");
		strictEqual("function", typeof(instance.init), "getInstance called on anonymous subclass of oj.oop.OjObject with no params returns an instance with the init method defined");
	});
});
