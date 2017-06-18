/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
var audioPlayer = document.querySelector("audio");

var searchForm = document.querySelector(".search-form");
var input = document.createElement("input");
searchForm.appendChild(input);
input.setAttribute("placeholder", "Search For Artist");
var resultsContainer = document.querySelector(".results");

var submit = document.createElement("input");
searchForm.appendChild(submit);
submit.setAttribute("type", "submit");
// 2. Create your `onSubmit` event for getting the user's search term
searchForm.addEventListener("submit", function(evt) {
  evt.preventDefault();

  // console.log(input.value);

  // 3. Create your `fetch` request that is called after a submission
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
          }

          for (var i = 0; i < each_track.length; i++) {
            each_track[i].addEventListener("click", function() {
              title.container = titleSource + API_KEY;
              console.log(event.target.id);
              audioPlayer.setAttribute("src", event.target.id + API_KEY);

              // console.log(data[i].stream_url);

              // console.log(titleSource);
            });
          }
        });
    });
});

//   username = "";

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play
