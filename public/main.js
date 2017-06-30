var audioPlayer = document.querySelector("audio");
var searchForm = document.querySelector(".search-form");
var input = document.createElement("input");
var resultsContainer = document.querySelector(".results");
var tracks;
searchForm.appendChild(input);
input.setAttribute("placeholder", "Search For Artist");

var submit = document.createElement("input");
searchForm.appendChild(submit);
submit.setAttribute("type", "submit");
submit.setAttribute("class", "submit");

searchForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  resultsContainer.innerHTML = "";

  const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
  const URL_1 = "https://api.soundcloud.com/users/";
  var username = input.value.replace(/\s+/g, "-").toLowerCase();
  console.log(username);

  var usernames = [];
  var userId = "";

  fetch(URL_1 + username + "/" + API_KEY)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      fetch(URL_1 + data.id.toString() + "/tracks" + API_KEY)
        .then(function(response) {
          return response.json();
        })
        .then(function(tracksData) {
          tracks = tracksData;
          console.log(tracks);
          var current_title;
          var titleSource;
          var each_track;
          for (var i = 0; i < tracks.length; i++) {
            var resultBox = document.createElement("div");
            var name = document.createElement("p");
            var artwork = document.createElement("img");
            var title = document.createElement("p");
            // create and add an "add fave" button
            // add an event listener that posts/sends the track to the server with addFav function
            var addFavButton = document.createElement("button");
            addFavButton.id = i;
            addFavButton.classList.add("favButton");
            addFavButton.textContent = "Add Fav";
            addFavButton.addEventListener("click", addFavSong);

            var each_track = document.querySelectorAll(".each_track");

            current_title = tracks[i].title;
            console.log(current_title);

            title.innerHTML = current_title;
            name.innerHTML = tracks[i].user.username;

            resultBox.setAttribute("class", "result-box");
            artwork.setAttribute("src", tracks[i].artwork_url);
            title.setAttribute("class", "each_track");
            title.setAttribute("id", tracks[i].stream_url);

            resultBox.appendChild(artwork);

            resultBox.appendChild(title);
            resultBox.appendChild(name);
            resultBox.appendChild(addFavButton);
            resultsContainer.appendChild(resultBox);
            titleSource = tracks[i].stream_url;
            input.value = "";
          }

          for (var i = 0; i < each_track.length; i++) {
            each_track[i].addEventListener("click", function() {
              title.container = titleSource + API_KEY;
              console.log(event.target.id);
              audioPlayer.setAttribute("src", event.target.id + API_KEY);
            });
          }
        });
    });
});

function addFavSong(event) {
  console.log("LOOK HERE", event.target);
  event.target.disabled = true;
  var index = event.target.id;
  var trackData = tracks[index];
  axios.post("/favsongs", trackData).then(function(addedSong) {
    return addedSong.data;
  });
}
