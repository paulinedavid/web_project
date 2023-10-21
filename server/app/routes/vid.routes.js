module.exports = app => {
    const vid = require("../controllers/vid.controller.js");

    const router = require("express").Router();

    router.post("/upload", vid.upload);

<<<<<<< HEAD
=======
    router.post("/create", vid.create);

    router.get("/filtered",vid.getFiltered);

    router.get("/all",vid.getAll);

    router.get("/id",vid.findById)

>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7
    app.use('/vid', router);
}