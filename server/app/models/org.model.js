const sql = require("./db.js");

// constructor
const Organization = function (organization){
    this.id = organization.id;
    this.name = organization.name;
    this.mail = organization.mail;
    this.url_site = organization.url_site;
    this.url_gofounding = organization.url_gofounding;
    this.banner = organization.banner;
    this.description = organization.description;
    this.id_pined_video = organization.id_pined_video;
    this.id_pined_game = organization.id_pined_game;
    this.nb_membres = organization.nb_membres;
    this.themes = organization.themes;
    this.owners = organization.owners;
};

Organization.create = (newOrg, result) => {
    sql.query("INSERT INTO organization (name, mail, url_site, url_gofounding, banner, description, id_pined_video, id_pined_game, nb_membres) VALUES (?,?,?,?,?,?,?,?,?)", [newOrg.name, newOrg.mail, newOrg.url_site, newOrg.url_gofounding, newOrg.banner, newOrg.description, newOrg.id_pined_video, newOrg.id_pined_video, newOrg.nb_membres],(err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created organization: ", {id: res.insertId, ...newOrg});
        if (newOrg.themes){
            newOrg.themes.forEach(theme =>{
                sql.query("INSERT INTO organization_theme (id_org, id_theme) VALUES (?,?)", [res.insertId, theme], (err, res) => {
                    if(err){
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                });
            })
        }
        if (newOrg.owners){
            newOrg.owners.forEach(owner =>{
                sql.query("INSERT INTO own (id_org, id_user) VALUES (?,?)", [res.insertId, owner], (err, res) => {
                    if(err){
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                });
            })
        }
        result(null, {id: res.insertId, ...newOrg});
    });
};
Organization.findById = (orgID, result) => {
    //console.log(orgID);
    sql.query(`SELECT * FROM organization WHERE id = ${orgID}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else if(res.length){
            const organization = new Organization(res[0]);
            sql.query("SELECT name FROM organization_theme JOIN Theme ON organization_theme.id_theme = Theme.id WHERE id_org = ?", [orgID], (err, resThemes) => {
                if(err){
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }else{
                    organization.themes = resThemes;
                    sql.query("SELECT id_user FROM own WHERE id_org = ?", [orgID], (err, resOwners) => {
                        if(err){
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        else{
                            organization.owners = resOwners;
                            //console.log("Organization FindById: ",organization);
                            result(null, organization);
                            return;
                        }
                    });
                }
            });
        }
        else{
            console.log("Organization not found");
            result({kind: "not_found"}, null);
            return;
        }
    });
}

Organization.getAll = result => {
    sql.query("SELECT * FROM organization", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("organization: ", res);
        result(null, res);
    });
};

Organization.getFiltered = (filterQuery, result) => {
    sql.query( filterQuery, (error, resOrgs) => {
        if(error){
            console.log("error: ", error);
            result(null, error);
            return;
        }
        let myOrgs = [];
        if(resOrgs.length > 0){
            resOrgs.forEach(org => {
                org.themes = [];
                sql.query("SELECT name FROM organization_theme JOIN Theme ON organization_theme.id_theme = Theme.id WHERE id_org = ?", [org.id], (err, resThemes) => {
                    if(err){
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                    resThemes.forEach(theme => {
                        org.themes.push(theme);
                    });
                    myOrgs.push(org);
                    if(myOrgs.length == resOrgs.length){
                        result(null, myOrgs);
                    }
                })
            });
        }
        else{
            result(null, resOrgs);
        }
    })
}
Organization.subscribe = (mail,id_org,result) => {
    sql.query("INSERT INTO follow (id_user, id_org) VALUES ((SELECT id FROM users WHERE mail = ?),?)", [mail,id_org], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, true);
        return;
    });
}
Organization.unsubscribe = (mail,id_org,result) => {
    sql.query("DELETE FROM follow WHERE id_user = (SELECT id FROM users WHERE mail = ?) AND id_org = ?", [mail,id_org], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, true);
        return;
    });
}
Organization.isSubscribed = (mail,id_org,result) => {
    sql.query("SELECT * FROM follow JOIN users WHERE id_user = id AND mail = ? AND id_org = ?", [mail,id_org], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            result(null, true);
            return;
        }
        else{
            result(null, false);
            return;
        }
    });
}

module.exports = Organization;