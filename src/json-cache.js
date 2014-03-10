/**
 * # json-cache.js
 * ### By [Diego Enrique Marquez](http://treintipollo.com/)
 * ### [Find me on Github](https://github.com/diegomarquez)
 * 
 * Inherits from: 
 * 
 * Depends of:
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 *
 * This module takes care of parsing json strings and caching the result so they are easily injectable into other modules.
 */

/**
 * --------------------------------
 */
define(function() {
	var cache = {};

	var JSONCache = function() {};

	/**
	 * <p style='color:#AD071D'><strong>parse</strong></p>
	 *
	 * @param  {String} id     Id to retrived the cached object later
	 * @param  {String} string A JSON string
	 */
	JSONCache.prototype.parse = function(id, string) {
		cache[id] = JSON.parse(string);
	};

	/**
	 * <p style='color:#AD071D'><strong>get</strong></p>
	 *
	 * @param  {String} id Id of the object to retrieve
	 *
	 * @return {Object}    Cached JSON object
	 */
	JSONCache.prototype.get = function(id) {
		return cache[id];
	};

	return new JSONCache();
});