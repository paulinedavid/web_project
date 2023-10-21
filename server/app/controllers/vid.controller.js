const fs = require('fs-extra');
const path = require('path');
<<<<<<< HEAD
=======
const { spawn } = require('node:child_process');
>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7

const vidUploadPath = path.join(__dirname, '../../vid/');
fs.ensureDir(vidUploadPath);

<<<<<<< HEAD
=======
const Video = require("../models/video.model.js");
const Organization = require('../models/org.model.js');

>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7
exports.upload = (req, res, next) => {
    req.pipe(req.busboy); // Pipe the request through busboy

    let vidId = '12345';
    
    req.busboy.on('file', (fieldname, file, filename) => {
<<<<<<< HEAD
        res.json({step: 1}); // Step 1: upload file
=======
        // Step 1: upload file
>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7
        console.log(`Upload of '${filename}' started.`);

        // Create a write stream of the new file
        const fstream = fs.createWriteStream(path.join(vidUploadPath, `${vidId}.mp4`));
        file.pipe(fstream);

        // On finish of the upload
        fstream.on('close', () => {
            console.log(`Upload of '${filename}' finished.`);
            
<<<<<<< HEAD
            res.json({step: 2}); // Step 2: Generate pictures
            
            // TODO
            
            res.status(200).end();
        });
    });
}
=======
            // Step 2: Generate pictures
            
            fs.mkdir(path.join(vidUploadPath, `${vidId}`));
            const generate_thumbs = spawn('ffmpeg', ['-i', path.join(vidUploadPath, `${vidId}.mp4`), '-vf', 'fps=1', path.join(vidUploadPath, `${vidId}/out%05d.png`)]);

            generate_thumbs.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            generate_thumbs.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
                // Don't send an error code here!
                // FFMPEG prints all logs to stderr!
            });

            generate_thumbs.on('close', (code) => {
                console.log(`child process exited with code ${code}.`);
                console.log("Thumbs generation finished!");

                // Step 3: Compress the thumbs

                console.log("Compressing thumbs...");
                const compress_thumbs = spawn('mogrify', ['-geometry', '100x', path.join(vidUploadPath, `${vidId}/`) + '*']);

                compress_thumbs.stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

                compress_thumbs.stderr.on('data', (data) => {
                    console.error(`stderr: ${data}`);
                });

                compress_thumbs.on('close', (code) => {
                    console.log(`child process exited with code ${code}.`);

                    // Step 4: Identify thumb size
                    console.log("Identifying thumb size...");
                    let image_geometry = null;
                    const thumb_size = spawn('identify', ['-format', '%g', path.join(vidUploadPath, `${vidId}/out00001.png`)]);

                    thumb_size.stdout.on('data', (data) => {
                        console.log(`stdout: ${data}`);
                        image_geometry = data;
                    });

                    thumb_size.stderr.on('data', (data) => {
                        console.error(`stderr: ${data}`);
                    });

                    thumb_size.on('close', (code) => {
                        console.log(`child process exited with code ${code}.`);

                        if (image_geometry === null) {
                            console.error("Image geometry is null, can't proceed!");
                            return;
                        }

                        // Step 5: Generate spritemap containing all thumbs.
                        // Count number of files
                        let number_of_thumbs = fs.readdirSync(path.join(vidUploadPath, `${vidId}/`)).length;

                        let sqrt = Math.ceil(Math.sqrt(number_of_thumbs));
                        let spritemap_dimensions = `${sqrt}x${sqrt}`;

                        let generate_spritemap = spawn("montage", [path.join(vidUploadPath, `${vidId}/*.png`), '-tile', spritemap_dimensions, '-geometry', image_geometry, path.join(vidUploadPath, `${vidId}_sprite.png`)]);

                        generate_spritemap.stdout.on('data', (data) => {
                            console.log(`stdout: ${data}`);
                        });

                        generate_spritemap.stderr.on('data', (data) => {
                            console.error(`stderr: ${data}`);
                        });

                        generate_spritemap.on('close', (code) => {
                            console.log(`child process exited with code ${code}.`);

                            // Remove all thumbs generated
                            fs.rmSync(path.join(vidUploadPath, `${vidId}/`), { recursive: true, force: true });

                            // Step 6: Generate WebVTT file
                            const VTTFilePath = path.join(vidUploadPath, `${vidId}_thumbs.vtt`);
                            fs.writeFileSync(VTTFilePath, 'WEBVTT\n', { flag: 'a' }, err => {
                                if (err) {
                                    console.error(err);
                                }
                            });

                            let img_w = parseInt(image_geometry.toString().split('+')[0].split('x')[0]);
                            let img_h = parseInt(image_geometry.toString().split('+')[0].split('x')[1]);
                            let x = 0, y = 0;

                            let sec = 0, min = 0, hrs = 0;
                            for (let i = 0; i < number_of_thumbs; i++) {
                                let next_hrs = hrs, next_min = min, next_sec = sec + 1;

                                // Increment by one second
                                if (next_sec >= 60) {
                                    next_sec = 0;
                                    next_min = min + 1;
                                }
                                if (next_min >= 60) {
                                    next_min = 0;
                                    next_hrs = hrs + 1;
                                }

                                // Append the lines to the file
                                fs.appendFileSync(VTTFilePath, `\n${i + 1}\n${hrs}:${min}:${sec}.000 --> ${next_hrs}:${next_min}:${next_sec}.000\n${vidId}_sprite.png#xywh=${x},${y},${img_w},${img_h}\n`, err => {
                                    if (err) {
                                        console.error(err);
                                    }
                                });

                                // Update x and y positions
                                x += img_w;
                                if (x > (sqrt - 1) * img_w) {
                                    x = 0;
                                    y += img_h;
                                }

                                // Update seconds, minutes and hours
                                hrs = next_hrs;
                                min = next_min;
                                sec = next_sec;
                            }

                            console.log("Finished generating WebVTT file!");

                            res.status(200).end();
                            return;
                        });
                    });
                })
            });
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
    if (!req.query){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else{
        var filters = req.query;
        //console.log("getFiltered: filters: "+JSON.stringify(filters  ))
        var filterQuery = "SELECT video.*, organization.name AS organization FROM video JOIN organization WHERE video.id_org = organization.id ";
        if(filters.name){
            filterQuery += "AND video.name LIKE '%"+filters.name+"%' ";
        }
        if(filters.id_org){
            filterQuery += "AND id_org = "+filters.id_org;

        }
        if(filters.themes){
            filterQuery += "AND video.id IN (SELECT id_video FROM video_theme WHERE id_theme IN ( "
            filters.themes.forEach(theme => {
                filterQuery += theme.id + ",";
            });
            filterQuery = filterQuery.slice(0,-1);
            filterQuery += "))";
        }
        //console.log(filterQuery);
        Video.getFiltered(filterQuery, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occured while retrieving books"
                });
            else {
                console.log("Video.getFiltered")
                res.send(data);
                //console.log("data", data);
                return
            
            }

        });
    }
}

exports.getAll = (req, res) => {
    Video.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving books"
            });
        else {
            console.log("Video.getAll")
            res.send(data);
        }
    });
}

exports.findById = (req, res) => {
    if (!req.query){
        console.log("Content can not be empty !")
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else if (!req.query.video_id){
        var error = JSON.stringify(req.query)+" Wrong format. Required : {video_id:}"
        console.log(error)
        res.status(400).send({
            message: error
        });
    }
    else{
        Video.findById(req.query.video_id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: "Video not found with id " + req.query.videoId
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving video with id " + req.query.videoId
                    });
                }
            } else {
                var video = data;
                Organization.findById(video.id_org, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: "Organization not found with id " + video.id_org
                            });
                        } else {
                            res.status(500).send({
                                message: "Error retrieving organization with id " + video.id_org
                            });
                        }
                    } else {
                        video.organization = data;
                        //console.log("video:",video)
                        console.log("Video.findById");
                        res.send(video);
                    }
                });
            }
        });
    }
}
>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7
