let audio;
let audioLoaded = false;

function loadAudio(resource)
{
  audioLoaded = false;
  audio = new Audio(resource);
}

function playAudio()
{
  if(audioLoaded)
  {
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