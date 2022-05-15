// 5-1.1: importing http is no needed anymore, express uses it internally to listen on a port
// 1: importing express
import * as express from 'express'
//5.3.1: to be able to parse text request bodies, I have installed the body-parser package.
import * as bodyParser from 'body-parser'

// 5.4.4 : the routes which we moved to separate files under routes directory, are imported back here
import * as adminRoutes from './routes/admin'
import * as errorRoutes from './routes/erorr'

let port = 8080;
// 2: setting a local reference variable for the express framework, which will allow us to use the framework's functionality.
const app = express()


// 5.3.2: adding the cody parser to express
app.use(bodyParser.urlencoded ({extended: false}))

// 5-4.5 : to use the routes we have imported, we simply add them to express with the 'use' method.
//         Also, we are assigning all the routes from adminRoutes to be child paths under '/admin'
app.use('/admin', adminRoutes);
// 5-4.6: since the errorRoutes includes the '/' path with no specific http method, we add errorRoutes as the end as we saw before, so that it is not matched with specific paths (/product or /product-add)
//        Note - adding '/' with specific http method (e.g. router.get ('/',(req, res, next)..) will perform an exact match on '/' and will not much any more specific routes (like '/product).
//               In that case errorRoutes could have been place in any order (not necessarily at the end).
app.use(errorRoutes);

// 5-1.4: starting a server express listen command which listens on a port and sets app as a callback
app.listen(port);
