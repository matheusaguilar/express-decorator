## Express-Decorator

Typescript decorators for Node Express.

### Decorators Methods
GET, POST, PUT, DELETE, PATCH, NEXT 

### Example
```javascript
import * as http from 'http';
import express from 'express';
import { get, post, put, del, patch, next, loadRoute } from 'express-decorator';

function validateUser(req, res, next) {
  next(); 
}

export class ExampleRoute {
  @get('/') 
  async getInfo(req, res) {
    res.status(200).send("Ok");
  }

  @post('/')
  async createInfo(req, res) {
    res.status(200).send("Ok");
  }

  @put('/')
  async updateInfo(req, res) {
    res.status(200).send("Ok");
  }

  @next(validateUser)
  @del('/')
  async deleteInfo(req, res) {
    res.status(200).send("Ok");
  }
}

const app = express();
app.use('/', loadRoute(new ExampleRoute()));

const httpServer = new http.Server(app);
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
```