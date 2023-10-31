module.exports = app =>{
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/register", users.register);

    router.get("/registerconfirmed", users.create);

    router.post('/login',users.login);

    router.post('/forgot_password', users.forgot_password);

    router.get('/verif_token', users.verif_token);

    router.post('/reset_password', users.reset_password);

    router.get('/extract_mail' , users.extract_email);

    router.get('/get_mail_name' , users.get_mail_name);

    router.post('/change_password', users.change_password);
    

    router.post('/updateProfile', users.updateProfile);

    router.post('/send_notification', users.send_notif);

    app.use('/auth', router);
}