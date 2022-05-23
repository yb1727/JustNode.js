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

// 24.1.8 Here, we are assigning all requests received on the /feed route to be handled by feeRoute router.
//     if we omit the path, all paths will be sent to thar router
app.use('/feed', feedRoute);

app.listen(8080);
