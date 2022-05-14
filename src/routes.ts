import * as fs from "fs";
//The handler was moved from the app.ts file here, to separate routing from the main code.
//We put the functionality here as an anonymous method, referenced by requestHandler
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
//Basic Routing
// In this code, we are returning a response based on the path specified in URL (the path specified after localhost:8080 e.g. localhost:8080/message
    if (url === '/') { // if no path specified, send back a basic html form which reads user input via a text box.
        // Once the form button is clicked, a POST message is send to the /message route.
        // The user input from the text box will automatically be populated in the POST request body.
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST">' +
            '<input type="text" name="message">' +
            '<button type="submit">Send</button>' +
            '</form></body>');
        res.write('</html>');
        return res.end(); // using a returning statement to make sure we return back for this callback and not execute anymore code lines.
    }
    if (url === '/message' && method === 'POST') { // Once the user on the browser enters their input, and the form above shows,
        // a POST request will be generated on the '/message' path, which will be captured here.
        // --> Parsing the request body:
        // See my node.js guide 'Reading a Message Body (chunks)' which shows a diagram or how the data from the request body is streamed into the code when an http request arrives, and received in chunks.a
        const body = [];

        // Javascript run code asynchronously. Therefore, when an asynchronous operation is taking place (e.g. reading data from a http request), we register event handlers.
        // Event handlers are registers with the 'on' keyword, where we specify the event and a call back method to process the event. JS will register that handler and continue processing the next lines (it will not wait for the event or the processing of it).
        // Here, we registering the  "data" event will occur when a chunk of data is ready
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk); //push the chunk of raw data to the array.
        });

        // the "end" event will be sent when all chunks were sent and there is no more data
        // Here, we are adding the a 'return' keyword, so that after registering this event handler, the call back method which started in line 6, returns and does not process any code between 52-54 while we wait for the end event
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // use the node.js Buffer class to concatenate all the entries of the body array, and convert to string since we know the request body is a string.

            //As we explained for the form, the data from the user will be sent in a ket=value pair format, so here we will get message=hello for example.
            //Therefore, we will need to split the
            const message = parsedBody.split('=')[1];

            // Lastly, write the user's sent message to the file.
            // We will not use writeFileSync since that is a blocking operation which could slow down our code.
            // instead we will writeFile which is async and in addition to file and and text to write, accepts a call back method to process errors.
            // So
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302; //setting the response http status code
                res.setHeader('Location', '/'); //instruct the browser to navigate back to '/'
                return res.end();
            });
        });
        //-- any code written here, will be unreachable
    }
// we will reach this code if the path on the request did not match any of the patterns and conditions  above
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
}

const msg = "Hello";
//Here, we are exporting the anonymous method reference, so that it can be imported in the main code.

// New1: There are several ways to export multiple item as shows here:
// option 1 - export using an object
// module.exports = {
//     reqHandlerKey: requestHandler,
//     messageKey: msg
// }
//
// option 2 - specify the key and value pair as - module.export.<key> = <variable which we are exporting>:
// module.exports.reqHandlerKey = requestHandler;
// module.exports.messageKey = msg;
//
// option 3 - use a shortcut form of option 2 bt dropping the module keyword
exports.reqHandlerKey = requestHandler;
exports.messageKey = msg;