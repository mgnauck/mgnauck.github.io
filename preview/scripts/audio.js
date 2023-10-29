"use strict";

let audio;
let audioLoaded = false;

function loadAudio(url)
{
  audioLoaded = false;

  // Load audio file
  audio = new Audio(url);

  // Event handler for audio loading complete
  audio.addEventListener("canplaythrough", (e) => {

    audioLoaded = true;
    console.log(`Audio ${url} loaded`);
  });
}

function playAudio()
{
  if(audioLoaded)
  {
    console.log("Playing audio");
    
  	audio.loop = false;
  	audio.play();
  }
  else
  {
  	alert("Audio file not fully loaded yet");
  }
}

function pauseAudio()
{
  audio.pause();
}
