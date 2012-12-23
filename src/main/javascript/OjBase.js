/*
 * TODO - Delete this.
 */
(function() {
	"use strict";

	var _slice = Array.prototype.slice;

	var delegate = function(fn, context) {
		return function() {
			var args = _slice.call(arguments);
			args.unshift(this);
			return fn.apply(context, args);
		};
	};

	var _subclass = function(_instance, _static) {
		// Build the prototype.
		oj.__prototyping = this.prototype;
		var _prototype = new this;
		if (_instance)
			extend(_prototype, _instance);
		delete oj.__prototyping;

		// Create the wrapper for the constructor function.
		var _constructor = _prototype.constructor;
		function _class() {
			// Don't call the constructor function when prototyping.
			if (!oj.__prototyping) {
				if (this.constructor == arguments.callee || this.__constructing) {
					// Instantiation.
					this.__constructing = true;
					_constructor.apply(this, arguments);
					delete this.__constructing;
				} else {
					// Casting.
					return extend(arguments[0], _prototype);
				}
			}
			return this;
		}
		;
		_prototype.constructor = _class;

		// Build the static interface.
		for ( var i in Base)
			_class[i] = this[i];
		_class.ancestor = this;
		_class.base = Undefined;
		// _class.init = Undefined;
		if (_static)
			extend(_class, _static);
		_class.prototype = _prototype;
		if (_class.init)
			_class.init();

		// introspection (removed when packed)
		;
		;
		;
		_class["#implements"] = [];
		;
		;
		;
		_class["#implemented_by"] = [];

		return _class;
	};

	var Base = _subclass.call(Object, {
		constructor : function() {
			if (arguments.length > 0) {
				this.extend(arguments[0]);
			}
		},

		base : function() {
			// Call this method from any other method to invoke the current
			// method's
			// ancestor (super).
		},

		extend : delegate(extend)
	}, Base = {
		ancestorOf : function(klass) {
			return _ancestorOf(this, klass);
		},

		extend : _subclass,

		forEach : function(object, block, context) {
			_Function_forEach(this, object, block, context);
		},

		implement : function(source) {
			if (typeof source == "function") {
				;
				;
				;
				if (_ancestorOf(Base, source)) {
					// introspection (removed when packed)
					;
					;
					;
					this["#implements"].push(source);
					;
					;
					;
					source["#implemented_by"].push(this);
					;
					;
					;
				}
				source = source.prototype;
			}
			// Add the interface using the extend() function.
			extend(this.prototype, source);
			return this;
		}
	});
}());