const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
const URL_1 = "https://api.soundcloud.com/users/";
var audioPlayer = document.querySelector("audio");
var searchForm = document.querySelector(".search-form");
var resultsContainer = document.querySelector(".results");

searchForm.addEventListener("submit", getTracks);

function getTracks(evt) {
  evt.preventDefault();
  resultsContainer.innerHTML = "";
  var username = searchInput.value.replace(/\s+/g, "-").toLowerCase();

  var userId = "";
  fetch(URL_1 + username + "/" + API_KEY)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      fetch(URL_1 + data.id + "/tracks" + API_KEY)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var current_title;
          var titleSource;
          if (data.length) {
            for (var i = 0; i < data.length; i++) {
              var resultBox = document.createElement("div");
              var name = document.createElement("p");
              var artwork = document.createElement("img");
              var title = document.createElement("p");

              current_title = data[i].title;
              title.innerHTML = current_title;
              name.innerHTML = data[i].user.username;

              resultBox.setAttribute("class", "result-box");
              artwork.setAttribute("src", data[i].artwork_url);
              title.setAttribute("class", "each_track");
              title.setAttribute("id", data[i].stream_url);

              resultBox.appendChild(artwork);
              resultBox.appendChild(title);
              resultBox.appendChild(name);
              resultsContainer.appendChild(resultBox);
              titleSource = data[i].stream_url;
              searchInput.value = "";
            }
          }

          if (data.length) {
            var tracks = document.querySelectorAll(".each_track");

            for (var i = 0; i < tracks.length; i++) {
              tracks[i].addEventListener("click", function() {
                title.container = titleSource + API_KEY;
                audioPlayer.setAttribute("src", event.target.id + API_KEY);
              });
            }
          }
        });
    });
}
