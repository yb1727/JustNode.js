// 25.1.3 - To be able to validate the request body using the rules sent by the router
//          we will first import the validator check from express-validator package.
const {validationResult} = require('express-validator/check');

// 11.2.1 : we will use the Post domain object with sequelize to to perform
//          Create, Read, Update and Delete (CRUD) operations on the db
const Post = require('../models/post');

// 11.2.2 : we will also add an interface describing the data we get back when selecting from the Post table.
//          This interface will be used to define an array which will hold the results returned from findAll
//          or findByPK domain methods. The filed names in this interface are not important and does not have
//          to match any of the Post domain object attributes - only the types and order are important.
//          But, normally, it would be best practice to name those fields the same as the attributes in the PostModel
//          domain object to preserve clarity.
interface PostInterface {
    id: Number;
    title: String;
    content: String;
    imageUrl: String;
    creator: String;
    createdAt: Date; // 2022-05-29T19:52:23.100Z,
    updatedAt: Date; // 2022-05-29T19:52:23.100Z
}

// 24.1.9 Once this controller method reference is called form the router, we can then return a response in a json format.
exports.getPosts = (req, res, next) => {
    //   24.1.10 we will return a status and a response. The default is 200 so the status can be omitted, but it was added here
    // to show that option , and soon we will return codes different than 200.

    // 11.2.3: We will use the findAll method of  the Post domain method with sequelize,  to get all rows from the post table.
    //        Once results are returned (then operator) we will use an array with type of the PostInterface above,
    //        to hold the data part of each entry returned.
    //        Eventually, we will return the results in json format and 200 status.
    Post.findAll()
        .then(results => {
            let resultArr: PostInterface[] = [];
            results.map(entry => {
                resultArr.push(entry.dataValues);
            });
            res.status(200).json(resultArr);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({status: "failed"})
        });
};

exports.createPosts = (req, res, next) => {
    // 25.1.4 - Now, before processing the incoming post request, we will perform validation
    //             which were sent by the router, and return an error status and message , if validations failed
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
    const title = req.body.title;
    const content = req.body.content;

    // 11.2.4 - to create a row in the DB, we will use the Post domain object which we created with sequelize
    //          and use the create method, providing a js object with fields which are named exactly ae the Post
    //          domain object attributes. The 'create' method returns a promise, for which we use the then operator
    //          (no errors) to return a 201 (created) with json response of success. if error are caught, using the catch
    //          operator , we return an 500 error response and a json body response of failed.
    Post.create({
        title: title,
        content: content,
        imageUrl: 'Dummy',
        creator: 'Yair'
    })
        .then(() => res.status(201).json({status: "successfully created"}))
        .catch(() => res.status(500).json({status: "failed"}));
};