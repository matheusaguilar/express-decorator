"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoute = void 0;
const express_1 = __importDefault(require("express"));
const Decorators_1 = require("./Decorators");
exports.loadRoute = (routeInstance) => {
    const router = express_1.default.Router();
    const paths = Reflect.getMetadata(Decorators_1.METHOD_KEY, routeInstance, Decorators_1.ROUTE_PATH_KEY);
    for (const path of paths) {
        const funcs = [];
        const next = Reflect.getMetadata(Decorators_1.NEXT, routeInstance, path.key);
        // add all validation next functions
        if (next) {
            funcs.push(...next);
        }
        funcs.push(path.func.bind(routeInstance));
        // create router
        switch (path.method) {
            case Decorators_1.GET:
                router.get(path.path, funcs);
                break;
            case Decorators_1.POST:
                router.post(path.path, funcs);
                break;
            case Decorators_1.PUT:
                router.put(path.path, funcs);
                break;
            case Decorators_1.DELETE:
                router.delete(path.path, funcs);
                break;
            case Decorators_1.PATCH:
                router.patch(path.path, funcs);
                break;
        }
    }
    return router;
};
