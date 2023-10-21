const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const emailController = require("./email.controller.js");
var jwt = require('jsonwebtoken'); // Importation de la librairie pour générer les jwt
const Email = require("../models/email.model.js");
const sql = require("../models/db.js");

exports.register = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  console.log(req.body.mail);

  User.exists(req, (err, result) => {
    if (err){

      const payload = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      };

    const secretKey = 'mastercampmdp'; // secret key to encrypt the token

    const options = {
      expiresIn: '1 hour', // Set the token expiration time
    };

    const token = jwt.sign(payload, secretKey, options);

    //const resetLink = `http://129.151.226.75:8081/reset-password-page?token=${token}`;
    const resetLink = `http://localhost:8081/register-page?token=${token}`;

    const email = new Email({
      to: req.body.mail,
      subject: "Welcome to Togethearth",
      template: "email-body-create-user",
      context: {
        link: resetLink
      },
      attachments: [{
        filename: "LogoJour.png",
        path: "LogoJour.png",
        cid: "image_cid"
      }]
    });

    Email.send(email, (result) => {
      if (!result) {
        // Error occurred during sending the email
        console.error("Error sending email:", error);
        res.status(500).json({ message: "An error occurred while sending the email!" });
      } else {
        // Email sent successfully
        console.log("Email sent successfully:", result);
        const decoded = this.verifyResetToken(token);
        if (!decoded) {
          console.log("failed to decode");
        } else {
          console.log(decoded);
        }
        console.log(token);
        res.status(200).json({ message: "Email was sent." });
      }
    });
  } 
  else {
    return res.status(409).json({ message: "Email address already used." });
    }
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.query) {
    res.status(400).send({
      message: "Content can not be empty !"
    });
  }

  const token = req.query.token;
  const decoded = this.verifyResetToken(token);
  console.log(decoded)
  
  if(decoded){
    // Create a user
    const user = new User({
      name: decoded.name,
      mail: decoded.mail,
      password: decoded.password
    });
  
    console.log("User created !");
    console.log(user);
  
  
    // Save the user in the database
    User.create(user, (err, data) => {
      if (err)
        if (err === "Email already exists") {
          return res.status(409).json({ message: err });
        } else {
          res.status(500).send({
            message: err.message || "Some error ",
          });
        }
      else {
        res.json({
          message: "User added successfully",
          mail: user.mail,
          name: user.name,
        });
      }
    });
  }
};

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  User.login(req, (err, data) => {
    if (err)
      if (err === "Wrong password" || err === "Email not registered") {
        return res.status(409).json({ message: err });
      } else {
        res.status(500).send({
          message: err.message || "Some error ",
        });
      }
    else {
      const token = jwt.sign({ mail: req.body.mail }, "togethearthmdp");
      console.log(token);
      console.log("Login successful !");
      res.json({ token: token, mail: req.body.mail, name: data.name });
    }
  });
};

exports.forgot_password = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  console.log(req.body.mail);

  User.exists(req, (err, result) => {
    if (err) {
      if (err === "User not registered") {
        res.status(409).json({ message: err });
      } else {
        res.status(500).send({
          message: err.message || "Some error ",
        });
      }
    }
    else {

      console.log("User exists ! Sending mail...");

      const payload = {
        mail: req.body.mail,
      };

      const secretKey = 'mastercampmdp'; // secret key to encrypt the token

      const options = {
        expiresIn: '1 hour', // Set the token expiration time
      };

      const token = jwt.sign(payload, secretKey, options);

      //const resetLink = `http://129.151.226.75:8081/reset-password-page?token=${token}`;
      const resetLink = `http://localhost:8081/reset-password-page?token=${token}`;

      const email = new Email({
        to: req.body.mail,
        subject: "Reset Password Togethearth",
        template: "email-reset-password",
        context: {
          link: resetLink
        },
        attachments: [{
          filename: "LogoJour.png",
          path: "LogoJour.png",
          cid: "image_cid"
        }]
      });

      sql.query("INSERT INTO reset_tokens (token, email_user) VALUES (?,?)", [token, req.body.mail], (error, results) => {
        if (error) {
          console.error("Error storing token in the database:", error);
          res.status(500).json({ message: "An error occurred while storing the token!" });
        } else {
          // Token stored successfully
          console.log("Token stored successfully in the database.");

          Email.send(email, (result) => {
            if (!result) {
              // Error occurred during sending the email
              console.error("Error sending email:", error);
              res.status(500).json({ message: "An error occurred while sending the email!" });
            } else {
              // Email sent successfully
              console.log("Email sent successfully:", result);
              const decoded = this.verifyResetToken(token);
              if (!decoded) {
                console.log("failed to decode");
              } else {
                console.log(decoded);
              }
              console.log(token);
              res.status(200).json({ message: "Email was sent." });
            }
          });

        }
      });

    }
  });

};



