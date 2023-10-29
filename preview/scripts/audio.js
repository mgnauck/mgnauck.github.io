"use strict";

let audio;
let audioLoaded = true;
let audioPlaying = false;

function loadAudio(url)
{
  if(noAudio)
  {
    console.log("No audio option selected");
    return;
  }

  if(audioLoaded && audioPlaying)
  {
    pauseAudio();
  }

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
  if(noAudio)
  {
    return;  
  }
    
  if(audioLoaded && !audioPlaying)
  {
    console.log("Playing audio");
    
  	audio.loop = false;
  	audio.play();

    audioPlaying = true;
  }
}

function pauseAudio()
{
  if(noAudio)
  {
    return;  
  }
    
  if(audioPlaying)
  { 
    console.log("Stopping audio"); 

    audio.pause();
    audio.currentTime = 0;

    audioPlaying = false;
  }
}

function toggleAudio()
{
  if(audioPlaying)
  {
    pauseAudio();
  }
  else
  {
    playAudio();
  }
}
