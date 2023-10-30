const express = require("express");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import busboy, used to stream large files to the server.
const busboy = require('connect-busboy');

const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }

//app.use(cors(corsOptions));
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Définition d'un buffer de 2MiB
})); // Insertion du middleware busboy

// Intercept requests for
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'vid', req.url.replace(/^\/files\//, ''));
    console.log(req.url);
    console.log(filePath);

    // Check if the request is for a PNG file and doesn't end with _sprite.png
    if (path.extname(filePath) === '.png' && !filePath.endsWith('_sprite.png')) {
        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // If the file doesn't exist, serve the default PNG file
                const defaultFilePath = path.join(__dirname, 'vid', 'default_thumbnail.jpg');
                res.sendFile(defaultFilePath);
            } else {
                // If the file exists, serve the requested file
                res.sendFile(filePath);
            }
        });
    } else {
        // For non-PNG files or files ending with _sprite.png, continue to the next middleware
        next();
    }
});

// Serve static files
app.use('/files', express.static('vid'));
app.use('/games', express.static('games'));
app.use('/orga', express.static('orga'));

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

app.route('/ads/serve').get((req, res) => {
    const vast = `<VAST version="2.0">
    <Ad id="1">
        <InLine>
            <AdSystem>Togethearth Ad System</AdSystem>
            <AdTitle>PariMieux</AdTitle>
            <Description>The best advertisement</Description>
            <Creatives>
                <Creative AdID="1">
                    <Linear>
                        <Duration>00:00:18</Duration>
                        <VideoClicks>
                            <ClickThrough>http://www.parimieux.com</ClickThrough>
                        </VideoClicks>
                        <MediaFiles>
                            <MediaFile delivery="progressive" type="video/mp4" bitrate="4949657" width="1920"
                                       height="1080" scalable="true" maintainAspectRatio="true">
                                http://129.151.226.75:8080/files/17.mp4
                            </MediaFile>
                        </MediaFiles>
                    </Linear>
                </Creative>
            </Creatives>
        </InLine>
    </Ad>
</VAST>`;
    res.send(vast);
})

require('./app/routes/email.routes')(app);
require('./app/routes/vid.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/theme.routes.js')(app);
require('./app/routes/org.routes.js')(app);
require('./app/routes/game.routes')(app);


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
