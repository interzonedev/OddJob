(function() {
	//"use strict";

	var _extend, extend;

	_extend = function(instanceProperties, classProperties, singleton) {
		var superClass, propName = null, instancePropertiesClone = {}, classPropertiesClone = {},
			singletonClone = false, superClassPrototype, subClass, subClassPrototype, propValue;

		superClass = this;

		// Clone the instanceProperties argument so the original value does not get altered.
		for (propName in instanceProperties) {
			if (instanceProperties.hasOwnProperty(propName)) {
				instancePropertiesClone[propName] = instanceProperties[propName]; 
			}
		}

		// Clone the classProperties argument so the original value does not get altered.
		for (propName in classProperties) {
			if (classProperties.hasOwnProperty(propName)) {
				classPropertiesClone[propName] = classProperties[propName]; 
			}
		}

		// Add any class properties in the super class not already in the class being currently defined to the class
		// properties.
		for (propName in superClass) {
			if (superClass.hasOwnProperty(propName) && !classPropertiesClone[propName]) {
				classPropertiesClone[propName] = superClass[propName];
			}
		}

		// Force the singleton argument to a Boolean if it isn't already.
		singletonClone = !!singleton;

		debugger;
		var superClassPrototype = superClass.prototype;

		subClass = function() {};
		subClassPrototype = new superClass();

		// Copy the instance properties onto the sub class prototype.
		for (propName in instancePropertiesClone) {
			propValue = instancePropertiesClone[propName];
			subClassPrototype[propName] = propValue;
		}

		// Copy the class properties onto the sub class.
		for (propName in classPropertiesClone) {
			propValue = classPropertiesClone[propName];
			subClass[propName] = propValue;
		}

		subClass.prototype = subClassPrototype;
		subClass.prototype.constructor = subClass;

		return subClass;
	};

	extend = function(instanceProperties, classProperties, singleton) {
		var superClass, subClass;
		debugger;
		superClass = this;

		subClass = _extend.apply(superClass, [instanceProperties, classProperties, singleton]);
		subClass.extend = _extend;

		return subClass;
	};

	Class = function() {};
	Class.extend = extend;

	oj.Class2 = Class.extend({}, {}, false);
}());
