'use strict';

const _ = require('lodash');
const Glue = require('glue');
const manifest = require('./config/manifest')();


Glue.compose(manifest, { relativeTo: __dirname }, function compose(err, server) {
  if (err) {
    console.log('server.register err:', err);
  }

  server.start(function start(){
    _.each(server.connections, connection => {
      server.log(["ops"], '✅  Server is listening on ' + connection.info.uri.toLowerCase());
    })
  });
});