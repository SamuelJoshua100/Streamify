const songs = [
  {
    name: "My Redeemer's Praise",
    link: "./aud/My Redeemer's Praise - Dunsin Oyekan.mp3",
    artists: "Dunsin Oyekan",
    image: "./imp/dunsin.jpg",
  },
  {
    name: "Omemma",
    link: "./aud/Omemma  _ Chandler Moore _ Live In Los Angeles (Official Music Video)(MP3_160K).mp3",
    artists: "Chandler Moore",
    image: "./imp/ommema.jpg",
  },
  {
    name: "If I Fall (Transformers One)",
    link: "./aud/transformers.mp3",
    artists: "TY Dolla",
    image: "./imp/transformers.jpeg",
  },
];

let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let playBtn = document.querySelector("#play");
let index = 0;
let img = document.querySelector("#thumb");
let title = document.querySelector("#title");
let artist = document.querySelector("#musician");
let start = document.querySelector("#start");
let end = document.querySelector("#end");
let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");

// Initialize player with the first song
title.innerHTML = songs[index].name;
artist.innerHTML = songs[index].artists;
img.src = songs[index].image;
song.src = songs[index].link;

// Update time and progress bar
song.onloadedmetadata = function () {
  progress.max = song.duration;
  updateTimes();
};

function updateTimes() {
  const interval = setInterval(() => {
    if (song.readyState > 0) {
      let curMin = Math.floor(song.currentTime / 60);
      let curSec = Math.floor(song.currentTime % 60);
      let min = Math.floor(song.duration / 60);
      let sec = Math.floor(song.duration % 60);

      start.innerHTML = `${curMin.toString().padStart(2, "0")}:${curSec
        .toString()
        .padStart(2, "0")}`;
      end.innerHTML = `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;

      progress.value = song.currentTime;

      if (song.currentTime === song.duration) {
        nextPlay();
      }
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

// Play or pause the song
function playPause() {
  if (song.paused) {
    song
      .play()
      .then(() => {
        playBtn.textContent = "||"; // Update button to pause
      })
      .catch((error) => {
        console.error("Playback failed:", error);
      });
  } else {
    song.pause();
    playBtn.textContent = "▶"; // Update button to play
  }
}

// Next song
function nextPlay() {
  index = (index + 1) % songs.length;
  loadSong();
  song.play();
  playBtn.textContent = "||"; // Update button to pause
}

// Previous song
function prevPlay() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong();
  song.play();
  playBtn.textContent = "||"; // Update button to pause
}

// Load song details
function loadSong() {
  song.src = songs[index].link;
  title.innerHTML = songs[index].name;
  artist.innerHTML = songs[index].artists;
  img.src = songs[index].image;
  progress.value = 0;
  song.onloadedmetadata = () => {
    progress.max = song.duration;
  };
}

// Seek in the song
progress.onchange = function () {
  song.currentTime = progress.value;
};

// Add event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
  playBtn.addEventListener("click", playPause);
  nextBtn.addEventListener("click", nextPlay);
  prevBtn.addEventListener("click", prevPlay);
});
