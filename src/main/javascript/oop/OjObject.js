(function() {
	"use strict";

	var constructFromPrototype;

	oj.namespace("oj.oop");

	constructFromPrototype = function(clazz, params, initialize) {
		var instance;

		instance = new clazz(params);

		if (initialize && ("function" === typeof (instance.init))) {
			instance.init.call(instance, params);
		}

		return instance;
	};

	/**
	 * @class
	 * 
	 * Base class to be extended by all classes in the system.
	 * 
	 * @requires oj.util.framework
	 */
	oj.oop.OjObject = base2.Base.extend(
	/**
	 * @lends oj.oop.OjObject.prototype
	 */
	{
		/**
		 * @lends oj.oop.OjObject.prototype
		 * @property {Object} clazz A reference to the class definition of this instance.
		 */
		clazz: null,

		/**
		 * @lends oj.oop.OjObject.prototype
		 * @property {String} className The name of this class. Used for logging.
		 */
		className: null,

		/**
		 * @lends oj.oop.OjObject.prototype
		 * @property {String} instanceName The name of this instance. Used for logging.
		 */
		instanceName: null,

		/**
		 * Creates a new instance of this class.
		 * 
		 * Sets the className instance property from the corresponding class property.
		 * 
		 * Sets the instanceName property from the specified parameters or sets a randomly generated value.
		 * 
		 * @param {Object} params An associative array of instantiation properties.<br />
		 *                        Optional params:<br />
		 *                        instanceName {String} The name of the instance for use in logging.
		 */
		constructor: function(params) {
			this.clazz = this.constructor;
			this.className = this.constructor.className;
			this.instanceName = (params && params.instanceName) || oj.util.framework.getUniqueId(this.className + "_instance_");
		},

		/**
		 * Empty default initialization method.
		 */
		init: function() {
		}
	}, {
		/**
		 * @lends oj.oop.OjObject
		 * @property {String} className The name of this class. Used for logging.
		 */
		className: "oj.oop.OjObject",

		/**
		 * Factory method that creates a unique instance of this classeach time it is called.
		 * 
		 * @param {Object} params An associative array of instantiation properties. These are passed directly into the
		 *                        class constructor.
		 * @param {Boolean} initialize Determines whether or not to call the init method (if defined) on the newly
		 *                             constructed instance.
		 * 
		 * @returns {Object} A unique instance of this class.
		 */
		getInstance: function(params, initialize) {
			return constructFromPrototype(this, params, initialize);
		}
	});

	/**
	 * Overrides the extend method inherited from base2.Base to allow the transference of class level properties from
	 * the super class to the sub class.
	 * 
	 * @param {String} instanceProperties The instance properties for the class being defined.
	 * @param {String} classProperties The class (static-like) properties for the class being defined.
	 * 
	 * @return {Function} Returns the same class definition as the original base2.Base.extend with class properties
	 *                    inherited from the super class.
	 */
	oj.oop.OjObject.extend = function(instanceProperties, classProperties, singleton) {
		var propName = null, clazz;

		for (propName in this) {
			// Add any class level properties in the super class not already in
			// base2.Base or the the specified class properties to the class
			// properties.
			if (this.hasOwnProperty(propName) && "classInit" !== propName && !base2.Base[propName]
					&& !classProperties[propName]) {
				classProperties[propName] = this[propName];
			}
		}

		classProperties.getInstance = function(params, initialize) {
			var instance = null;

			return function(params, initialize) {
				var instanceAlreadyExists = false, constructing = false;

				if (singleton) {
					instanceAlreadyExists = !!(instance || constructing);
				}

				if (!instanceAlreadyExists) {
					constructing = true;
					instance = constructFromPrototype(this, params, initialize);
					constructing = false;
				}

				return instance;
			};
		}();

		// Define the class.
		clazz = base2.Base.extend.apply(this, [instanceProperties, classProperties]);

		// TODO - Probably don't need this.
		// Call that class initializer function if it has been defined.
		if ("function" === typeof (clazz.classInit)) {
			clazz.classInit.call(clazz);
		}

		// Return the class definition.
		return clazz;
	};
}());
