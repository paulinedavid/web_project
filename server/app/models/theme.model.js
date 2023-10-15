const sql = require("./db.js");


// constructor
const Theme = function (theme) {
    this.id = theme.id;
    this.name = theme.name;
};

Theme.create = (newTheme, result) => {
    //insertion du nouveau livre dans la base de données
    sql.query(
        "INSERT INTO Theme (name) VALUES (?);" [newTheme.name],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("create Theme: ", {
          name : newTheme.name,
        });
        result(null, { message: "Theme added successfully" });
      }
    );
}

// fonction pour récupérer les themes 
Theme.getAll = result => {
    sql.query("SELECT * FROM Theme", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        //console.log("Themes: ", res);
        console.log("Theme.getAll")
        result(null, res);
    });
};

module.exports = Theme