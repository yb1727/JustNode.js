import * as http from 'http';
// 1: importing express
import * as express from 'express'

let port = 8080;
// 2: setting a local reference variable for the express framework, which will allow us to use the framework's functionality.
const app = express()

// 3: starting a server using the express framework to provide a cal back method for processing requests.
const server = http.createServer(app);

server.listen(port);
