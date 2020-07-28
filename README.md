## Express-Decorator

Typescript decorators for Node Express.

### Decorators Methods
get, post, put, del, patch, next 


### Example
```javascript
import * as http from 'http';
import express from 'express';
import { get, loadRoute } from 'express-decorator';

export class ExampleRoute {
  @get('/')
  async test(req, res) {
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