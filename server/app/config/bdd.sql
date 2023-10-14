CREATE TABLE users(
   id INT auto_increment,
   name VARCHAR(50),
   mail VARCHAR(50) NOT NULL,
   password VARCHAR(100) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(mail)
);

CREATE TABLE organization(
   id INT auto_increment,
   name VARCHAR(50),
   mail VARCHAR(50),
   url_site VARCHAR(100),
   url_gofounding VARCHAR(100),
   banner TEXT,
   description TEXT,
   id_pined_video INT,
   nb_membres INT,
   PRIMARY KEY(id),
   UNIQUE(mail)
);

CREATE TABLE video(
   id INT auto_increment,
   name VARCHAR(50),
   description TEXT,
   id_org INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_org) REFERENCES organization(id)
);

CREATE TABLE game(
   id INT auto_increment,
   name VARCHAR(50),
   description TEXT,
   id_org INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_org) REFERENCES organization(id)
);

CREATE TABLE Theme(
   id VARCHAR(50),
   name VARCHAR(50),
   PRIMARY KEY(id)
);

CREATE TABLE game_theme(
   id_game INT,
   id_theme VARCHAR(50),
   PRIMARY KEY(id_game, id_theme),
   FOREIGN KEY(id_game) REFERENCES game(id),
   FOREIGN KEY(id_theme) REFERENCES Theme(id)
);

CREATE TABLE video_theme(
   id_video INT,
   id_theme VARCHAR(50),
   PRIMARY KEY(id_video, id_theme),
   FOREIGN KEY(id_video) REFERENCES video(id),
   FOREIGN KEY(id_theme) REFERENCES Theme(id)
);

CREATE TABLE organization_theme(
   id_org INT,
   id_theme VARCHAR(50),
   PRIMARY KEY(id_org, id_theme),
   FOREIGN KEY(id_org) REFERENCES organization(id),
   FOREIGN KEY(id_theme) REFERENCES Theme(id)
);

CREATE TABLE follow(
   id_user INT,
   id_org INT,
   subscribe BOOLEAN,
   PRIMARY KEY(id_user, id_org),
   FOREIGN KEY(id_user) REFERENCES users(id),
   FOREIGN KEY(id_org) REFERENCES organization(id)
);

CREATE TABLE own(
   id_user INT,
   id_org INT,
   PRIMARY KEY(id_user, id_org),
   FOREIGN KEY(id_user) REFERENCES users(id),
   FOREIGN KEY(id_org) REFERENCES organization(id)
);