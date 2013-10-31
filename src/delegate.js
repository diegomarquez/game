define(["require", "class"], function(require) {

	Utils = require("util");

	var removeAllNulls = function(list) {
		for (var i = list.length - 1; i >= 0; i--) {
			var callbackObject = list[i];

			if (!callbackObject) {
				list.splice(i, 1);
			}
		}
	}

	var Delegate = Class.extend({
		init: function(bubbling) {
			this.callbackList = {};
			this.list = null;

			this.bubbling = bubbling || false;
		},

		on: function(name, scope, callback, removeOnExecute, inmediate, keepOnCleanUp) {
			if (!this.callbackList[name]) {
				this.callbackList[name] = [];
			}

			if (inmediate) {
				callback();
			}

			this.callbackList[name].push({
				scope: scope,
				callback: callback,
				removeOnExecute: removeOnExecute,
				keep: keepOnCleanUp
			});
		},

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

		removeAll: function(name) {
			var list = this.callbackList[name];

			if (list) {
				list.splice(0, list.lenght);
				list.lenght = 0;
				list = null;
			}
		},

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

		hardCleanUp: function() {
			for (var k in this.callbackList) {
				this.removeAll(k);
			}
		},

		destroy: function() {
			Utils.destroyObject(this);
		},

		execute: function(name, args) {
			this.list = this.callbackList[name];

			if (!this.list) return;

			for (var i = 0; i < this.list.length; i++) {
				var callbackObject = this.list[i];

				if (!callbackObject) continue;

				callbackObject.callback.call(callbackObject.scope, args);

				if(this.bubbling && callbackObject.scope.parent) {
					callbackObject.scope.parent.execute(name, args)
				}

				if (callbackObject.removeOnExecute) {
					this.list[i] = null;
				}
			}

			removeAllNulls(this.list);
		}
	});

	return Delegate;
});