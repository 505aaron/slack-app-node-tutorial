"use strict";

module.exports.greet = {
  handler: function (request, reply) {
    request.server.log(["commands"], {
      params: request.params,
      query: request.query,
      payload: request.payload
    });

    return reply({ "text": `Hello @${request.payload.user_name} :smile:` });
  }
};