/**
 * # collision-component.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from:
 *
 * Depends of:
 * [component](http://diegomarquez.github.io/game-builder/game-builder-docs/src/components/component.html)
 * [collision-resolver](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/collision-resolver.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * All colliders extend the object defined in this module. It's main responsibility
 * is checking if it is colliding against any of the objects the [collision-resolver](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/collision-resolver.html)
 * is saying it should collide against.
 *
 * When setting up the [component-pool](http://diegomarquez.github.io/game-builder/game-builder-docs/src/pools/component-pool.html) with collider components, be sure
 * to checkout the documentation for [circle-collider](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/circle-collider.html), [polygon-collider](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/polygon-collider.html)
 * and [fixed-polygon-collider](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/fixed-polygon-collider.html) to see what kind of object they expect as an argument
 * to be properly configured.
 */

/**
 * Collisions
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(['component', 'collision-resolver'], function(Component, CollisionResolver) {

	var collisionList = null;
	var collisionOpponent = null;

	var CollisionComponent = Component.extend({
		/**
		 * <p style='color:#AD071D'><strong>start</strong></p>
		 *
		 * Setup the component.
		 * 
		 * The main thing here is that the component 
		 * adds itself to the [collision-resolver](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/collision-resolver.html)
		 *	
		 * @throws {Error} If the parent of the component does not define an **onCollide** method 
		 */
		start: function() {
			this.debugColor = "#FFFFFF";

			this.checkingCollisions = true;

			CollisionResolver.addToCollisionList(this);

			if(!this.parent.onCollide)
				throw new Error("GameObject with typeId: " + this.parent.typeId + ", needs to define an onCollide method, yo.");
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>update</strong></p>
		 *
		 * Here is where the magic happens.
		 * 
		 * The [collision-resolver](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/collision-resolver.html) will test this collider against
		 * all other registered colliders that are supposed to collide against it. If there is a collision
		 * A bunch of callbacks will be executed notifying the objects involved.
		 */
		update: function() {
			collisionList = CollisionResolver.collisionLists[this.id];

			if (collisionList != null) {
				for (k = 0; k < collisionList.length; k++) {
					collisionOpponent = collisionList[k];

					if (!collisionOpponent.checkingCollisions) break;

					if (CollisionResolver.areColliding(this, collisionOpponent)) {
						if (!this.checkingCollisions) break;
		
						this.onCollide(collisionOpponent)
						this.parent.onCollide(collisionOpponent.parent);
						this.parent.execute('collide', collisionOpponent.parent);

						if (!this.checkingCollisions) break;

						collisionOpponent.onCollide(this);
						collisionOpponent.parent.onCollide(this.parent);
						collisionOpponent.parent.execute('collide', this.parent);
					}
				}
			}
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>onCollide</strong></p>
		 *
		 * This will be executed if there is a collision.
		 * 
		 * @param  {Object} other The other [game-object](http://diegomarquez.github.io/game-builder/game-builder-docs/src/hierarchy/game-object.html) involved in the collision.
		 */
		onCollide: function(other) {
			this.debugColor = "#FF0000";
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>debug_draw</strong></p>
		 *
		 * This is redifined by objects extending this one.
		 */
		debug_draw: function() {
			this.debugColor = "#FFFFFF";
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>destroy</strong></p>
		 *
		 * Destroys the component.
		 * 
		 * Asides from resetting some properties the component removes itself
		 * from the [collision-resolver](http://diegomarquez.github.io/game-builder/game-builder-docs/src/collision/collision-resolver.html)
		 */
		destroy: function() {
			this._super();

			this.checkingCollisions = false;

			CollisionResolver.removeFromCollisionList(this);
		}
		/**
		 * --------------------------------
		 */
	});

	return CollisionComponent;
});