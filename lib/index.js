"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Decorators_1 = require("./Decorators");
exports.get = Decorators_1.get;
exports.post = Decorators_1.post;
exports.put = Decorators_1.put;
exports.del = Decorators_1.del;
exports.patch = Decorators_1.patch;
exports.next = Decorators_1.next;
var loadRoute_1 = require("./loadRoute");
exports.loadRoute = loadRoute_1.loadRoute;