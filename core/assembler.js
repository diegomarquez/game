define(['game_object_pool', 'component_pool'], function(GameObjectPool, ComponentPool) {
	var Assembler = function() {};

	//This method only return an instance. It is up to the user to call the start method with arguments.
	Assembler.prototype.assemble = function(name, args) {
		var configuration = GameObjectPool.getConfiguration(name);

		//Get one object from the pool
		var pooledObject = GameObjectPool.getPooledObject(configuration.type);

		//Reset some internal properties of the game_object before actually using it.
		pooledObject.reset();

		//This sets unchanging arguments (hard), specified on the configuration object.
		//If available the specific configuration object overrides the generic one.
		if (args) {
			pooledObject.configure(args);
		} else {
			pooledObject.configure(configuration.hardArguments);
		}

		//Set it's name
		pooledObject.typeId = name;

		//Adding all the components configured for this object type	
		for (var i = 0; i < configuration.components.length; i++) {
			var componentConfiguration = ComponentPool.getConfiguration(configuration.components[i].componentId);
			var component = ComponentPool.getPooledObject(componentConfiguration.componentId);

			//Configures the component as stated by the configuration object.
			//If available the specific configuration object overrides the generic one.
			if (configuration.components[i].componentArgs) {
				component.configure(configuration.components[i].componentArgs);
			} else {
				component.configure(componentConfiguration.args);
			}

			component.on('recycle', this, function(c) {
				ComponentPool.returnToPool(c);
			}, true);

			//This component will return to it's respective pool when destroyed
			pooledObject.addComponent(component);
		}

		//Adding nested childs configured for this object
		for (var i = 0; i < configuration.childs.length; i++) {
			var childId = configuration.childs[i].childId;

			if (!pooledObject.add) {
				throw new Error('Game Object with type: ' + configuration.type + ' is not a container, can not add childs to it');
			}

			pooledObject.add(this.assemble(childId, configuration.childs[i].args));
		}

		//Adding renderer to the game_object
		//pooledObject.renderer = this.renderersPool[configuration.renderer.id];
		//pooledObject.renderer.start(configuration.renderer.args);

		pooledObject.on('recycle', this, function(go) {
			GameObjectPool.returnToPool(go);
		}, true);

		return pooledObject;
	};

	return new Assembler();
});