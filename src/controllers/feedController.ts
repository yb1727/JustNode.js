// 24.1.9 Once this controller method reference is called form the router, we can then return a response in a json format.
exports.getPosts= (req,res, next) => {
  //   24.1.10 we will return a status and a response. The default is 200 so the status can be omitted, but it was added here
    // to show that option , and soon we will return codes different than 200.
  res.status(200).json({
      posts: [{title: 'first post', content: 'This is the first post'}]
  });
};

exports.createPosts = (req,res, next) => {
    // 24.2.3 : We are expecting the client to send a request with json body which has a title and content fields.
    //          So, here we are extracting that information from the body. Since the body parser was already configured
    //          to parse json format of request bodies, these should be available here.
    const title = req.body.title ;
    const content = req.body.content;

    // 24.2.4: For nos we will return a dummy response (as if we stored the data in the database,
    //            and populating the response body with data from the request body.
    res.status(201).json({
        message : "Data was created successfully",
        post: {id: new Date().toISOString(),title: title, content: content}
    });
};