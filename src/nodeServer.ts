import * as http from "http";
import {checkServerIdentity} from "tls";

// create a call back method which will be called when a request is sent tot he server
const server = http.createServer( (req, res) => {
    console.log(req); // just print to the console the incoming request
})

// Listen to incoming requests on port 8080 and invoke the call back method above.
server.listen(8080) ;