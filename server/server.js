const express = require("express");

const busboy = require('connect-busboy');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Définition d'un buffer de 2MiB
})); // Insertion du middleware busboy

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
require('./app/routes/theme.routes.js')(app);

// Définition du port d'écoute
const PORT = 8080;

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
