const express = require("express");
const cors = require('cors');

// Import busboy, used to stream large files to the server.
const busboy = require('connect-busboy');

const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
<<<<<<< HEAD
  
app.use(cors(corsOptions));
=======

//app.use(cors(corsOptions));
app.use(cors());
>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(busboy({
<<<<<<< HEAD
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middleware
=======
    highWaterMark: 2 * 1024 * 1024, // Définition d'un buffer de 2MiB
})); // Insertion du middleware busboy
>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7

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

<<<<<<< HEAD
require('./app/routes/vid.routes.js')(app);
require('./app/routes/user.routes.js')(app);

const PORT = 8080;
=======
require('./app/routes/email.routes')(app);
require('./app/routes/vid.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/theme.routes.js')(app);
require('./app/routes/org.routes.js')(app);
require('./app/routes/game.routes')(app);


const PORT = 8080;

>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
