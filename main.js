var audioPlayer = document.querySelector("audio");

var searchForm = document.querySelector(".search-form");
var input = document.createElement("input");
searchForm.appendChild(input);
input.setAttribute("placeholder", "Search For Artist");
var resultsContainer = document.querySelector(".results");

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
      console.log(data);
      userId = data.id;
      console.log(userId);
    })
    .then(function() {
      fetch(URL_1 + userId.toString() + "/tracks" + API_KEY)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          var current_title;
          var titleSource;
          var each_track;
          for (var i = 0; i < data.length; i++) {
            var resultBox = document.createElement("div");
            var name = document.createElement("p");
            var artwork = document.createElement("img");
            var title = document.createElement("p");
            var each_track = document.querySelectorAll(".each_track");

            current_title = data[i].title;
            console.log(current_title);

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
