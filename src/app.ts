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
// 5-2.1: One another parameter we can add to the use method is the path to which the callback should be responding.
//      Here, we add the following method to respond to the path of '/user'.
app.use ('/user',(req, res, next) => {
    console.log ("I am in the users callback method in chain");
    res.send("<h1>Hello from express - user Route</h1>")
});

// 5-2.2 Here we add another method to respond to '/'.
//      Now, it is important to place the the '/' path callback as the last one since it will match anything that starts with '/' including '/users'.
//      This is special behavior for the '/' route only. Other, more specific routes does not have this behavior (a callback for '/user' will not be invoked if path sent on the request is '/users')
//      Since we want the method for '/' to only activate of non of the other paths were matched with the other methods, we should place it at the end.
//      Note - you have the option to place the method for '/' before the other callback methods with more specific paths, if you add the next() method call
//          as the last command in the callback method (instead of the send method which also returns and doe snot continue the flow), so that code flows to
//          check the other call back methods paths.
app.use ('/',(req, res, next) => {
  console.log ("I am in the default callback method in chain");
  // 6. We will use express' send method to return a response directly.
  //    This method accepts as parameters the response body in whichever format we want (text, html, json, etc...)
  //    we don't have to write the response line by line anymore, and express will automatically set the header for content type for us,
  //    by detecting the response body format we sent.
  res.send("<h1>Hello from express - Default Route</h1>")
});
// 5-1.4: starting a server express listen command which listens on a port and sets app as a callback
app.listen(port);
