import * as http from 'http';

// New: here we import the anaoymous method which we moved to routes.ts.
//      Since that file is in the same directory as the current file, we prepended the path with './'
import * as routes from './routes';

let port = 8080;

// New: here, we can use the routes we imported, and since there we have only one anonymous method exported 'requestHandler', it will be automatically be used here.
//      The create server will now use the 'requestHandler' anonymous method for the createServer method.
const server = http.createServer(routes);

server.listen(port);
