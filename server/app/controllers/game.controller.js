const Game = require("../models/game.model");
const Organization = require("../models/org.model")

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else{
        var game = req.body;
        if(!game.name || !game.description || !game.id_org || !game.themes)
        {
            res.status(400).send({
                message: "Wrong format. Required : {name:'', description:'', id_org:, themes:[], } "
            });
        }
        else{
            // Save game in the database
            Game.create(game, (err, data) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occured while creating the game"
                    });
                else res.send(data);
            });
        }
    }
}

exports.getFiltered = (req,res) => {
    if (!req.query){
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else{
        var filters = req.query;
        console.log(filters);
        var filterQuery = "SELECT game.*, organization.name AS organization FROM game JOIN organization WHERE game.id_org = organization.id  ";
        if(filters.name){
            filterQuery += "AND game.name LIKE '%"+filters.name+"%' ";
        }
        if(filters.themes){
            filterQuery += "AND game.id IN (SELECT id_game FROM game_theme WHERE id_theme IN ( "
            filters.themes.forEach(theme => {
                filterQuery += theme.id + ",";
            });
            filterQuery = filterQuery.slice(0,-1);
            filterQuery += "))";
        }
        if(filters.id_org){
            filterQuery += "AND id_org = " + filters.id_org;
        }
        //console.log(filterQuery);
        Game.getFiltered(filterQuery, (err, data) => {
            if (err){
                res.status(500).send({
                    message: err.message || "Some error occured while retrieving games"
                }); 
                return;
            }
            else{
                console.log(data)
                res.send(data);
                return
            } 
        });
    }
}

exports.findById = (req, res) => {
    if (!req.query) {
        console.log("Content can not be empty !");
        res.status(400).send({
            message: "Content can not be empty !"
        });
    } else if (!req.query.game_id) {
        var error = JSON.stringify(req.query) + " Wrong format. Required : {game_id:}";
        console.log(error);
        res.status(400).send({
            message: error
        });
    } else {
        Game.findById(req.query.game_id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    console.log("Game not found with id " + req.query.game_id);
                    res.status(404).send({
                        message: "Game not found with id " + req.query.game_id
                    });
                } else {
                    console.log("Error retrieving game with id " + req.query.game_id);
                    res.status(500).send({
                        message: "Error retrieving game with id " + req.query.game_id
                    });
                }
            } else {
                var game = data;
                Organization.findById(game.id_org, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            console.log("Organization not found with id " + game.id_org);
                            res.status(404).send({
                                message: "Organization not found with id " + game.id_org
                            });
                        } else {
                            console.log("Error retrieving organization with id " + game.id_org);
                            res.status(500).send({
                                message: "Error retrieving organization with id " + game.id_org
                            });
                        }
                    } else {
                        game.organization = data;
                        console.log("game found controller");
                        res.send(game);
                    }
                });
            }
        });
    }
};


exports.getAll = (req,res) => {
    Game.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while retrieving games"
            });
        else res.send(data);
    });
}