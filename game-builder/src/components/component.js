/**
 * # component.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html)
 *
 * Depends of:
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * Every components extends from the object defined in this module. If you add this
 * to a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) it will do nothing, so it needs to be extended.
 *
 * The idea behind components is being able to add logic to a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
 * with out hardcoding it in the [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) itself.
 *
 * If you are crafty enough when writting components you may even be able to share their
 * functionality between completely different [game-objects](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
 *
 * ### The Component object extends [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html) so it provides a few events to hook into:
 *
 * ### **added** 
 * When it is added to a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) 
 * 
 * Registered callbacks get the component as argument. 
 * ``` javascript  
 * component.on(component.ADD, function(component) {});
 * ``` 
 *
 * ### **removed**
 * When it is removed from a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html). 
 *
 * Registered callbacks get the component as argument.
 * ``` javascript  
 * component.on(component.REMOVE, function(component) {});
 * ```
 *
 * ### **recycle**
 * When the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) is sent
 * back to the [game-object-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/game-object-pool.html) it triggers
 * this event which sends the component back to the [component-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html)
 *
 * Registered callbacks get the component as argument.
 * ``` javascript  
 * component.on(component.RECYCLE, function(component) {});
 * ```
 * 
 */

/**
 * Extend logic
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["delegate"], function(Delegate) {

	var Component = Delegate.extend({
		init: function() {
			this._super();

			this.poolId = null;
			this.parent = null;
		},

		/**
		 * <p style='color:#AD071D'><strong>configure</strong></p>
		 *
		 * Configures properties
		 * set via the <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html>component-pool</a>
		 * 
		 * This method is important as it applies all the configuration needed for 
		 * the component to work as expected.
		 * 
		 * @param  {Object} args An object with all the properties to write into the component
		 */
		configure: function(args) {
			if (!args) return;

			for (var ha in args) {
				this[ha] = args[ha];
			}

			this.args = args;
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>onAdded</strong></p>
		 *
		 * This is called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when it
		 * adds this component to it's list.
		 * 
		 * @param  {Object} parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) using this component
		 */
		onAdded: function(parent) {
			this.parent = parent;
			this.execute(this.ADDED, this);
			this.added(parent);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>onRemoved</strong></p>
		 *
		 * This is called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when it
		 * removes this component to it's list.
		 */
		onRemoved: function() {
			this.removed(parent);
			this.execute(this.REMOVED, this);
			this.parent = null;
		},
		/**
		 * --------------------------------
		 */
		
		/**
		 * <p style='color:#AD071D'><strong>onRecycled</strong></p>
		 *
		 * This is called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when it
		 * is destroying itself.
		 */
		onRecycled: function() {
			this.recycle();
			this.execute(this.RECYCLE, this);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>added</strong></p>
		 *
		 * Much like **onAdded**, but this method is only meant to be overriden
		 * with out having to remember calling **_super**
		 * 
		 * @param  {Object} parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) using this component
		 */
		added: function(parent) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>removed</strong></p>
		 *
		 * Much like **onRemoved**, but this method is only meant to be overriden
		 * with out having to remember calling **_super**
		 * 
		 * @param  {Object} parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) using this component
		 */
		removed: function(parent) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>start</strong></p>
		 *
		 * Called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) when
		 * it is started
		 *
		 * @param  {Object} parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) using this component 
		 */
		start: function(parent) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>update</strong></p>
		 *
		 * Called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) 
		 * after updating itself.
		 * 
		 * @param  {Number} delta Time elapsed since last update cycle
		 */
		update: function(delta) {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>recycle</strong></p>
		 *
		 * Called by the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) 
		 * when it is sent back to it's pool for reuse.
		 * 
		 */
		recycle: function() {},
		/**
		 * --------------------------------
		 */
		
		/**
		 * <p style='color:#AD071D'><strong>debug_draw</strong></p>
		 *
		 * This method is only executed if the **debug** property of the parent [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
		 * is set to true. It is better to leave the drawing to the [renderer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/rendering/renderer.html) components.
		 * 
		 * @param  {Context 2D} context     [Canvas 2D context](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)
		 */
		debug_draw: function(context) {},
		/**
		 * --------------------------------
		 */
	});

	// ### Getters for all the types of events a Component can hook into
	Object.defineProperty(Component.prototype, "ADD", { get: function() { return 'added'; } });
	Object.defineProperty(Component.prototype, "REMOVE", { get: function() { return 'removed'; } });
	Object.defineProperty(Component.prototype, "RECYCLE", { get: function() { return 'recycle'; } });
	/**
	 * --------------------------------
	 */

	return Component;
});