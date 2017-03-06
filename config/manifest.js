"use strict";

const Confidence = require('confidence');

module.exports = function () {
    // Allow a custom test environment to be run since lab forces the NODE_ENV to be
    // test.
    let env = process.env.TEST_ENV || process.env.NODE_ENV;
    let store = new Confidence.Store(buildConfidenceManifest(env));

    return store.get("/", {"env": env});
}

function buildConfidenceManifest(env) {
    return {
        server: {
            $filter: "env",
            $base: {
            },
            development: {
                debug: {
                    request: ["error"]
                }
            }
        },
        connections: {
            $filter: "env",
            $base: [
                {
                    host: "0.0.0.0",
                    port: 8080,
                    routes: {
                        cors: true
                    },
                    router: {
                        stripTrailingSlash: false
                    },
                    labels: ["api"]
                }
            ],
            development: []
        },
        registrations: {
            $filter: "env",
            $base: [
                {
                    plugin: {
                        register: "good",
                        options: {
                            ops: {
                                interval: 60000
                            },
                            reporters: {
                                consoleReporter: [
                                    {
                                        module: "good-squeeze",
                                        name: "Squeeze",
                                        args: {
                                            $filter: "env",
                                            production: [
                                                {
                                                    log: {
                                                        exclude: ["sensitive", "database"]
                                                    },
                                                    error: "*",
                                                    request: "*"
                                                }
                                            ],
                                            $default: [
                                                {
                                                    log: "*",
                                                    request: "*",
                                                    response: "*",
                                                    error: "*",
                                                    ops: "*"
                                                }
                                            ]
                                        }
                                    }, {
                                        module: "good-console"
                                    },
                                    "stdout"
                                ]
                            }
                        }
                    }
                }, {
                    plugin: "./lib"
                }
            ],
            development: [
                {
                    plugin: {
                        register: "blipp",
                        options: {}
                    }
                }
            ]
        }
    };
}