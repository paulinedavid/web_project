module.exports = app => {
    const game = require("../controllers/game.controller");

    const router = require("express").Router();

    router.post("/create", game.create);

    router.get("/filtered",game.getFiltered);

    router.get("/all",game.getAll);

    router.get("/id",game.findById)

    app.use('/game', router);
}