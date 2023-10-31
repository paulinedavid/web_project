module.exports = app => {
    const theme = require("../controllers/theme.controller.js");

    const router = require("express").Router();

    router.post("/add", theme.create)

    router.get("/all", theme.getAll);

    app.use('/theme', router);
}