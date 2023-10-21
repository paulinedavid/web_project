module.exports = app => {
    const organisation = require("../controllers/org.controller")
    
    const router = require("express").Router();

    router.post("/create", organisation.create);

    router.get("/all", organisation.getAll);

    router.get("/filtered", organisation.getFiltered);

    router.get("/id", organisation.findById);

    // router.post("/update", organisation.update);

    // router.post("/delete", organisation.delete);

    app.use('/org', router);

}
