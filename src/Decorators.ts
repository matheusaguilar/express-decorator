const reflectPrefix = 'express_decorators';
export const ROUTE_PATH_KEY = `${reflectPrefix}_routePathKey`;
export const METHOD_KEY = `${reflectPrefix}_method`;
export const NEXT = `${reflectPrefix}_next`;
export const GET = `${reflectPrefix}_get`;
export const POST = `${reflectPrefix}_post`;
export const PUT = `${reflectPrefix}_put`;
export const DELETE = `${reflectPrefix}_delete`;
export const PATCH = `${reflectPrefix}_patch`;

/**
 * create router path info and decorator
 */
function createRoutePath(path, method) {
  return (target: any, key: string): any => {
    const methods: any[] = Reflect.getOwnMetadata(METHOD_KEY, target, ROUTE_PATH_KEY) || [];
    methods.push({
      path,
      key,
      method,
      func: target[key],
    });
    Reflect.defineMetadata(METHOD_KEY, methods, target, ROUTE_PATH_KEY);
  };
}

export function Get(path: string) {
  return createRoutePath(path, GET);
}

export function Post(path: string) {
  return createRoutePath(path, POST);
}

export function Put(path: string) {
  return createRoutePath(path, PUT);
}

export function Delete(path: string) {
  return createRoutePath(path, DELETE);
}

export function Patch(path: string) {
  return createRoutePath(path, PATCH);
}

export function Auth(func: Function) {
  return (target: any, key: string): any => {
    const methods: any[] = Reflect.getOwnMetadata(NEXT, target, key) || [];
    methods.unshift(func);
    Reflect.defineMetadata(NEXT, methods, target, key);
  };
}
