/**
 * # renderer.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: 
 * [component](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/component.html)
 *
 * Depends of:
 * [error-printer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/debug/error-printer.html)
 * [draw](http://diegomarquez.github.io/game-builder/game-builder-docs/src/draw.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This module only exists to make the interface for a renderer explicit.
 */

/**
 * An Interface for renderers
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["component", "error-printer"], function(Component, ErrorPrinter) {
	var r = {}

	var Renderer = Component.extend({
		/**
		 * <p style='color:#AD071D'><strong>init</strong></p>
		 *
		 * Constructor
		 */
		init: function() {
			this._super();

			this.offsetX = 0;
			this.offsetY = 0;

			this.scaleX = 1;
			this.scaleY = 1;

			this.debugColor = "#FFFF00";
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>draw</strong></p>
		 * 
		 * This is an abstract method and must be overriden.
		 * 
		 * @throws {Error} Always
		 */
		draw: function(context) {
			ErrorPrinter.mustOverrideError('Renderer');
		},
		/**
		 * --------------------------------
		 */
		
		 /**
		 * <p style='color:#AD071D'><strong>rendererWidth</strong></p>
		 *
		 * @return {Number} The width of the renderer
		 */
		rendererWidth: function() { 
			if (!this.width) {
				ErrorPrinter.missingArgumentError('Renderer', 'width');
			}

			return this.width * this.scaleX; 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>rendererHeight</strong></p>
		 *
		 * @return {Number} The height of the renderer
		 */
		rendererHeight: function() { 
			if (!this.height) {
				ErrorPrinter.missingArgumentError('Renderer', 'height');
			}

			return this.height * this.scaleY; 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>rendererOffsetX</strong></p>
		 *
		 * @return {Number} The offset in the X axis of the renderer
		 */
		rendererOffsetX: function() { 
			return this.offsetX * this.scaleX; 
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>rendererOffsetY</strong></p>
		 *
		 * @return {Number} The offset in the Y axis of the renderer
		 */
		rendererOffsetY: function() { 
			return this.offsetY * this.scaleY; 
		},
		/**
		 * --------------------------------
		 */
		
		/**
		 * <p style='color:#AD071D'><strong>debug_draw</strong></p>
		 *
		 * This method is only executed if the **debug** property of the parent [gb](http://diegomarquez.github.io/game-builder/game-builder-docs/src/gb.html)
		 * is set to true. It is better to leave the drawing to the [renderer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/rendering/renderer.html) components.
		 * 
		 * @param  {Context 2D} context     [Canvas 2D context](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)
		 * @param  {Object} viewport A reference to the current [viewport](http://diegomarquez.github.io/game-builder/game-builder-docs/src/view/viewport.html)
		 * @param  {Object} draw     A reference to the [draw](http://diegomarquez.github.io/game-builder/game-builder-docs/src/draw.html) module
		 */
		debug_draw: function(context, viewport, draw) {
			// Top Left
			drawVertex.call(this, context, viewport, draw, this.rendererOffsetX(), this.rendererOffsetY());
			// Top Right
			drawVertex.call(this, context, viewport, draw, this.rendererOffsetX() + this.rendererWidth(), this.rendererOffsetY());
			// Bottom Left
			drawVertex.call(this, context, viewport, draw, this.rendererOffsetX(), this.rendererOffsetY() + this.rendererHeight());
			// Bottom Right
			drawVertex.call(this, context, viewport, draw, this.rendererOffsetX() + this.rendererWidth(), this.rendererOffsetY() + this.rendererHeight());
		}
		/**
		 * --------------------------------
		 */
	});

	var drawVertex = function(context, viewport, draw, offsetX, offsetY) {
		r = this.parent.matrix.transformPoint(offsetX, offsetY, r);		
		draw.circle(context, r.x, r.y, 1, null, this.debugColor, 2);
	}

	return Renderer;
});