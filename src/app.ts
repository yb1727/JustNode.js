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

//11.1.3.1 - to be able to sync our models to the db, we will first import the db instance connection from the pool we created
const db = require('./util/database');

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

// 11.1.3.2 - with the sync method we can now sync all the models (here we just created PostModel in post.ts),
//          to the database. It will generate tables based on the model name (it will pluralize the table name from the model name :  post -> posts).
//          It will generate and run the necessary queries, and in this example it will generate and run the following
//          query: CREATE TABLE IF NOT EXISTS "posts" ("id"   SERIAL , "title" VARCHAR(255) NOT NULL,
//          "content" VARCHAR(255) NOT NULL, "imageUrl" VARCHAR(255), "creator" VARCHAR(255) NOT NULL,
//          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
//          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
db.sync()
    .then( results => {
       // console.log(results); uncomment this line if you would like the query on the console.
        // 11.1.3.3 : we will start listening to http requests only if the db sync was successful.
        app.listen(8080);
        console.log("===== App Started===");
    }).catch( err => {
      console.log(err);
    });