exports.verif_token = (req, res) => {
  console.log(req.query);
  const token = req.query.token;
  console.log("mytoken ", token);
  const decoded = this.verifyResetToken(token);
  console.log("here");
  if (!decoded) {
    // Token verification failed, handle accordingly (e.g., show error page)
    console.log("failed");
    // return res.status(400).json({ error: 'Invalid or expired reset token' });
    // const redirectLink = `http://129.151.226.75:8081/reset-password`;
    const redirectLink = `http://localhost:8081/reset-password`;
    res.redirect(redirectLink);
  }
  // Token is valid, render the password reset page
  console.log(decoded);
  res.json({ mail: decoded.mail });
}

exports.verifyResetToken = (token) => {
  try {
    const secretKey = 'mastercampmdp';
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

exports.verifyUserToken = (token) => {
  try {
    const secretKey = 'togethearthmdp';
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};


exports.extract_email = (req, res) => {
  const token = req.query.token;
  console.log(token);
  const decoded = verifyResetToken(token);
  console.log("here");
  if (!decoded) {
    // Token verification failed, handle accordingly (e.g., show error page)
    console.log("failed");
    return res.status(400).json({ error: 'Invalid or expired reset token' });
  }
  res.json({ email: decoded.email });
}

exports.verifyuserToken = (token) => {
  try {
    const secretKey = 'togethearthmdp';
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

exports.get_mail_name = (req, res) => {
  const token = req.query.token;
  console.log(token);
  const decoded = verifyuserToken(token);
  console.log("here");
  if (!decoded) {
    // Token verification failed, handle accordingly (e.g., show error page)
    console.log("failed");
    return res.status(400).json({ error: 'Invalid or expired reset token' });
  }
  
  console.log(decoded);

  const mail = decoded.mail;

  console.log(mail);
  
  // Call User.get with the extracted email
  User.get({ mail: mail }, (err, userData) => {
    if (err) {
      // Handle the error (e.g., return an error response)
      return res.status(500).json({ error: 'An error occurred while fetching user data' });
    }

    if (!userData) {
      // Handle the case where the user was not found (e.g., return a 404 response)
      return res.status(404).json({ error: 'User not found' });
    }

    // User data found, send the email and name in the response
    return res.json({ mail: userData.mail, name: userData.name });
  });
}


exports.reset_password = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  console.log(req.body.mail);

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      const hashedmdp = hashedPassword;
      sql.query("UPDATE users SET password = ? WHERE mail = ?", [hashedmdp, req.body.mail], (err, data) => {
        if (err)
          if (err === "User not found") {
            return res.status(409).json({ message: err });
          } else {
            res.status(500).send({
              message: err.message || "Some error ",
            });
          }
        else {
          console.log("successful !")
          console.log(req.body.password);
          res.json({ message: "Password updated successfully" });
        }
      });
    }
  });
};


exports.change_password = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty !",
    });
  }

  User.change_password(req, (err, data) => {
    if (err)
      if (err === "Wrong password") {
        return res.status(409).json({ message: err });
      } else {
        res.status(500).send({
          message: err.message || "Some error ",
        });
      }
    else {
      res.json({
        message: "Password updated successfully"
      });
    }
  })
}

exports.updateProfile = (req, res) => {
  if (req.body.mail_old === undefined || (req.body.mail === undefined && req.body.name === undefined)) {
    res.status(400).json({ message: "Body cannot be empty!" });
    return;
  }

  // Pas d'erreur, on modifie les données
  var mail = req.body.mail;
  var mail_query = "";
  var name = req.body.name;
  var name_query = "";
  var mail_old = req.body.mail_old;
  var query_args = []
  var args = []

  if (mail !== undefined && mail.trim() != "") {
    mail_query = "email_user = ?";
    query_args.push(mail_query);
    args.push(email_user);
  }
  if (pseudo !== undefined && pseudo.trim() != "") {
    pseudo_query = "pseudo = ?";
    query_args.push(pseudo_query);
    args.push(pseudo);
  }

  args.push(email_user_old);

  var query = "UPDATE User SET " + query_args.join(', ') + " WHERE mail = ?";
  console.log(query);
  console.log(args);

  sql.execute(query, args, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    newUserData = {}
    if (query_args.includes(email_user_query)) newUserData['email_user'] = email_user
    if (query_args.includes(pseudo)) newUserData['pseudo'] = pseudo

    res.status(200).json({ message: "Updated user!", userData: newUserData });
  })
};

exports.isAdmin = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  User.isAdmin(req, (error, result) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ isAdmin: result });
    }
  });
};