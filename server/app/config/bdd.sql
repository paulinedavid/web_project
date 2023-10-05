CREATE TABLE users(
   id INT auto_increment,
   name VARCHAR(50),
   mail VARCHAR(50) NOT NULL,
   password VARCHAR(100) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(mail)
);

CREATE TABLE organization(
   id INT,
   name VARCHAR(50),
   mail VARCHAR(50),
   url_site VARCHAR(100),
   url_gofounding VARCHAR(100),
   banner TEXT,
   description TEXT,
   id_pined_video INT,
   nb_menbres INT,
   PRIMARY KEY(id),
   UNIQUE(mail)
);

CREATE TABLE video(
   id INT,
   name VARCHAR(50),
   description TEXT,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES organization(id)
);

CREATE TABLE game(
   id INT,
   name VARCHAR(50),
   description TEXT,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES organization(id)
);

CREATE TABLE Theme(
   id VARCHAR(50),
   name VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE game_theme(
   id INT,
   id_1 VARCHAR(50),
   PRIMARY KEY(id, id_1),
   FOREIGN KEY(id) REFERENCES game(id),
   FOREIGN KEY(id_1) REFERENCES Theme(id)
);

CREATE TABLE video_theme(
   id INT,
   id_1 VARCHAR(50),
   PRIMARY KEY(id, id_1),
   FOREIGN KEY(id) REFERENCES video(id),
   FOREIGN KEY(id_1) REFERENCES Theme(id)
);

CREATE TABLE asso_theme(
   id INT,
   id_1 VARCHAR(50),
   PRIMARY KEY(id, id_1),
   FOREIGN KEY(id) REFERENCES organization(id),
   FOREIGN KEY(id_1) REFERENCES Theme(id)
);

CREATE TABLE follow(
   id INT,
   id_1 INT,
   subscribe BOOLEAN,
   PRIMARY KEY(id, id_1),
   FOREIGN KEY(id) REFERENCES users(id),
   FOREIGN KEY(id_1) REFERENCES organization(id)
);

CREATE TABLE own(
   id INT,
   id_1 INT,
   PRIMARY KEY(id, id_1),
   FOREIGN KEY(id) REFERENCES users(id),
   FOREIGN KEY(id_1) REFERENCES organization(id)
);