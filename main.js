/*
  Here is a guide for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
var audioPlayer = document.querySelector("audio");
var searchForm = document.querySelector(".search-form");
var input = document.createElement("input");
searchForm.appendChild(input);
input.setAttribute("placeholder", "Search For Artist");
var submit = document.createElement("input");
searchForm.appendChild(submit);
submit.setAttribute("type", "submit");
// 2. Create your `onSubmit` event for getting the user's search term
searchForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
});
// console.log(input.value);

// 3. Create your `fetch` request that is called after a submission
const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
const URL = "https://api.soundcloud.com/users/"
const username = 

var usernames = [];
var userIds = [];
var userIdGen;

fetch(
  "https://api.soundcloud.com/users/mac-bizzle/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      usernames.push(data[i].user.username);
      userIds.push(data[i].user_id);
      if (input.value == usernames[i].value) {
        userIdGen = userIds[usernames.indexOf(usernames[i])];
        console.log(input.value);
        console.log(usernames[i]);
        console.log(userIdGen);
      } else {
        console.log("false");
        console.log(input.value);
      }
    }

    // console.log(usernames);
    // console.log(userIds);
  });

// 4. Create a way to append the fetch results to your page

// 5. Create a way to listen for a click that will play the song in the audio play
