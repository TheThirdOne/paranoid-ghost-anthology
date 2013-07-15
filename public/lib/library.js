(function(exports){   //this allows the server and client to share the core code
	exports.protocals = {

		ping: "ping",
		ping_awk: "ping_awk",

		init: "init",
		init: "init_awk"
	};
})(typeof exports === 'undefined'? this['library']={} : exports);