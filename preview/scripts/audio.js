let audio;
let audioLoaded = false;

function loadAudio(url)
{
  audioLoaded = false;
  audio = new Audio(url);
  audio.addEventListener("canplaythrough", (e) => {
    audioLoaded = true;
    console.log(`Audio ${url} loaded`);
  });
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