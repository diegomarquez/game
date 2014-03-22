/**
 * # resume.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: [extension](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/extensions/extension.html)
 *
 * Depends of: 
 * [layers](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/layers.html)
 * [gb](http://diegomarquez.github.io/game-builder/game-builder-docs/src/gb.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This module defines an extension that uses [layers](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/layers.html) to resume all update activity
 * when the application gains focus.
 *
 * The extension also adds a **resume** method to [game](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/game.html), to be able to resume the application
 * manually after pausing.
 *
 * ### This Extension adds an event [game](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/game.html) can hook into:
 *
 * ### **resume** 
 * When the application is resumed manually
 * 
 * ``` javascript  
 * game.on(game.RESUME, function() {});
 * ```
 */

/**
 * Resume activity
 * --------------------------------
 */

/**
 * --------------------------------
 */

define(["layers", "gb", "extension"], function(Layers, Gb, Extension) {
	var game = Gb.game;

	var Resume = Extension.extend({
		type: function() {
			// Notice the use of the constant FOCUS defined in [game](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/game.html)
			// to define this extension should be executed on creation.
			return Gb.game.FOCUS;
		},

		execute: function() {
			Layers.all('resume', 'update');

			for (var k in Layers.layers) { 
				if (Layers.layers[k].drawAlreadyStopped) {
					Layers.stop_draw(k);			
				} 
				if (Layers.layers[k].updateAlreadyStopped) {
					Layers.stop_update(k);
				}

				Layers.layers[k].drawAlreadyStopped = false;
				Layers.layers[k].updateAlreadyStopped = false;
			}
		}
	});

	Object.defineProperty(game.prototype, "RESUME", { get: function() { return 'resume'; } });

	game.resume = function() {
		if(game.focusAction()) {
			game.execute(game.RESUME);
			window.addEventListener("blur", game.blurAction);
			window.addEventListener("focus", game.focusAction);	
		}
	}

	return Resume;
});