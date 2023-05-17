/*
  This program is a basic playlist analyzer that allows a user to enter a playlist name as well as each song name, duration, and genre separately.
  It then analyzes each song added to the list and displays the following:
    - Playlist Name
    - Total Playlist Duration
    - Shortest Song
    - Longest Song
    - Most Common Genre
  
  Created by Tanner Heimsch
  Programming Fundamentals Final Project 2023

  ------------
  Expanded Coding Sources:

    Dealing with timeframe conversions and comparisons:
      https://stackoverflow.com/questions/74188161/how-to-calculate-timeframes-using-24-hour-time

    Dealing with split() in the context of an array:
      https://stackoverflow.com/questions/2555794/how-to-use-split
    
    Using parseInt() instead of Number()
      https://stackoverflow.com/questions/4090518/what-is-the-difference-between-parseint-and-number
    
    Padding output variables with 0 if needed:
      https://stackoverflow.com/a/8513064
   ------------
*/

// Determine total playlist duration
function calculateTotalDuration(songDurationList) {
  var totalDuration = 0;

  // Iterate over song durations and calculate total duration in seconds
  for (var i = 0; i < songDurationList.length; i++) {
    var durationParts = songDurationList[i].split(":");
    var minutes = parseInt(durationParts[0], 10);
    var seconds = parseInt(durationParts[1], 10); 
    totalDuration += minutes * 60 + seconds;
  }

  // Convert inputted duration to MM:SS
  var totalMinutes = Math.floor(totalDuration / 60);
  var totalSeconds = totalDuration % 60;

  return padZero(totalMinutes) + ":" + padZero(totalSeconds);
}

// Determine shortest and longest song durations, names, and genres
function findSongDurations(songDurationList, songNameList, songGenreList) {
  var shortestDuration = Number.MAX_VALUE;
  var shortestSongIndex = -1;
  var longestDuration = 0;
  var longestSongIndex = -1;

  // Iterate over song durations, convert to seconds, and find the shortest and longest songs by comparing durations
  for (var i = 0; i < songDurationList.length; i++) {
    var durationParts = songDurationList[i].split(":");
    var minutes = parseInt(durationParts[0], 10);
    var seconds = parseInt(durationParts[1], 10);
    var songDurationInSeconds = minutes * 60 + seconds;

    // Update the shortest song
    if (songDurationInSeconds < shortestDuration) {
      shortestDuration = songDurationInSeconds;
      shortestSongIndex = i;
    }

    // Update the longest song
    if (songDurationInSeconds > longestDuration) {
      longestDuration = songDurationInSeconds;
      longestSongIndex = i;
    }
  }

  // Extract shortest song name, duration components, and genre
  var shortestSongName = songNameList[shortestSongIndex];
  var shortestSongMinutes = Math.floor(shortestDuration / 60);
  var shortestSongSeconds = shortestDuration % 60;
  var shortestSongGenre = songGenreList[shortestSongIndex];

  // Extract longest song name, duration components, and genre
  var longestSongName = songNameList[longestSongIndex];
  var longestSongMinutes = Math.floor(longestDuration / 60);
  var longestSongSeconds = longestDuration % 60;
  var longestSongGenre = songGenreList[longestSongIndex];

  return {
    shortestSongName: shortestSongName,
    formattedShortestSongDuration: padZero(shortestSongMinutes) + ":" + padZero(shortestSongSeconds),
    shortestSongGenre: shortestSongGenre,
    longestSongName: longestSongName,
    formattedLongestSongDuration: padZero(longestSongMinutes) + ":" + padZero(longestSongSeconds),
    longestSongGenre: longestSongGenre,
  };
}

// Determine the most common genre in the playlist
function findMostCommonGenre(songGenreList) {
  var genreCount = {};
  var mostCommonGenre = "";
  var maxCount = 0;

  // Count the occurrences of each genre
  for (var i = 0; i < songGenreList.length; i++) {
    var genre = songGenreList[i];
    if (genreCount[genre]) {
      genreCount[genre]++;
    } else {
      genreCount[genre] = 1;
    }
  }

  // Find the genre with the highest count
  for (var genre in genreCount) {
    if (genreCount[genre] > maxCount) {
      mostCommonGenre = genre;
      maxCount = genreCount[genre];
    }
  }

  return mostCommonGenre;
}
// Add zeroes to output variables inside functions if necessary
function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

// Read inputs from website and check if all parameters are entered, call other functions, and display final output
function analyzerResults() {
  var analyzerForm = document.getElementById("playlist_analyzer");

  analyzerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Input variables read from website
    var playlistName = document.getElementById("playlistName");
    var songName = document.getElementsByClassName("songName");
    var songDuration = document.getElementsByClassName("songDuration");
    var songGenre = document.getElementsByClassName("songGenre");
    var emptyFieldFound = false;

    // Defensive checks to make sure user enters all parameters
    if (playlistName.value === "") {
      alert("Please enter a playlist name.");
    } // Check if playlist name is empty and alert if it is

    else {
      for (var i = 0; i < songName.length; i++) {
        if (songName[i].value === "" || songDuration[i].value === "" || songGenre[i].value === "") {
          emptyFieldFound = true;
          break;
        }
      }
     
      if (emptyFieldFound) {
        alert("Please enter all song details.");
      }
      // If any other field is empty, show an alert
      
      // Otherwise, create separate arrays to store respective user inputs
      else {
        var songNameList = [];
        var songDurationList = [];
        var songGenreList = [];
        for (var i = 0; i < songName.length; i++) {
          var name = songName[i].value;
          var duration = songDuration[i].value;
          var genre = songGenre[i].value;

          songNameList.push(name);
          songDurationList.push(duration);
          songGenreList.push(genre);
        }

        // Output variables
        var formattedTotalDuration = calculateTotalDuration(songDurationList);
        var songInfo = findSongDurations(songDurationList, songNameList, songGenreList);
        var mostCommonGenre = findMostCommonGenre(songGenreList);

        // Output message defined
        var outputMessage =
          "<b>Playlist Name:</b> " + playlistName.value + "<br>" +
          "<b>Playlist Duration:</b> " + formattedTotalDuration + "<br>" +
          "<b>Shortest Song:</b> " + songInfo.shortestSongName + " (" + songInfo.formattedShortestSongDuration + ") - <i>" + songInfo.shortestSongGenre + "</i> <br>" +
          "<b>Longest Song:</b> " + songInfo.longestSongName + " (" + songInfo.formattedLongestSongDuration + ") - <i>" + songInfo.longestSongGenre + "</i> <br>" +
          "<b>Most Common Genre:</b> " + mostCommonGenre;

        // Output to website
        alert("Playlist analyzed. You have great taste!");
        var outputArea = document.getElementById("output");
        outputArea.innerHTML = outputMessage;
      }
    }
  });
}

analyzerResults();