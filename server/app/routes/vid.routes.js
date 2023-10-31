module.exports = app => {
    const vid = require("../controllers/vid.controller.js");

    const router = require("express").Router();

    router.post("/upload", vid.upload);

    router.post("/create", vid.create);

    router.get("/filtered",vid.getFiltered);

    router.get("/all",vid.getAll);

    router.get("/id",vid.findById)

    app.use('/vid', router);
}