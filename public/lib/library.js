(function(exports){   //this allows the server and client to share the core code
	exports.protocals = {
		ping: "ping",
		ping_awk: "ping_awk",

		init: "init",
		init_awk: "init_awk",

		update: "update",
		update_awk: "update_awk",

		action: "action",
		action_awk: "action_awk"
	};
	exports.player = function(id, name){
		this.id = id;
		this.name = name
		this.x = 0;
		this.y = 0;
	};
	exports.actions = {
		jump: function(dt, player, environment){
				player.y += dt * 5;
		},
		fall: function(dt, player, environment){
				player.y -= dt * 5;
		}
	};
})(typeof exports === 'undefined'? this['library']={} : exports);