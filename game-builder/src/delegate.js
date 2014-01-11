/**
 * # delegate.js
 * ### By [Diego Enrique Marquez](http://treintipollo.com/)
 * ### [Find me on Github](https://github.com/diegomarquez)
 * 
 * Inherits from: [class](@@class)
 * 
 * Depends of: [util](@@util)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 *
 * If you are a software engineer, the name of this file will sound outrageous to you, because
 * it's not really a delegate. It's more of a container for delegates. If you keep stretching, it 
 * actually is more like an event emitter. But there is no notion of events 
 * in [Game-Builder](http://diegomarquez.github.io/game-builder), so I have no idea what to call it.
 *
 * It works fine and is very usefull. The basic workflow is the following:
 * 
 * Add functions using <strong>on</strong>, always providing an id and for the function.
 * At some point in the future call the method <strong>execute</strong>, passing an id. 
 * All the functions registered under the id provided will be executed in the order they were added.
 */

/**
 * Totally usefull
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(["util", "class"], function(util) {
	var Delegate = Class.extend({
		init: function() {
			this.callbackList = {};
			this.list = null;
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>on</strong> Use it to add functions.</p>
		 * @param  {String} name Id that the function will be associated with
		 * @param  {Object} scope Scope of the function, most of the time you will be passing 'this'
		 * @param  {Function} callback Function you want to execute
		 * @param  {Boolean} [removeOnExecute=false] The function will be removed from the corresponding list, after executing it once
		 * @param  {Boolean} [inmediate=false] Execute function inmediatelly after adding it
		 * @param  {Boolean} [keepOnCleanUp=false] Save the function when executing the **softCleanUp**
		 * @param  {Boolean} [single=false] Do not add function if there is already one with the same id
		 */
		on: function(name, scope, callback, removeOnExecute, inmediate, keepOnCleanUp, single) {
			if (!this.callbackList[name]) {
				this.callbackList[name] = [];
			}

			if (inmediate) {
				callback();
			}

			if (single) {
				if (this.callbackList[name].length == 1) {
					return;
				}				
			}

			this.callbackList[name].push({
				scope: scope,
				callback: callback,
				removeOnExecute: removeOnExecute,
				keep: keepOnCleanUp
			});
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>remove</strong> Removes the specified function from the array it is in.</p>
		 * @param  {String}   name Id the funtion you want to remove is associated with
		 * @param  {Object}   scope Scope used when adding the function to the delegate
		 * @param  {Function} callback Function you want to remove from the delegate
		 */
		remove: function(name, scope, callback) {
			this.list = this.callbackList[name];

			if (!this.list) return;

			for (var i = this.list.length - 1; i >= 0; i--) {
				var callbackObject = this.list[i];

				if (scope === callbackObject.scope && callback === callbackObject.callback) {
					this.list.splice(i, 1);
				}
			}
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>removeAll</strong> Removes all the funtions associated with an id.</p>
		 * @param  {String} name All funtions matching this Id will be removed from the delegate
		 */
		removeAll: function(name) {
			var list = this.callbackList[name];

			if (list) {
				list.splice(0, list.lenght);
				list.lenght = 0;
				list = null;
			}
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>softCleanUp</strong> Removes every function in the delegate, except for the ones that were configured to be kept in <strong>on</strong>.</p>
		 */
		softCleanUp: function() {
			for (var k in this.callbackList) {
				this.list = this.callbackList[k];

				if (!this.list) return;

				for (var i = this.list.length - 1; i >= 0; i--) {
					var callbackObject = this.list[i];

					if (!callbackObject.keep) {
						this.list.splice(i, 1);
					}
				}
			}
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>hardCleanUp</strong> Removes every registered function.</p>
		 */
		hardCleanUp: function() {
			for (var k in this.callbackList) {
				this.removeAll(k);
			}
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>destroy</strong> Gets ready for garbage collection.</p>
		 */
		destroy: function() {
			util.destroyObject(this);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>execute</strong> Use this to call all the methods registered using <strong>on</strong>.</p>
		 * @param  {String} name All the funtions registered with the id provided will be executed
		 * @param  {Object} args This Object will be passed as argument to all the funtions executed
		 */
		execute: function(name, args) {
			this.list = this.callbackList[name];

			if (!this.list) return;

			for (var i = 0; i < this.list.length; i++) {
				var callbackObject = this.list[i];

				if (!callbackObject) continue;

				callbackObject.callback.call(callbackObject.scope, args);

				if (callbackObject.removeOnExecute) {
					this.list[i] = null;
				}
			}

			removeAllNulls(this.list);
		}
		/**
		 * --------------------------------
		 */
	});

	var removeAllNulls = function(list) {
		for (var i = list.length - 1; i >= 0; i--) {
			var callbackObject = list[i];

			if (!callbackObject) {
				list.splice(i, 1);
			}
		}
	}

	return Delegate;
});