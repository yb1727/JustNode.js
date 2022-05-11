import * as http from "http";

let port = 8080;

// create a call back method which will be called when a request is sent tot he server
const server = http.createServer( (req, res) => {
    //Examining the request object:
    console.log(req.url, req.method,req.headers); // Showing some of the request's attributes - url, method and headers
    // Returning a response
    // This is how to set a header for the response. In this example we are telling the client browser the content type odf the response body.
    res.setHeader('Content-Type','text/html');
    // Here we are writing the body of the response a series of 'write' method calls
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from Node.js</h1></h1></body>');
    res.write('</html>');
    res.end(); // This tells Node to send a response back. No 'write' method calls are allowed after this command. It will cause runtime exception.
})

// Listen to incoming requests on port as specified by the port variable, and invoke the call back method above.
server.listen(port) ;
