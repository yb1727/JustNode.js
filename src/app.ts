import * as http from 'http';
import * as fs from 'fs';

let port = 8080;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  //Basic Routing
  // In this code, we are returning a reponse based on the path specified in URL (the path specified after localhost:8080 e.g. localhost:8080/message
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
    return res.end(); // using a returning statement to make sure we return back for thios callback and not execute anymore code lines.
  }
  if (url === '/message' && method === 'POST') { // Once the user on the browser enters their input, and the form above shows,
    // a POST request will be generated on the '/message' path, which will be captured here.
    // --> Parsing the request body:
    // See my node.js guide 'Reading a Message Body (chunks)' which shows a diagram or how the data from the request body is streamed into the code when an http request arrives, and received in chunks.a
    const body = [];
    // the "data" event will be sent when a chunk of data is ready
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk); //push the chunk of raw data to the array.
    });
    // the "end" event will be sent when all chunks were sent and there is no more data
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString(); // use the node.js Buffer class to concatenate all the entries of the body array, and convert to string since we know the request body is a string.

      //As we explained for the form, the data from the user will be sent in a ket=value pair format, so here we will get message=hello for example.
      //Therefore, we will need to split the
      const message = parsedBody.split('=')[1];

      // Lastly, write the user's sent message to the file
      fs.writeFileSync('message.txt', message);
    });
    //--

    res.statusCode = 302; //setting the response http status code
    res.setHeader('Location', '/'); //instruct the browser to navigate back to '/'
    return res.end();
  }
  // we will reach this code if the path on the request did not match any of the patterns and conditions  above
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(port);
