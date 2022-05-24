//24.1.1 - We will build our REST API using express. Therefore, as we saw before, we will import express here
import * as express from 'express';

//24.2.1 : we will use body-parser to parse incoming json data in request body.
import * as bodyParser from 'body-parser'

//24.1.2 - creating a basic express app
const app = express() ;

//24.2.2 : before we can use the body parser, we will initialize it with a configuration to parse json request bodies.
app.use(bodyParser.json());

// 24.1.7 - After building the feed router, we will first need to import it
const feedRoute = require ('./routes/feed');

//24.3 CORS : when a client is hosted on a domain, we need to configure the middleware to allow requests from such clients (e.g. SPA clients)
app.use((req,res,next) => {
    // Allow all client origin domain and port. instead of '*' you can also specify a single client domain or comma separated list of domains with ports they are using (e.g. 'myspaapp.com:3000, blueapp.org')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow client to send http methods. you can also specify a single method or comma separated list of methods (e.g. 'GET,PUT,POST,DELETE')
    res.setHeader('Access-Control-Allow-Methods', '*');
    // Allow client to send only Content-Type or Authorization headers. If you want to allow more headers, add to the list, or change the list to '*' to allow all headers.
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // Continue to the next middleware in this chain (line 11)
    next();

});

// 24.1.8 Here, we are assigning all requests received on the /feed route to be handled by feeRoute router.
//     if we omit the path, all paths will be sent to thar router
app.use('/feed', feedRoute);

app.listen(8080);
