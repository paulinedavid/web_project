module.exports = app => {
    const vid = require("../controllers/vid.controller.js");

    const router = require("express").Router();

    router.post("/upload", vid.upload);

    app.use('/vid', router);
}