// 24.1.9 Once this controller method reference is called form the router, we can then return a response in a json format.
exports.getPosts= (req,res, next) => {
  //   24.1.10 we will return a status and a response. The default is 200 so the status can be omitted, but it was added here
    // to show that option , and soon we will return codes different than 200.
  res.status(200).json({
      posts: [{title: 'first post', content: 'This is the first post'}]
  });
};