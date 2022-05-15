import * as express from 'express'

// 5.4.1: This is a new file created in the project into which the /add-product and /product paths were moved from the main app.ts code
//        We want here first to import the express router , which we can then use to add routes to it.
const router = express.Router();

// 5.4.2 : We add here the path and call back methods for the '/add-product' and '/product' paths to the router (moved here from the main app.ts code)
//         Note: For the for action we must specify the admin parent path which is associated to this router in app.ts (so the total path is '/admin/product')
router.get ('/add-product',(req, res, next) => {
    res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>")
});

router.post ('/product',(req, res, next) => {
    console.log(req.body); //  if you enter book as product, this line will show { title: 'book' }
});

// 5.4.3: Lastly we export the router so that we can use it in the main code app.ts
module.exports = router ;




