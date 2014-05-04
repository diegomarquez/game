/**
 * # sound-control.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from: [extension](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/extensions/extension.html)
 *
 * Depends of: 
 * [sound-player](http://diegomarquez.github.io/game-builder/game-builder-docs/src/sound-player.html)
 * [gb](http://diegomarquez.github.io/game-builder/game-builder-docs/src/gb.html)
 * [extension](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/extensions/extension.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This extension takes care of pausing and resuming sound when needed.
 */

/**
 * Pause and Resume all sound channels
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["sound-player", "gb", "extension"], function(SoundPlayer, Gb, Extension) {
	var game = Gb.game;

	var TimersControl = Extension.extend({
		type: function() {
			// Notice the use of the constant CREATE defined in [game](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/game.html)
			// to define this extension should be executed on creation.
			return Gb.game.CREATE;
		},

		execute: function() {
			game.on(game.BLUR, this, function() {		
				// Add a _'alreadyPaused'_ property with a value of true to all sound channels
				// which are already paused
				SoundPlayer.setPropertyToAll('alreadyPaused', true).which(function(channel) {
					return channel.Paused();
				});

				// Pause all the sound channels
				SoundPlayer.pauseAll().now();
			});

			game.on(game.FOCUS, this, function() {
				// Resume all the sound channels which don't have an _'alreadyPaused'_ property
				SoundPlayer.resumeAll().which(function(channel){
					return !channel['alreadyPaused'];			
				});

				// Set the _'alreadyPaused'_ property to null on all sound channels
				SoundPlayer.setPropertyToAll('alreadyPaused', null).now();
			});
		}
	});

	return TimersControl;
});