/**
 * # world.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from:
 * [class](@@class@@)
 *
 * Depends of: 
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This module serves as an abstraction for the rectangle that defines the 2D world of the game. Useful to
 * have those values available to everyone, instead of hardcoded some where.
 */

/**
 * Game World
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["class"], function(Class) {
	var World = Class.extend({
		/**
		 * <p style='color:#AD071D'><strong>init</strong></p>
		 *
		 * Constructor
		 */
		init: function() {},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>create</strong></p>
		 *
		 * @param  {Number} w Width of the world
		 * @param  {Number} h Height of the world
		 */
		create: function(w, h, s) {
			var width = w;
			var height = h;
			var step = s;

			this.getWidth = function() { 
				return width; 
			};
			
			this.getHeight = function() { 
				return height; 
			};

			this.getStep = function() { 
				return step; 
			};

			this.setWidth = function(v) { 
				width = v; 
			};
			
			this.setHeight = function(v) { 
				height = v; 
			};

			this.setStep = function(v) { 
				step = v; 
			};
		},

		/**
		 * <p style='color:#AD071D'><strong>scaleViewportToFit</strong></p>
		 *
		 * Make the specified [viewport](@@viewport@@) scale so it can show all the world
		 * 
		 * @param  {Object} viewport The [viewport](@@viewport@@) to scale
		 */
		scaleViewportToFit: function(viewport) {
			viewport.ScaleX = 1;
			viewport.ScaleY = 1;

			viewport.ScaleX /= this.getWidth() / viewport.Width;
			viewport.ScaleY /= this.getHeight() / viewport.Height;

			viewport.WorldFit = true;
		},

		/**
		 * <p style='color:#AD071D'><strong>resetViewportScale</strong></p>
		 *
		 * Reset the scale of the specified [viewport](@@viewport@@)
		 * 
		 * @param  {Object} viewport The [viewport](@@viewport@@) to scale
		 */
		resetViewportScale: function(viewport) {
			viewport.ScaleX = 1;
			viewport.ScaleY = 1;

			viewport.WorldFit = false;
		},

		/**
		 * <p style='color:#AD071D'><strong>scaleViewportProportionaly</strong></p>
		 *
		 * Make the specified [viewport](@@viewport@@) scale by the specified factor
		 * 
		 * @param  {Object} viewport The [viewport](@@viewport@@) to scale
		 * @param  {Number} factor   Amount to scale by
		 */
		scaleViewportProportionaly: function(viewport, factor) {
			viewport.ScaleX = 1;
			viewport.ScaleY = 1;

			viewport.ScaleX *= factor;
			viewport.ScaleY *= factor;
		}

	});

	return new World();
});