/**
 * # text-renderer.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: [component](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/component.html)
 *
 * Depends of: [text-cache](http://diegomarquez.github.io/game-builder/game-builder-docs/src/cache/text-cache.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 *
 * This module takes care of the rendering of text. If the text you want to draw is not going to change too much, it is best to cache it.
 * If it is going to change, it is better not to cache it. Finally, if it is going to change alot, it might be better to display the text
 * through HTML, because this whole text rendering thing, is not the fastest thing in town.
 *
 * ``` javascript
 * gb.coPool.createConfiguration("Text", 'Text_Renderer')
 	.args({ 
 		//This name is used to identify the cached text
 		//This is required
		name: 'some/path/to/image.jpg',

		//Font to use. 
		//Defaults to 'Arial'
		font: 'Arial',
		//Align of the text
		//Defaults to 'start'
		align: 'start',
		//Line width of the text
		//Defaults to 1
		lineWidth: 1,
		//Fill color of the text
		//Deafults to 'black'
		fillColor: 'black',
		//Stroke color of the text
		//Defaults to 'white'
		strokeColor: 'white',
		//Background color of the text
		//Defaults to transparent
		backgroundColor: 'rgba(100%, 100%, 100%, 0)',

 		//Use this if you want the registration point of the image to be the center
 		//This is optional
		offset:'center',

		//If offset is not provided this two are used
		//These are optional and default to 0
		offsetX:0,
		offsetY:0, 
		
		//Use these to override the dimentions of the cached text.
		//These are optional
		width: 20, 
		height: 20
 *	});
 * ```
 * <strong>Note: The snippet uses the reference to the <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html>component-pool</a>
 * found in the <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/gb.html>gb</a> module. 
 * The way you get a hold to a reference to the <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html>component-pool</a>
 * may vary.</strong>
 */

/**
 * Draw Text
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["component", 'text-cache'], function(Component, TextCache) {

	var image = null;

	var TextRenderer = Component.extend({
		/**
		 * <p style='color:#AD071D'><strong>init</strong></p>
		 */
		init: function() {
			this._super()

			this.offsetX = 0;
			this.offsetY = 0;
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>start</strong></p>
		 *
		 * This is called by the [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) using this renderer.
		 * It sends the text configured to the [text-cache](http://diegomarquez.github.io/game-builder/game-builder-docs/src/cache/text-cache.html) module.
		 */
		start: function() {	
			this.align      = this.align           || "start";
			this.lineWidth  = this.lineWidth       || 1;
			this.fill       = this.fillColor       || "#000000";
			this.stroke     = this.strokeColor     || "#FFFFFF";	
			this.size       = this.size            || 10;
			this.fontFamily = this.font            || 'Arial';
			this.background = this.backgroundColor || 'rgba(100%, 100%, 100%, 0)';

			TextCache.cache(this.name, this);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>draw</strong></p>
		 *
		 * Draws the image into the canvas, applying configured properties,
		 * like **width**, **height** and **offsets**
		 * 
		 * @param  {Context 2D} context     [Canvas 2D context](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)
		 */
		draw: function(context) {
			var w, h;

			image = TextCache.get(this.name);

			if (this.width && this.height) {
				w = this.width;
				h = this.height;
			} else {
				w = image.width;
				h = image.height;
			}

			if (this.offset == 'center'){
				context.drawImage(image, -w/2, -h/2, w, h);	
			} else{
				context.drawImage(image, this.offsetX, this.offsetY, w, h);		
			}
		}
		/**
		 * --------------------------------
		 */
	});

	// ### Setters that will trigger a re-cache of the text.

	Object.defineProperty(TextRenderer.prototype, "Align", { 
		set: function(value) { 
			this.align = value;
			TextCache.cache(this.name, this);
		} 
	});
	
	Object.defineProperty(TextRenderer.prototype, "LineWidth", { 
		set: function(value) { 
			this.lineWidth = value;
			TextCache.cache(this.name, this);
		}
	});
	
	Object.defineProperty(TextRenderer.prototype, "FillColor", { 
		set: function(value) { 
			this.fillColor = value;
			TextCache.cache(this.name, this);
		}
	});

	Object.defineProperty(TextRenderer.prototype, "StrokeColor", { 
		set: function(value) { 
			this.strokeColor = value;
			TextCache.cache(this.name, this);
		}
	});
	
	Object.defineProperty(TextRenderer.prototype, "Font", { 
		set: function(value) { 
			this.fontFamily = value;
			TextCache.cache(this.name, this);
		}
	});
	
	Object.defineProperty(TextRenderer.prototype, "Size", { 
		set: function(value) { 
			this.size = value;
			TextCache.cache(this.name, this);
		}
	});

	Object.defineProperty(TextRenderer.prototype, "Text", { 
		set: function(value) { 
			this.text = value;
			TextCache.cache(this.name, this);
		}
	});

	Object.defineProperty(TextRenderer.prototype, "Background", { 
		set: function(value) { 
			this.background = value;
			TextCache.cache(this.name, this);
		}
	});

	return TextRenderer;
});