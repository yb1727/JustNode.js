import * as express from 'express';

// 24.1.3 In this file we will store our router which invokes a controller method based on the incoming request http verb
//      (GET, POST, PUT, DELETE) and path.

// 24.1.4  we will first import the controller
const feedController = require ('../controllers/feedController');

// 24.1.5 we will also need to import the express' router to be able to perform routing
const router = express.Router();

// 24.1.6 Now, we can map any GET requests sent to this router on the /posts path to be handled by the specific feedController.getPosts
//     method (to map GET we use router.get).
//     Since app.ts will send all requests on /feed to this router, to be able to match this router mapping, the GET request must be
//     sent be the client on path /feed/posts
router.get('/posts', feedController.getPosts);


module.exports = router;