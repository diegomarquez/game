requirejs.config({
	paths: {
		"delegate": "delegate",
		"class": "class",
		"game": "game",
		"keyboard": "input/keyboard",
		"sound_player": "sound_player",
		"state_machine": "state_machine",
		"timer_factory": "timer_factory",
		"draw": "draw",

		"matrix_3x3": "math/matrix_3x3",
		"vector_2D": "math/vector_2D",

		"component": "components/component",
		"renderer": "components/rendering/renderer",

		"root": "hierarchy/root",
		"layer": "hierarchy/layer",
		"layers": "hierarchy/layers",
		"game_object": "hierarchy/game_object",
		"game_object_container": "hierarchy/game_object_container",
		
		"pool": "pools/pool",
		"game_object_pool": "pools/game_object_pool",
		"component_pool": "pools/component_pool",
		"assembler": "pools/assembler",

		"domReady": "requireJS/domReady"		
	}
});

require(['domReady!', 'game', 'root', 'layers', 'main'], function(doc, game, root, layers, main) {
	main.start();

	game.on("update", this, function() {
		root.update(game.delta, game.isPaused);
		root.transformAndDraw(game.context);
	});

	layers.add("Back");
	layers.add("Middle");
	layers.add("Front");
	layers.add("Text");
	layers.add("Hud");
	layers.add("Popup");

	game.create(document.getElementById('main'), document.getElementById('game'));
});