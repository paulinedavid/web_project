const sql = require("./db.js");



// constructeur et structure de l'objet Video
const Video = function (video) {
  this.id = video.id;
  this.name = video.name;
  this.description = video.description;
  this.themes = video.themes;
  this.id_org = video.id_org;
};

// fonction pour créer une nouvelle video
Video.create = (newVideo, result) => {
  sql.query("INSERT INTO video(name,description,id_org) VALUES(?,?,?); ?", [newVideo.name,newVideo.description,newVideo.id_org], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return; 
    }

    // ajout des themes dans la table video_theme
    newVideo.themes.forEach((theme) => {
      sql.query("INSERT INTO video_theme(id_video,id_theme) VALUES(?,?); ?", [res.insertId,theme], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return; 
        }
      });
    });
    
    console.log("created video: ", { id: res.insertId, ...newVideo });
    result(null, { id: res.insertId, ...newVideo });
  });
};

// fonction pour récupérer les videos par filtre
Video.getFiltered = (filterQuerry, result) => {
  //console.log(filterQuerry);
  sql.query(filterQuerry, (err, resVideos) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    let myVideos = [];
    if (resVideos.length > 0) {
      resVideos.forEach(video => {
        video.themes = [];
        sql.query("SELECT name FROM video_theme JOIN Theme ON video_theme.id_theme = Theme.id WHERE id_video = ?", [video.id], (err, resThemes) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          resThemes.forEach(theme => {
            video.themes.push(theme);
          });
          myVideos.push(video);
          if (myVideos.length == resVideos.length) {
            
            result(null, myVideos);
            //console.log(JSON.stringify(myVideos))
          }
        })
      });
    }
    else {
      result(null, resVideos);
    }


  });
}


module.exports = Video