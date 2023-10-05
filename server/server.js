const express = require("express");

// Import busboy, used to stream large files to the server.
const busboy = require('connect-busboy');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middleware

app.route('/').get((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="vid/upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
});

app.route('/auth/test').get((req, res) => {
    return "Hello World";
});

require('./app/routes/vid.routes.js')(app);
require('./app/routes/user.routes.js')(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
