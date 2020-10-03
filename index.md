## Express-Decorator

Typescript decorators for Node Express.

### Required to work

This package will need the packages:

```javascript
npm install reflect-metadata
```

```javascript
npm install express
```

Also don't forget to enable decorators inside tsconfig.json:

```javascript
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,
}
```

### Decorators Methods
GET, POST, PUT, DELETE, PATCH, NEXT 

### Example

You can download this example at: https://github.com/matheusaguilar/express-decorator-example

```javascript
import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import { get, post, put, del, patch, next, loadRoute } from '@magn/express-decorator';

function createErrorMessage(message: string) {
  return JSON.stringify({ message });
}
 
function validateId(req: Request, res: Response, next: NextFunction) {
  if (req.body?.id) {
    next();  
  } else {
    res.status(400).send(createErrorMessage('You need to provide an id on the body params to access this endpoint.'));
  }
}

function validatePassword(req: Request, res: Response, next: NextFunction) {
  if (req.body?.password) {
    next();  
  } else {
    res.status(400).send(createErrorMessage('You need to provide a password on the body params to access this endpoint.'));
  }
}
 
export class ExampleRoute {
  @get('/') 
  async getInfo(req: Request, res: Response) {
    res.status(200).send("Info");
  }
 
  @post('/')
  async createInfo(req: Request, res: Response) {
    res.status(200).send("Created");
  }
 
  @put('/')
  async updateInfo(req: Request, res: Response) {
    res.status(200).send("Updated");
  }
 
  @next(validateId)
  @next(validatePassword)
  @del('/')
  async deleteInfo(req: Request, res: Response) {
    res.status(200).send("Deleted");
  }

  @patch('/')
  async patchInfo(req: Request, res: Response) {
    res.status(200).send("Patched");
  }
}
 
const app = express();
app.use(bodyParser.json());
app.use('/', loadRoute(new ExampleRoute()));
const httpServer = new http.Server(app);
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
```
