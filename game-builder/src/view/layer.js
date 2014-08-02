/**
 * # layer.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: 
 * [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html)
 *
 * Depends of:
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 *
 * This is the type of objects that [videport](@@videport@@) uses to determine the order in which [game-objects](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html)
 * should be drawn. Each [viewport](http://diegomarquez.github.io/game-builder/game-builder-docs/src/view/viewport.html) has an array of this type of objects.
 */

/**
 * Visual organization
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["delegate"], function(Delegate){
	var Layer = Delegate.extend({
		
		/**
		 * <p style='color:#AD071D'><strong>init</strong></p>
		 *
		 * Constructor
		 *
		 * @param {String} name The name of the layer
		 * @param {Viewport} viewport The [viewport](http://diegomarquez.github.io/game-builder/game-builder-docs/src/view/viewport.html) the layer belongs to
		 */
		init: function(name, viewport) {
			this.name = name;
			this.gameObjects = [];
			this.visible = true;
			this.viewport = viewport;
		},
		/**
		 * --------------------------------
		 */


		/**
		 * <p style='color:#AD071D'><strong>add</strong></p>
		 *
		 * Add a [game-obejct](@@game-obejct@@) to layer for rendering
		 * 
		 * @param {Object} go The [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) to add
		 */
		add: function(go) { 
			this.gameObjects.push(go); 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>remove</strong></p>
		 *
		 * Remove a [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) from the layer
		 * 
		 * @param {Object} go The [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) to remove
		 */
		remove: function(go) { 
			this.gameObjects.splice(this.gameObjects.indexOf(go), 1); 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>removeAll</strong></p>
		 *
		 * Removes all the [game-objects](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) from the layer
		 */
		removeAll: function() { 
			this.gameObjects = []; 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>draw</strong></p>
		 *
		 * @param  {Context 2D} context [Canvas 2D context](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)
		 */
		draw: function(context) {
			if (!this.visible) return;

			var go;

			for (var i = 0; i < this.gameObjects.length; i++) {
				go = this.gameObjects[i];

				if (this.viewport.isGameObjectInside(go, context)) {
					go.draw(context, this.viewport);
				}
			}
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>show</strong></p>
		 *
		 * Make the layer visible
		 */
		show: function() { 
			this.visible = true; 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>hide</strong></p>
		 *
		 * Make the layer invisible
		 */
		hide: function() { 
			this.visible = false; 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>isVisible</strong></p>
		 *
		 * Wether the layer is visible or not
		 *
		 * @return {Boolean}
		 */
		isVisible: function() { 
			return this.visible; 
		}
		/**
		 * --------------------------------
		 */
	});

	return Layer;
});