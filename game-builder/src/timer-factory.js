/**
 * # timer-factory.js
 * ### By [Diego Enrique Marquez](http://www.treintipollo.com)
 * ### [Find me on Github](https://github.com/diegomarquez)
 *
 * Inherits from:
 *
 * Depends of: [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html)
 *
 * A [requireJS](http://requirejs.org/) module. For use with [Game-Builder](http://diegomarquez.github.io/game-builder)
 * 
 * This module's main concern is try and make [**setTimeout**](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout) a bit more usefull. 
 * 
 * For that purpose it has 2 main responsibilities:
 * 
 * ### **1. Provide a factory to create and manage manage Timers in a single place**
 *
 * The factory is what this module actually exposes. Asides from creating timers
 * it also keeps track of them so it is easy to manipulate them in bulk.
 * 
 * ### **2. Provide a Timer object**
 * 
 * The timer object uses [**setTimeout**](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout) under the hood and adds 
 * a few things to it. The main feature is that it handles recording the timeout id, so that stopping it
 * is more intuitive, with a **stop** method. Another cool feature is being able to pause the timer, 
 * something which [**setTimeout**](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout) simply does not do.
 *
 * ### The Timer object extends [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html) so it provides a few events to hook into:
 *
 * ### **repeate** 
 * Each time a timer is repeated. 
 * 
 * Registered callbacks get the amount of repeats left as argument. 
 * ``` javascript  
 * timer.on(timer.REPEATE, function(repeatsLeft) {});
 * ``` 
 *
 * ### **complete**
 * When a timer completes. 
 * 
 * ``` javascript  
 * timer.on(timer.COMPLETE, function() {});
 * ```
 *
 * ### **stop**
 * When a timer is stopped.
 * 
 * ``` javascript  
 * timer.on(timer.STOP, function() {});
 * ```
 * 
 * ### **reset**
 * When a timer is reset.
 * 
 * ``` javascript  
 * timer.on(timer.RESET, function() {});
 * ```
 * 
 * ### **pause**
 * When a timer is paused.
 * 
 * ``` javascript  
 * timer.on(timer.PAUSE, function() {});
 * ```
 * 
 * ### **resume**
 * When a timer is resumed.
 * 
 * ``` javascript  
 * timer.on(timer.RESUME, function() {});
 * ```
 * 
 * ### **remove**
 * When a timer is removed from the factory register.
 * 
 * ``` javascript  
 * timer.on('remove' function() {});
 * ``` 
 */

/**
 * Time, time, time, time, TIME!
 * --------------------------------
 */

/**
 * --------------------------------
 */
