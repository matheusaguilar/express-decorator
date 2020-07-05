import express, { Router } from 'express';
import { ROUTE_PATH_KEY, METHOD_KEY, GET, POST, PUT, DELETE, PATCH, NEXT } from './Decorators';

export const loadRoute = (routeInstance: any) => {
  const router: Router = express.Router();
  const paths = Reflect.getMetadata(METHOD_KEY, routeInstance, ROUTE_PATH_KEY);

  for (const path of paths) {
    const funcs = [];
    const next = Reflect.getMetadata(NEXT, routeInstance, path.key);

    // add all validation next functions
    if (next) {
      funcs.push(...next);
    }
    funcs.push(path.func.bind(routeInstance));

    // create router
    switch (path.method) {
      case GET:
        router.get(path.path, funcs);
        break;
      case POST:
        router.post(path.path, funcs);
        break;
      case PUT:
        router.put(path.path, funcs);
        break;
      case DELETE:
        router.delete(path.path, funcs);
        break;
      case PATCH:
        router.patch(path.path, funcs);
        break;
    }
  }

  return router;
};
