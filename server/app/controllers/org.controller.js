const {verifyuserToken} = require("../controllers/user.controller");
const Organization = require("../models/org.model");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else{
        var organization = req.body;
        if(!organization.name || !organization.mail || !organization.url_site || 
            !organization.url_gofounding || !organization.banner || !organization.description ||
            !organization.id_pined_video || !organization.nb_membres || !organization.themes || 
            !organization.owners)
        {
            res.status(400).send({
                message: "Wrong format. Required : {name:'', mail:'', url_site:'', url_gofounding:'', banner:'', description:'', id_pined_video:, nb_membres:, themes:[], owners[] } "
            });
        }
        else{
            // Save organization in the database
            Organization.create(organization, (err, data) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occured while creating the organization"
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
        var filterQuery = "SELECT * FROM organization ";
        var filter = false;
        if(filters.name){
            filterQuery += "WHERE name LIKE '%"+filters.name+"%' ";
            filter = true;
        }
        if(filters.themes){
            if(filter){
                filterQuery += "AND ";
            }
            else{
                filterQuery += "WHERE ";
            }
            filterQuery += "id IN (SELECT id_org FROM organization_theme WHERE id_theme IN ( "
            filters.themes.forEach(theme => {
                filterQuery += theme.id + ",";
            });
            filterQuery = filterQuery.slice(0,-1);
            filterQuery += "))";
            filter = true;
        }
        if(filters.owners){
            if(filter){
                filterQuery += "AND ";
            }
            else{
                filterQuery += "WHERE ";
            }
            filterQuery += "id IN (SELECT id_org FROM own WHERE id_user IN ( "
            filters.owners.forEach(owner => {
                filterQuery += owner.id + ",";
            });
            filterQuery = filterQuery.slice(0,-1);
            filterQuery += "))";
            filter = true;
        }
        if(filters.joined == "true"){
            
            const decoded = verifyuserToken(filters.token);
            const mail = decoded.mail
        
            if(filter){
                filterQuery += "AND ";
            }
            else{
                filterQuery += "WHERE ";
            }
            filterQuery += "id IN (SELECT id_org FROM follow JOIN users WHERE id_user = id AND mail = '"+mail+"')";
            filter = true;
            
        }

        //console.log("Query: "+filterQuery)
        Organization.getFiltered(filterQuery, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occured while getting the organizations"
                });
            else {
                console.log("organization.getFiltered")
                res.send(data)
            };
        });
        
    }
}

exports.getAll = (req,res) => {
    Organization.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occured while getting the organizations"
            });
        else {
            console.log("Organization.getAll")
            res.send(data);
        }
    });
}
exports.findById = (req,res) => {
    if (!req.query){
        console.log("Content can not be empty !")
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else if (!req.query.org_id){
        var error = JSON.stringify(req.query)+" Wrong format. Required : {org_id:}"
        console.log(error)
        res.status(400).send({
            message: error
        });
    }
    else if (!req.query.token){
        var error = JSON.stringify(req.query)+" Wrong format. Required : {org_id:, token:}"
        console.log(error)
        res.status(400).send({
            message: error
        });          
    }
    else{
        var org_id = req.query.org_id;
        Organization.findById(org_id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: "Organization not found with id " + org_id
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving organization with id " + org_id
                    });
                }
            } else{
                var mail = verifyuserToken(req.query.token).mail;
                Organization.isSubscribed(mail, org_id, (err, isSubscribed) => {
                    if (err){
                        res.status(500).send({
                            message: err.message || "Some error occured while getting the organizations"
                        });
                    }
                    else{
                        res.send({isSubsribed:isSubscribed>0?true:false,...data});
                    } 
                });
            } 
        });
    }
}

exports.subscribe = (req,res) => {
    if (!req.body){
        console.log("Content can not be empty !")
        res.status(400).send({
            message: "Content can not be empty !"
        });
    }
    else if (!req.body.org_id){
        var error = JSON.stringify(req.body)+" Wrong format. Required : {org_id:}"
        console.log(error)
        res.status(400).send({
            message: error
        });

    }
    else if (!req.body.token){
        var error = JSON.stringify(req.body)+" Wrong format. Required : {org_id:, token:}"
        console.log(error)
        res.status(400).send({
            message: error
        });          
    }
    else{
        var org_id = req.body.org_id;
        var mail = verifyuserToken(req.body.token).mail;
        Organization.isSubscribed(mail, org_id, (err, data) => {
            if (err){
                res.status(500).send({
                    message: err.message || "Some error occured while getting the organizations"
                });
            }
            else if(data){
                Organization.unsubscribe(mail, org_id, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: "Organization not found with id " + org_id
                            });
                        } else {
                            res.status(500).send({
                                message: "Error retrieving organization with id " + org_id
                            });
                        }
                    } else{
                        res.send(false);
                    } 
                })
            }
            else{
                Organization.subscribe(mail, org_id, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: "Organization not found with id " + org_id
                            });
                        } else {
                            res.status(500).send({
                                message: "Error retrieving organization with id " + org_id
                            });
                        }
                    } else{
                        res.send(true);
                    } 
                });
            } 
        })
    }
}





