const sql = require("./db.js");

// constructor
const Game = function (game) {
    this.id = game.id;
    this.name = game.name;
    this.description = game.description;
    this.themes = game.themes;
    this.id_org = game.id_org;
    this.organization = game.organization;
};

Game.create = (newGame, result) => {
    sql.query("INSERT INTO game(name,description,id_org) VALUES(?,?,?);", [newGame.name,newGame.description,newGame.id_org], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }

        // ajout des themes dans la table game_theme
        newGame.themes.forEach((theme) => {
            sql.query("INSERT INTO game_theme(id_game,id_theme) VALUES(?,?);", [res.insertId,theme], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return; 
                }
            });
        });
        
        console.log("created game: ", { id: res.insertId, ...newGame });
        result(null, { id: res.insertId, ...newGame });
    });
};

Game.getFiltered = (filterQuery, result) => {
    //console.log(filterQuery);
    sql.query(filterQuery, (err, resGames) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }else if (resGames.length > 0) {
            let myGames = [];
            resGames.forEach(game => {
                game.themes = [];
                sql.query("SELECT name FROM game_theme JOIN Theme ON game_theme.id_theme = Theme.id WHERE id_game = ?", [game.id], (err, resThemes) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }else{
                        resThemes.forEach(theme => {
                            game.themes.push(theme);
                        });
                        myGames.push(game);
                        //console.log(JSON.stringify(myGames))
                        result(null, myGames);
                        return
                    }
                });
            });
        }
        else {
            result(null, resGames);
            return;
        }
    });
}

Game.findById = (GameId,result) => {
    sql.query(`SELECT * FROM game WHERE id = ${GameId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return; 
        }
        if (res.length) {
            const game = new Game(res[0]);
            sql.query("SELECT name FROM game_theme JOIN Theme ON game_theme.id_theme = Theme.id WHERE id_game = ?", [GameId], (err, resThemes) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }else{
                    game.themes = resThemes;
                    //console.log("Game FindById: ",game);
                    result(null, game);
                    return;
                }

            });
        }
        else{
            result({ kind: "not_found" }, null);
            return;
        }
    });
};

Game.getAll = result => {
    sql.query("SELECT * FROM game", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //console.log("game: ", res);
        result(null, res);
    });
};

module.exports = Game;