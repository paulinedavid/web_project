const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('node:child_process');

const vidUploadPath = path.join(__dirname, '../../vid/');
fs.ensureDir(vidUploadPath);

const Video = require("../models/video.model.js");
const Organization = require('../models/org.model.js');

const zeroPad = (num, places) => String(num).padStart(places, '0');
const { verifyuserToken } = require("../controllers/user.controller");

const sql = require("../models/db.js");

exports.upload = (req, res, next) => {
    let temp_vidId = "tmp_" + Date.now().toString(36);

    let uploadFinished = false;
    let treatmentFinished = false;

    let fields = {};
    let id = null;

    let img_w, img_h, number_of_thumbs, sqrt;

    let finishNewVideo = () => {
        if (uploadFinished && treatmentFinished) {
            console.log("Saving new video to database...");

            // Renaming files to the new id...
            fs.rename(path.join(vidUploadPath, `${temp_vidId}.mp4`), path.join(vidUploadPath, `${id}.mp4`));
            fs.rename(path.join(vidUploadPath, `${temp_vidId}.png`), path.join(vidUploadPath, `${id}.png`));
            fs.rename(path.join(vidUploadPath, `${temp_vidId}_sprite.png`), path.join(vidUploadPath, `${id}_sprite.png`));

            // Generate WebVTT file
            const VTTFilePath = path.join(vidUploadPath, `${id}_thumbs.vtt`);
            fs.writeFileSync(VTTFilePath, 'WEBVTT\n', { flag: 'a' }, err => {
                if (err) {
                    console.error(err);
                }
            });

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
                fs.appendFileSync(VTTFilePath, `\n${i + 1}\n${zeroPad(hrs, 2)}:${zeroPad(min, 2)}:${zeroPad(sec, 2)}.000 --> ${zeroPad(next_hrs, 2)}:${zeroPad(next_min, 2)}:${zeroPad(next_sec, 2)}.000\n${id}_sprite.png#xywh=${x},${y},${img_w},${img_h}\n`, err => {
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

            console.log("Everything is done!");
            res.status(200).end();
        }
    };

    req.busboy.on('file', (fieldname, file, filename) => {
        console.log(`fieldname: ${fieldname}`);
        console.log(`file: ${file}`);
        console.log(`filename: ${filename}`);

        if (fieldname === "thumbnail_file") {
            console.log(`Upload of thumbnail file started.`);

            const fstream = fs.createWriteStream(path.join(vidUploadPath, `${temp_vidId}.png`));
            file.pipe(fstream);

            fstream.on('close', () => {
                console.log("Upload of thumbnail file finished.");
            });
        }

        if (fieldname === "video_file") {
            // Step 1: upload file
            console.log(`Upload of video file started.`);

            // Create a write stream of the new file
            const fstream = fs.createWriteStream(path.join(vidUploadPath, `${temp_vidId}.mp4`));
            file.pipe(fstream);

            // On finish of the upload
            fstream.on('close', () => {
                console.log(`Upload of video file finished.`);

                // Step 2: Generate pictures

                fs.mkdir(path.join(vidUploadPath, `${temp_vidId}`));
                const generate_thumbs = spawn('ffmpeg', ['-i', path.join(vidUploadPath, `${temp_vidId}.mp4`), '-vf', 'fps=1', path.join(vidUploadPath, `${temp_vidId}/out%05d.png`)]);

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
                    const compress_thumbs = spawn('mogrify', ['-geometry', '256x', path.join(vidUploadPath, `${temp_vidId}/`) + '*']);

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
                        const thumb_size = spawn('identify', ['-format', '%g', path.join(vidUploadPath, `${temp_vidId}/out00001.png`)]);

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
                            number_of_thumbs = fs.readdirSync(path.join(vidUploadPath, `${temp_vidId}/`)).length;

                            sqrt = Math.ceil(Math.sqrt(number_of_thumbs));
                            let spritemap_dimensions = `${sqrt}x${sqrt}`;

                            let generate_spritemap = spawn("montage", [path.join(vidUploadPath, `${temp_vidId}/*.png`), '-tile', spritemap_dimensions, '-geometry', image_geometry, path.join(vidUploadPath, `${temp_vidId}_sprite.png`)]);

                            generate_spritemap.stdout.on('data', (data) => {
                                console.log(`stdout: ${data}`);
                            });

                            generate_spritemap.stderr.on('data', (data) => {
                                console.error(`stderr: ${data}`);
                            });

                            generate_spritemap.on('close', (code) => {
                                console.log(`child process exited with code ${code}.`);

                                // Remove all thumbs generated
                                fs.rmSync(path.join(vidUploadPath, `${temp_vidId}/`), { recursive: true, force: true });

                                // Step 6: Generate WebVTT file
                                // This will be done after we get the real id of the video, in the function finishNewVideo().
                                // For now, we can set some variables for the future...
                                img_w = parseInt(image_geometry.toString().split('+')[0].split('x')[0]);
                                img_h = parseInt(image_geometry.toString().split('+')[0].split('x')[1]);

                                treatmentFinished = true;

                                finishNewVideo();
                            });
                        });
                    })
                });
            });
        }
    });

    req.busboy.on('field', (fieldname, value) => {
        console.log(`Received field ${fieldname} with value ${value}.`);
        fields[fieldname] = value;
    });

    req.busboy.on("finish", () => {
        console.log("Finished uploading files and fields!");

        // Insert the video in the database
        Video.create(new Video({
            name: fields["title"],
            description: fields["description"],
            themes: fields["themes"].split(", "),
            id_org: fields["author"],
            publication_year: fields["publication_year"]
        }), (err, data) => {
            if (err) {
                res.status(500).send({message: err.message || "An error occurred while creating the video"});
                // TODO: Remove all files.
            } else {
                id = data.id;
            }
        });
  
        //we get the list of id of users that follow the organisation
        sql.query("SELECT id_user FROM follow WHERE id_org = ?", [fields["author"]], (err, data) => {
        if (err)
            if (err === "User not found") {
            return res.status(409).json({ message: err });
            } else {
            res.status(500).send({
                message: err.message || "Some error ",
            });
            }
        else {
            console.log("successful !");
            console.log(data);
            //for each user, we get their email address
            if(data!=[]){
            data.forEach(row => {
                console.log(row.id_user);
                sql.query("SELECT mail FROM users WHERE id = ?", [row.id_user], (err,data)=> {
                if(err){
                    if (err === "User not found") {
                    return res.status(409).json({ message: err });
                    } else {
                    return res.status(500).json({
                        message: err.message || "Some error ",
                    });
                    }
                }else{
                    console.log(data);
                    console.log(data[0].mail);
                    var emailaddress = data[0].mail;
                    sql.query("SELECT name FROM organization WHERE id = ?",[req.body.id_org], (err,data) => {
                    if(err){
                        res.status(500).send({
                            message: err.message || "Some error ",
                        });
                    }else{
                        console.log(data);
                        // once we have their email address, we send them a mail vu the information associated to the organisation
                        const email = new Email({
                        to: emailaddress,
                        subject: "New notification Togethearth",
                        template: "email-body-notif",
                        context: {
                            name : data[0].name,
                            link: "http://129.151.226.75:8081/login-page"
                        },
                        attachments: [{
                            filename: "LogoJour1.png",
                            path: "LogoJour1.png",
                            cid: "image_cid"
                        }]
                        });
                        Email.send(email, (result) => {
                        if (!result) {
                            // Error occurred during sending the email
                            console.error("Error sending email:", error);
                            res.status(500).json({ message: "An error occurred while sending the email!" });
                        } else {
                            // Email sent successfully
                            console.log("Email sent successfully:", result);
                            res.status(200).json({ message: "Email was sent." });
                        }
                        });
                    }
                    })
                }
                })
            });
            }
        }
        });
        
        uploadFinished = true;
        finishNewVideo();
    });

    req.pipe(req.busboy); // Pipe the request through busboy
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
        if(filters.joined == "true"){
            
            const decoded = verifyuserToken(filters.token);
            const mail = decoded.mail
            filterQuery += "AND id_org IN (SELECT id_org FROM follow JOIN users WHERE id_user = id AND mail = '"+mail+"')";
            
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
