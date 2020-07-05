"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reflectPrefix = 'express_decorators';
exports.ROUTE_PATH_KEY = `${reflectPrefix}_routePathKey`;
exports.METHOD_KEY = `${reflectPrefix}_method`;
exports.NEXT = `${reflectPrefix}_next`;
exports.GET = `${reflectPrefix}_get`;
exports.POST = `${reflectPrefix}_post`;
exports.PUT = `${reflectPrefix}_put`;
exports.DELETE = `${reflectPrefix}_delete`;
exports.PATCH = `${reflectPrefix}_patch`;
/**
 * create router path info and decorator
 */
function createRoutePath(path, method) {
    return (target, key) => {
        const methods = Reflect.getOwnMetadata(exports.METHOD_KEY, target, exports.ROUTE_PATH_KEY) || [];
        methods.push({
            path,
            key,
            method,
            func: target[key],
        });
        Reflect.defineMetadata(exports.METHOD_KEY, methods, target, exports.ROUTE_PATH_KEY);
    };
}
function get(path) {
    return createRoutePath(path, exports.GET);
}
exports.get = get;
function post(path) {
    return createRoutePath(path, exports.POST);
}
exports.post = post;
function put(path) {
    return createRoutePath(path, exports.PUT);
}
exports.put = put;
function del(path) {
    return createRoutePath(path, exports.DELETE);
}
exports.del = del;
function patch(path) {
    return createRoutePath(path, exports.PATCH);
}
exports.patch = patch;
function next(func) {
    return (target, key) => {
        const methods = Reflect.getOwnMetadata(exports.NEXT, target, key) || [];
        methods.unshift(func);
        Reflect.defineMetadata(exports.NEXT, methods, target, key);
    };
}
exports.next = next;
