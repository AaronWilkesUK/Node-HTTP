const http = require('http');
const fs = require('fs');

//Define listening port
const PORT = 5000;

const server = http.createServer((req, res) => {
    //Set response header
    res.setHeader("content-type", "text/html");

    //Configure Routes
    let path = "./pages/";
    switch(req.url) {
        case "/":   //Default root dir
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/another":    //Another route
            path += "another.html";
            res.statusCode = 200;
            break;
        case "/redirect":   //Redirect route
            res.statusCode = 301;
            res.setHeader("location", "/another");
            res.end();
            break;
        default:    //All other routes - typically 404
            path += "404.html";
            res.statusCode = 404;
            break;
    }   

    //Read HTML from File System and send to client.
    fs.readFile(path, (err, data) => {
        //Check for errors
        if(err) {
            console.log(err);
            res.end();
        }
        res.end(data);
    });
});

//Set up server to listen on the given port.
server.listen(PORT, "localhost", () => {
    console.log("Listening for requests on port: ", PORT);
});