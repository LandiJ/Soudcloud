const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models");

const port = process.envPORT || 4000;
const app = express();
const mustacheExpress = require("mustache-express");

const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";

app.engine("mustache", mustacheExpress());
app.set("views", "./public");
app.set("view engine", "mustache");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", express.static("./public"));

var song;

app.get("/favsongs", function(req, res) {
  console.log("HERE" + (song - 1));
  models.favsongs.findAll().then(function(songs) {
    res.render("favs", { artwork: songs, song: songs[song - 1] });
  });
});

app.post("/playFav", function(req, res) {
  song = req.body.something;
  res.redirect("/favsongs");
});

app.post("/favsongs", function(req, res) {
  //   console.log(req.body);

  console.log(req.body);
  var songInfo = models.favsongs.build({
    artist: req.body.user.username,
    stream_url: req.body.stream_url + API_KEY,
    artwork_url: req.body.artwork_url,
    description: req.body.title
  });
  console.log(songInfo);
  // songInfo.save;
  // console.log(songInfo);
  songInfo
    .save()
    .then(function(savedSong) {
      // res.send(savedTodo);
      console.log(savedSong);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });

  //   //   console.log(songInfo);
  //   // save record in database
});

app.listen(port, function() {
  console.log("server is running on", port);
});
