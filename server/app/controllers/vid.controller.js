const fs = require('fs-extra');
const path = require('path');
const Video = require("../models/video.model.js")
const vidUploadPath = path.join(__dirname, '../../vid/');
fs.ensureDir(vidUploadPath);

exports.upload = (req, res, next) => {
    req.pipe(req.busboy); // Pipe the request through busboy

    let vidId = '12345';
    
    req.busboy.on('file', (fieldname, file, filename) => {
        res.json({step: 1}); // Step 1: upload file
        console.log(`Upload of '${filename}' started.`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(vidUploadPath, `${vidId}.mp4`));
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished.`);
            
            res.json({step: 2}); // Step 2: Generate pictures
            
            // TODO
            
            res.status(200).end();
        });
    });
}

exports.create = (req, res, next) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }

    // Create a video
    const video = new Video({
        name: req.body.name,
        description: req.body.description,
        themes: req.body.themes,
        organisation: req.body.organisation
    });

    // Save video in the database
    Video.create(video, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while creating the video"
            });
        else res.send(data);
    });
}

exports.getFiltered = (req, res) => {
    const theme = req.query.theme;
    //console.log(req.query)
    const filterQuerry = "SELECT video.id, video.name, video.description, id_theme, organization.name AS organization FROM video JOIN video_theme ON video.id = id_video JOIN organization ON id_org = organization.id WHERE id_theme = " + theme.id

    Video.getFiltered(filterQuerry, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving books"
            });
        else {
            res.send(data);
            console.log("data", data);
            return
           
        }

    });
}