define(function(require) {
	/**
	 * ## **TimerFactory**
	 */
	var TimerFactory = function() {
		this.timeOuts = [];
	};

	/**
	 * <p style='color:#AD071D'><strong>get</strong></p>
	 *
	 * Creates a new instance of a Timer.
	 * 
	 * After creating it, it saves it into an array. It will also create a property in the **owner** 
	 * giving it the name **propertyName**. 
	 * 
	 * @param  {Object} owner        Object in which the method was called in. Common value is _'this'_
	 * @param  {String} name         An identifier for the Timer
	 * @param  {String} propertyName Name of the property the timer will be added in **owner**.
	 * @throws {Error} If the owner already has a property with the value of **propertyName**
	 * @throws {Error} If owner is not passed as argument
	 * @throws {Error} If name is not passed as argument
	 * @throws {Error} If propertyName is not passed as a       
	 */
	TimerFactory.prototype.get = function(owner, name, propertyName) {
		if(owner.hasOwnProperty(propertyName)) {
			throw new Error('This owner is already using this property, assigning it again with a timer might cause your program to go ape shit.')	
		}else{

			if (!owner) { throw new Error('Timer must have an owner, if unsure just send in "this"') }
			if (!name) { throw new Error('Timer must have an name to identify it later') }
			if (!propertyName) { throw new Error('Timer must have a propertyName to be refered with from its owners scope') }

			var timeout = new Timer(owner, name, propertyName);
			this.timeOuts.push(timeout);
			owner[propertyName] = timeout;	
		}
	};
	/**
	 * --------------------------------
	 */

	/*
	These methods are pretty obvious in what they do. They are meant to apply a state to all registered timers
	at the same time. Usefull to handle global state of an application.

	For instance, if the application looses focus, you probably want to pause all timers, regardless of what they are doing
	and to which part of the code base they belong to.
	
	After gaining focus, you can resume them all together. Pretty usefull.

	Although the names suggest obvious behaviour, the usage is not so obvious. Keep reading to find out
	how to use the control object these methods return.
	 */
	TimerFactory.prototype.startAll = function() { return getChangeObject.call(this, 'start'); }
	TimerFactory.prototype.resetAll = function() { return getChangeObject.call(this, 'reset'); }
	TimerFactory.prototype.stopAll = function() { return getChangeObject.call(this, 'stop'); }
	TimerFactory.prototype.pauseAll = function() { return getChangeObject.call(this, 'pause'); }
	TimerFactory.prototype.resumeAll = function() { return getChangeObject.call(this, 'resume'); }
	TimerFactory.prototype.removeAll = function() { return getChangeObject.call(this, 'remove'); }	
	/**
	 * --------------------------------
	 */
	
	/**
	 * <p style='color:#AD071D'><strong>setProperty</strong></p>
	 *
	 * This method is used to add or modify properties of all timers based
	 * on a condition. If the condition evaluates to _'true'_ the property will be
	 * set with the given value.
	 * 
	 * @param {Sring}    propertyName Name of the propety to set
	 * @param {Anything} value        Value to set
	 * @param {Function} condition    Condition that must be fullfilled before setting the property
	 */
	TimerFactory.prototype.setProperty = function(propertyName, value, condition) {
		this.timeOuts.forEach(function(timer, index, array) {
			if(condition(timer, index, array)) {
				timer[propertyName] = value;
			}
		});
	}

	// Some convenience methods to convert milliseconds to human friendly formats
	TimerFactory.prototype.toMins = function(ms) { return parseInt(ms/(1000*60)); }
	TimerFactory.prototype.toSecs = function(ms) { return parseInt((ms/1000));	}
	TimerFactory.prototype.toMillisFraction = function(ms) { return parseInt((ms%1000)/100); }
	
	TimerFactory.prototype.formatMinutes = function(ms) { 
		var mins = this.toMins(ms) % 60;
    	return (mins < 10) ? "0" + mins : mins;
	}

	TimerFactory.prototype.formatSeconds = function(ms) {
		var fms = this.toMillisFraction(ms);
		var secs = this.toSecs(ms) % 60;
    	return ((secs < 10) ? "0" + secs : secs) + '.' + fms;
	}

	TimerFactory.prototype.formatMinutesSeconds = function(ms) {
		return this.formatMinutes(ms) + ':' + this.formatSeconds(ms);
	}

	var timerFactory = new TimerFactory();

	var applyChangeToTimersIfTrue = function(state, condition) {
		var timer = null;

		for(var i=this.length-1; i>=0; i--) {
			timer = this[i];

			if(condition(timer, i, this)) {
				timer[state]();		
			}
		}
	}

	var applyChangeToSomeTimers = function(state, identifier, identifierValue) {
		var timer = null;

		for(var i=this.length-1; i>=0; i--) {
			timer = this[i];

			if (timer[identifier] === identifierValue) {
				timer[state]();
			}
		}
	}

	var applyChangeToAllTimers = function(state) {
		for(var i=this.length-1; i>=0; i--) {
			timer = this[i];
			timer[state]();
		}
	}

	/**
	 * <p style='color:#AD071D'><strong>getChangeObject</strong></p>
	 *
	 * Private method, but important enough to document.
	 * 
	 * This method returns on object with methods to filter which timers 
	 * should move to a new state.
	 * 
	 * @param  {String} state The state selected timers will go to. ej. _'start'_
	 * @returns {Object}       A control Object to manage all the registered Timers.
	 */
	var getChangeObject = function(state) {
		var self = this;

		return {
			/**
			 * <p style='color:#AD071D'><strong>withName</strong></p>
			 * All the timers with a **name** equaling (===) **value** qualify to change state
			 */
			withName: function(value) {
				applyChangeToSomeTimers.call(self.timeOuts, state, 'name', value);	
			},
			/**
			 * --------------------------------
			 */
			
			/**
			 * <p style='color:#AD071D'><strong>withOwner</strong></p>
			 * All the timers with a **owner** equaling (===) **value** qualify to change state
			 */
			withOwner: function(owner) {
				applyChangeToSomeTimers.call(self.timeOuts, state, 'owner', owner);	
			},
			/**
			 * --------------------------------
			 */

			/**
			 * <p style='color:#AD071D'><strong>which</strong></p>
			 *
			 * The **condition** function will be evaluates for all timers, timers
			 * that evaluate to true will qualify to change state.
			 * 
			 * The signature for the condition function is **function(timer, index, array)**
			 */
			which: function(condition) {
				applyChangeToTimersIfTrue.call(self.timeOuts, state, condition);	
			},
			/**
			 * --------------------------------
			 */
						
			/**
			 * <p style='color:#AD071D'><strong>now</strong></p>
			 * All timers qualify to change state
			 */
			now: function() {
				applyChangeToAllTimers.call(self.timeOuts, state);
			}
			/**
			 * --------------------------------
			 */
		}
	}

	/**
	 * ## **Timer** extends [delegate](http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html)
	 */
	var Timer = require('delegate').extend({
		init: function(owner, name, propertyName) {
			this._super();

			this.owner = owner;
			this.name = name;
			this.propertyName = propertyName;

			this._delay = 1000;
			this.initDelay = this._delay;

			this.repeateCount = 1;
			this.initRepeatCount = this.repeateCount;

			this.removeOnComplete = true;

			this.repeates = 0;
			this.id = -1;
			this.startTime = -1;
			this.pauseTime = -1;
			this.isRunning = false;
			this.isPaused = false;
		},

		/**
		 * <p style='color:#AD071D'><strong>on</strong></p>
		 *
		 * Wrapper to <a href=http://diegomarquez.github.io/game-builder/game-builder-docs/src/delegate.html>delegate</a> method of the same name
		 * 
		 * @param  {String} name Id that the function will be associated with
		 * @param  {Function} callback Function you want to execute
		 * @param  {Boolean} [removeOnExecute=false] The function will be removed from the corresponding list, after executing it once
		 * @param  {Boolean} [single=false] Do not add function if there is already one registered
		 */
		on: function(name, callback, removeOnComplete, single) {
			this._super(name, this.owner, callback, removeOnComplete, false, false, single);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>configure</strong></p>
		 *
		 * Configures the timer.
		 *		 
		 * ``` javascript  
		 * timer.configure({
			// The amount of milliseconds the timer will last
			// Defaults to 1000
			delay: 2000,
			// The amount of times to repeate the timer.
			// Defaults to 1
			repeateCount: 2,
			// If set to true the timer is removed from the factories array when it completes.
			// Defaults to true
			removeOnComplete: false
		 * });
		 * ```
		 *
		 * @param  {Object} options An object with all the options to configure a timer        
		 */
		configure: function(options) {
			if (!options.hasOwnProperty('delay')) { options['delay'] = this._delay;	}
			if (!options.hasOwnProperty('repeatCount')) { options['repeatCount'] = this.repeateCount;	}
			if (!options.hasOwnProperty('removeOnComplete')) { options['removeOnComplete'] = this.removeOnComplete;	}

			this.Delay(options['delay']);
			this.RepeateCount(options['repeatCount']);
			this.RemoveOnComplete(options['removeOnComplete']);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>start</strong></p> 
		 * 
		 * Starts the timer.
		 */
		start: function(resumeTime) {
			if (this.isRunning || this.isPaused) {
				return;
			}

			this.startTime = Date.now();

			this.isRunning = true;
			this.isPaused = false;

			var actualDelay = resumeTime ? resumeTime : this.initDelay;

			var to = this;

			this.id = setTimeout(function() {
				if (to.Running) {
					to.execute(to.REPEATE, to.repeates)
					to.repeates++;
				} else {
					return;
				}

				if (to.repeateCount < 0) {
					to.isRunning = false;
					to._delay = to.initDelay;
					to.start();
				} else {
					to.repeateCount--;

					if (to.repeateCount > 0) {
						to.isRunning = false;
						to._delay = to.initDelay;
						to.start();
					} else {
						to.stop();

						to.execute(to.COMPLETE);

						if (to.removeOnComplete) {
							to.remove();
						}
					}
				}
			}, actualDelay);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>stop</strong></p>
		 *
		 * Stops the timer. 
		 *
		 * Resets everything else. Starting the timer again will do so from the beginning.
		 */
		stop: function() {
			clearTimeout(this.id);

			this.isRunning = false;
			this.isPaused = false;
			this.repeateCount = this.initRepeatCount;
			this._delay = this.initDelay;
			this.repeates = 0;

			this.execute(this.STOP);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>reset</strong></p>
		 *
		 * Resets the timer.
		 * 
		 * Short cut for **stop** followed by **play**
		 */
		reset: function() {
			this.stop();
			this.start();

			this.execute(this.RESET);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>pause</strong></p>
		 *
		 * Pause the timer.
		 * 
		 * Pause the timer until the **resume** method is called.
		 */
		pause: function() {
			if (this.Stopped) return;
			if (this.Paused) return;
			
			clearTimeout(this.id);
			this.pauseTime = Date.now();
			this.isRunning = false;
			this.isPaused = true;

			this.execute(this.PAUSE);
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>resume</strong></p> 
		 *
		 * Resume if paused.
		 */
		resume: function() {
			if (this.Stopped) return;
			if (this.Running) return;

			this.isPaused = false;
			this._delay -= (this.pauseTime - this.startTime);
			this.start(this._delay);

			this.execute(this.RESUME);
		},
		/**
		 * --------------------------------
		 */
		
		/**
		 * <p style='color:#AD071D'><strong>rest</strong></p>
		 *
		 * Get the time remaining
		 * 
		 * @return {Number} The time left
		 */
		rest: function() {
			// Timer is stopped, rest is the initial delay
			if (this.Stopped) {
				return this._delay;
			}

			// Timer is paused, rest is fixed
			if (this.Paused) {
				return this._delay - (this.pauseTime - this.startTime);
			}

			// Timer is running, rest is dynamic in relation to current time
			if (this.Running) {
				return (this.startTime + this._delay) - Date.now();
			}
		},

		/**
		 * <p style='color:#AD071D'><strong>remove</strong></p>
		 *
		 * Stop the timer and remove it from the factory register.
		 * 
		 * Other less obvious behaviour is that it deletes the timer from the **owner**, set
		 * when constructing this instance.
		 *
		 * It also nulls every property of the object, setting it up for garbage collection.
		 */
		remove: function() {
			this.stop();

			this.owner[this.propertyName] = null;
			delete this.owner[this.propertyName];
			this.owner = null;

			index = timerFactory.timeOuts.indexOf(this);
			timerFactory.timeOuts.splice(index, 1);

			this.execute(this.REMOVE);

			this.destroy();
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>Delay</strong></p>
		 *
		 * Sets the delay of the timer.
		 * 
		 * This method returns _'this'_ so it is possible to concatenate it.
		 * This method is used internally by **configure**
		 * 
		 * @param {Number} d Delay amount in milliseconds
		 *
		 * @return {Object} Itself
		 */
		Delay: function(d) {
			canModify();

			this._delay = d;
			this.initDelay = d;
			return this;
		},
		/**
		 * --------------------------------
		 */
		
		/**
		 * <p style='color:#AD071D'><strong>RepeateCount</strong></p>
		 *
		 * Sets the repeateCount of the timer.
		 * 
		 * This method returns the _'this'_ so it is possible to concatenate it.
		 * This method is used internally by **configure**
		 * 
		 * @param {Number} d Amount of times this timer should be repeated before completing.
		 *
		 * @return {Object} Itself
		 */
		RepeateCount: function(r) {
			canModify();

			this.repeateCount = r;
			this.initRepeatCount = r;
			return this;
		},
		/**
		 * --------------------------------
		 */

		/**
		 * <p style='color:#AD071D'><strong>RemoveOnComplete</strong></p>
		 *
		 * Whether to remove the timer 
		 * from the factory register when complete.
		 * 
		 * This method returns the _'this'_ so it is possible to concatenate it.
		 * This method is used internally by **configure**
		 * 
		 * @param {Boolean} r Wheter to keep or remove the timer when it is done.
		 *
		 * @return {Object} Itself
		 */
		RemoveOnComplete: function(r) {
			canModify();

			this.removeOnComplete = r;
			return this;
		}
		/**
		 * --------------------------------
		 */
	});

	var canModify = function() {
		if (this.isRunning || this.isPaused) { 
			throw new Error("Can't modify timer while it is running")
		}		
	}

	Object.defineProperty(Timer.prototype, "Stopped", {
		get: function() {
			return !this.isRunning && !this.isPaused;
		}
	});

	Object.defineProperty(Timer.prototype, "Paused", {
		get: function() {
			return !this.isRunning && this.isPaused;
		}
	});

	Object.defineProperty(Timer.prototype, "Running", {
		get: function() {
			return this.isRunning && !this.isPaused;
		}
	});

	Object.defineProperty(Timer.prototype, "delay", {
		get: function() {
			return this.initDelay;
		},
		set: function(v) {
			this._delay = v;
			this.initDelay = v;
		}
	});

	// ### Getters for all the types of events a Timer can hook into
	Object.defineProperty(Timer.prototype, "REPEATE", { get: function() { return 'repeate'; } });
	Object.defineProperty(Timer.prototype, "COMPLETE", { get: function() { return 'complete'; } });
	Object.defineProperty(Timer.prototype, "STOP", { get: function() { return 'stop'; } });
	Object.defineProperty(Timer.prototype, "PAUSE", { get: function() { return 'pause'; } });
	Object.defineProperty(Timer.prototype, "RESUME", { get: function() { return 'resume'; } });
	Object.defineProperty(Timer.prototype, "REMOVE", { get: function() { return 'remove'; } });
	/**
	 * --------------------------------
	 */

	return timerFactory;
});