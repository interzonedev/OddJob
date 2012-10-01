(function($) {
	"use strict";

	if (!$) {
		return;
	}

	/**
	 * @namespace
	 * 
	 * General framework utility methods that depend on or enhance the jQuery framework.
	 * 
	 * @requires oj.util
	 */
	oj.$ = {
		/**
		 * Uses jQuery to bind the event fired on the target to the handler.  The specified handler will be executed in
		 * context.  Preserves the "this" keyword inside of the handler function.
		 * 
		 * @param {Object} target The element that should listen for evt.
		 * @param {Object} evt The DOM event that is to be bound when fired on target.
		 * @param {Object} context The context in which the handler function executes. The context will be the object
		 *                         the "this" keyword refers to inside the handler function definition.
		 * @param {Function} handler The function that should execute when the event is fired on the target.
		 */
		bindAsEventListener: function(target, evt, context, handler) {
			var handlerWrapper;

			handlerWrapper = oj.util.getFunctionInContext(context, handler);
			$(target).bind(evt, handlerWrapper);
		}
	};
}(jQuery));
