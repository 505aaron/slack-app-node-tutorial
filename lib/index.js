"use strict";

let Handlers = require('./handlers');

exports.register = function (plugin, options, next) {

    plugin.route([
        {
            method: 'POST',
            path: "/greeting",
            config: Handlers.greet
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api'
};