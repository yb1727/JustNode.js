// 25.1.3 - To be able to validate the request body using the rules sent by the router
//          we will first import the validator check from express-validator package.
const {validationResult} = require ('express-validator/check');

// 24.1.9 Once this controller method reference is called form the router, we can then return a response in a json format.
exports.getPosts= (req,res, next) => {
  //   24.1.10 we will return a status and a response. The default is 200 so the status can be omitted, but it was added here
    // to show that option , and soon we will return codes different than 200.
  res.status(200).json({
      posts: [{
               _id: '1',
               title: 'first post',
               content: 'This is the first post',
               imageUrl: 'images/duck.jpg',
               creator: {
                    name: 'Yair'
               },
               createdAt: new Date()
      }]
  });
};

exports.createPosts = (req,res, next) => {
    // 25.1.4 - Now, before processing the incoming post request, we will perform validation
    //             which were sent by the router, and return an error status and message , if validations failed
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res
            .status(422)
            .json({
                message: 'request validations failed',
                errors: errors.array()
            });
    }
    // 24.2.3 : We are expecting the client to send a request with json body which has a title and content fields.
    //          So, here we are extracting that information from the body. Since the body parser was already configured
    //          to parse json format of request bodies, these should be available here.
    const title = req.body.title ;
    const content = req.body.content;

    // 24.2.4: For nos we will return a dummy response (as if we stored the data in the database,
    //            and populating the response body with data from the request body.
    res.status(201).json({
        message : "Data was created successfully",
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {name: 'Yair'}},
            createdAT: new Date()
    });
};