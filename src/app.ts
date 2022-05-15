// 5-1.1: importing http is no needed anymore, express uses it internally to listen on a port
// 1: importing express
import * as express from 'express'

let port = 8080;
// 2: setting a local reference variable for the express framework, which will allow us to use the framework's functionality.
const app = express()

// 5-1.2: Adding middleware : Now in order to process requests, we will need to add call back methods to express to process requests.
//    You can add more than method (create a chain of methods), which will be run sequentially on the request.
//    When processing is complete, a response should be sent tot the client form the last method in the chain.

// 5-1.3: the use method allows us to add a middleware callback method to express.
//    the callback method receives 2 parameters from express:
//      req : the request object
//      res : the response object to be return to the client
//      next: a method than can be called to chain this callback method to the next one
//      ** naming of these input parameters is up to you (e.g. you can call them request, response, nextmethod), as long as you maintain the order of those params.
app.use ((req, res, next) => {
    console.log ("I am in the first method in chain");
    next() ; // flow to the next method in chain below
});

app.use ((req, res, next) => {
  console.log ("I am in the next method in chain");
  // 6. This is the last method of the chain, therefore, we will use express' send method to return a response directly.
  //    This method accepts as parameters the response body in whic ever format we want (test, html, json, etc...)
  //    we don't have to write the response line by line anymore, and express will automatically set the header for content type for us,
  //    by detecting the reponse body format we sent.
  res.send("<h1>Hello from express</h1>")
});
// 5-1.4: starting a server express listen command which listens on a port and sets app as a callback
app.listen(port);
