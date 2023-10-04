const fs = require('fs-extra');
const path = require('path');

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