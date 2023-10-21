const sql = require("./db.js");
const bcrypt = require("bcrypt");

// constructor
const User = function (user) {
  this.name = user.name;
  this.mail = user.mail;
  this.password = user.password;
};

User.create = (newuser, result) => {
  sql.query(
    "SELECT * FROM users WHERE mail = ?",
    [newuser.mail],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (rows.length > 0) {
        const errorMessage = "Email already exists";
        console.log(errorMessage);
        result(errorMessage, null);
        return;
      }

      bcrypt.hash(newuser.password, 10, (err, hashedPassword) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        } else {
          const hashedmdp = hashedPassword;

          sql.query(
            "INSERT INTO users (name, mail, password) VALUES (?,?,?)",
            [newuser.name, newuser.mail, hashedmdp],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              console.log("created user: ", {
                email: newuser.name,
                pseudo: newuser.mail,
              });
              result(null, { message: "User added successfully" });
            }
          );
        }
      });
    }
  );
};

User.login = (req, result) => {
  const mail = req.body.mail;
  const password = req.body.password;

  sql.query("SELECT * FROM users WHERE mail = ?", [mail], (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (rows.length === 0) {
      const errorMessage = "Email not registered";
      console.log(errorMessage);
      result(errorMessage, null);
      return;
    }

    const user = rows[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (isMatch) {
        result(null, user);
      } else {
        const errorMessage = "Wrong password";
        console.log(errorMessage);
        result(errorMessage, null);
      }
    });
  });
};

User.exists = (req, result) => {
  const mail = req.body.mail;

  sql.query("SELECT * FROM users WHERE mail = ?", [mail], (err, rows) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (rows.length === 0) {
      const errorMessage = "User not registered";
      console.log(errorMessage);
      result(errorMessage, null);
      return;
    }

    result(null, { message: "User found." });
    return;
  });
};

User.change_password = (req, result) => {
  console.log(req.body);
  const email = req.body.mail;
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;
  console.log(oldpassword);

  sql.query(
    "SELECT * FROM users WHERE mail = ?",
    [email],
    (err, rows) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (rows.length === 0) {
        const errorMessage = "Email not registered";
        console.log(errorMessage);
        result(errorMessage, null);
        return;
      }

      const user = rows[0];

      bcrypt.compare(oldpassword, user.password, (err, isMatch) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (isMatch) {
          bcrypt.hash(newpassword, 10, (err, hashedNewPassword) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            } else {
              sql.query(
                "UPDATE users SET password = ? WHERE mail = ?",
                [hashedNewPassword, email],
                (err, rows) => {
                  if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                  }
                  result(null, { message: "Password updated successfully" });
                  return;
                }
              );
            }
          });
        } else {
          const errorMessage = "Wrong password";
          console.log(errorMessage);
          result(errorMessage, null);
        }
      });
    }
  );
};

  // sql.query(
  //   "select * from Admin where email_admin = ?",
  //   [email],
  //   (err, rows) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(err, null);
  //       return;
  //     }

  //     if (rows.length === 0) {
  //       // User is not in admin table
  //       result(null, false);
  //       return;
  //     } else {
  //       // User is in admin table
  //       result(null, true);
  //       return;
  //     }
  //   })


User.get = (userInfo, result) => {
  sql.query(
    "SELECT * FROM users WHERE mail = ?",
<<<<<<< HEAD
    [userInfo.email_user],
=======
    [userInfo.mail],
>>>>>>> 3d2ffefcdd977053c70535fa64b53719fa780fc7
    (err, rows) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
      } else {
        if (rows.length === 0) {
          result(null, null);
        } else {
          const user = rows[0];
          result(null, { mail: user.mail, name: user.name });
        }
      }
    }
  );
};

module.exports = User;
