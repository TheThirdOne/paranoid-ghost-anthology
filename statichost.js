static = require('node-static')
exports.makeServer = function(webroot){
	return new(static.Server)(webroot, {
	  cache: 600,
	  headers: { 'X-Powered-By': 'node-static' }
	});
}
exports.handler = function(req, res, server,util) {	
  	server.serve(req, res, function(err, result) {
      if (err) {
        console.error('Error serving %s - %s', req.url, err.message);
        if (err.status === 404 || err.status === 500) {
          server.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
        } else {
          res.writeHead(err.status, err.headers);
          res.end();
        }
      } else {
        console.log('%s - %s', req.url, res.message);
      }
    });
}
