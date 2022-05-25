import * as express from 'express';

// 25.1.1 - to perform validations on input data, we will use the express validator
const {body} = require ('express-validator/check');

// 24.1.3 In this file we will store our router which invokes a controller method based on the incoming request http verb
//      (GET, POST, PUT, DELETE) and path.

// 24.1.4  we will first import the controller
const feedController = require ('../controllers/feedController');

// 24.1.5 we will also need to import the express' router to be able to perform routing
const router = express.Router();

// 24.1.6 Now, we can map any GET requests sent to this router on the /posts path to be handled by the specific feedController.getPosts
//     method (to map GET we use router.get).
//     Since app.ts will send all requests on /feed to this router, to be able to match this router mapping, the GET request must be
//     sent by the client on path /feed/posts
router.get('/posts', feedController.getPosts);

// 24.2.5 Adding a router for a POST method.
//        Here, app.ts will send all requests on /feed to this router, to be able to match this router mapping,
//        the POST request must be sent by the client on path /feed/post
router.post('/post',
// 25.1.2 - as par tof this router for POST, we are adding requirements using the 'body' validator we imported, require
//          that title and content will be atleat 5 characters long. Validating the request body based on these rules will be done in the controller itself.
    [
        body('title').trim().isLength(({min: 5})),
        body('content').trim().isLength(({min: 5})),
    ],
    feedController.createPosts);

module.exports = router;