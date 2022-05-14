import * as http from 'http';

// New 2: since now we are importing more complex structures (object , multiple items), and not a single variable,
//  we will need to change the import statement to this form
const routes = require ('./routes');

//here we import the anaoymous method which we moved to routes.ts.
//Since that file is in the same directory as the current file, we prepended the path with './'


let port = 8080;

//here, we can use the routes we imported, and since there we have only one anonymous method exported 'requestHandler', it will be automatically be used here.
//The create server will now use the 'requestHandler' anonymous method for the createServer method.

// New 2: when multiple items were exported from the module with key, we can refer to the keys:
console.log(routes.messageKey);
const server = http.createServer(routes.reqHandlerKey);

server.listen(port);
