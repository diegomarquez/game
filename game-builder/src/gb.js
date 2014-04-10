/**
 * # gb.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 *
 * Inherits from:
 *
 * Depends of: 
 * [game](http://diegomarquez.github.io/game-builder/game-builder-docs/src/game_canvas/game.html) 
 * [root](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/root.html) 
 * [layers](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/layers.html) 
 * [assembler](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/assembler.html) 
 * [reclaimer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/reclaimer.html) 
 * [game-object-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/game-object-pool.html) 
 * [component-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html)
 * [json-cache](http://diegomarquez.github.io/game-builder/game-builder-docs/src/cache/json-cache.html) 	
 *
 * A [requireJS](http://requirejs.org/) module.
 * 
 * This module acts as a hub for the main modules of [Game-Builder](http://diegomarquez.github.io/game-builder). So instead of loading them individualy, 
 * you just load this one and use the references that it provides.
 */

/**
 * A bunch of shortcuts
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(['game', 'root', 'layers', 'assembler', 'reclaimer', 'game-object-pool', 'component-pool', 'json-cache'], 
	function(game, root, layers, assembler, reclaimer, gameObjectPool, componentPool, jsonCache) {
		return {
			game: game,
			root: root,
			layers:layers,

			assembler: assembler,
			reclaimer: reclaimer,

			goPool:gameObjectPool,
			coPool:componentPool,
			jsonCache: jsonCache,

			/**
			 * A reference to the main canvas object in index.html. 
			 */
			canvas: document.getElementById('game'),
			/**
			 * --------------------------------
			 */

			/**
			 * <p style='color:#AD071D'><strong>addToLayer</strong></p>
			 * 
			 * Wraps all the steps needed to add a <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html>game-object</a>
			 * into a <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/layer.html>layer</a>. 
			 * 
			 * @param {String} layerName Id of the layer to add the [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) to. View [layers](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/layers.html), for more details.
			 * @param {String} goId      Id of [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) to add. View [game-object-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/game-object-pool.html), for more details.
			 *
			 * @return {Object} The [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) that was just assembled.
			 */
			addToLayer: function(layerName, goId) {
				var go = this.layers.get(layerName).add(this.assembler.get(goId));
				go.start();	
				return go;
			},
			/**
			 * --------------------------------
			 */
			
			/**
			 * <p style='color:#AD071D'><strong>addTextToLayer</strong></p>
			 * 
			 * This method is basically the same as **addToLayer** but it is used with [game-objects](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) that have a 
			 * [text-renderer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/rendering/text-renderer.html) attached to them. 
			 * 
			 * @param {String} layerName Id of the layer to add the [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) to. View [layers](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/layers.html), for more details.
			 * @param {String} goId      Id of [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) to add. View [game-object-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/game-object-pool.html), for more details.
			 * @param {String} text      String to initialize the [text-renderer](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/rendering/text-renderer.html) with.
			 *
			 * @return {Object} The [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) that was just assembled.
			 */
			addTextToLayer: function(layerName, goId, text) {
				var go = this.layers.get(layerName).add(this.assembler.get(goId));
				go.renderer.text = text;
				go.start();	
				return go;
			},
			/**
			 * --------------------------------
			 */
			
			/**
			 * <p style='color:#AD071D'><strong>assetMap</strong></p>
			 *
			 * @return {Object} Cached object in the 'asset-map' key of the [json-cache](http://diegomarquez.github.io/game-builder/game-builder-docs/src/cache/json-cache.html) module
			 */
			assetMap: function() {
				return this.jsonCache.get('asset-map')
			}
			/**
			 * --------------------------------
			 */
		}
	}
);
