const Theme = require('../models/theme.model.js');
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    
    // Create a Theme
    console.log("New theme",req.body);
    const Theme = new Theme({
        nom : req.body.name,
    });
    Theme.create(Theme, (err, data)=>{
        if(err)
            res.status(500).send({
                message : err.message || "Some error ",
            });
        else {
            res.json({message:"Theme added succesfully"});
        }
    })
}

// Retrieve all themes from the database.
exports.getAll = (req, res) => {
    Theme.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error "
            });
        else res.send(data);
    });
};

