"use strict";

function initializeEventListener()
{
  // Resize canvas on window resize
  window.onresize = () => { resizeCanvas(); };

  // Press F for fullscreen
  document.addEventListener("keydown", (e) => {

    if (e.key === "f")
    {
      toggleFullscreen();
    }
  });

  // Start/restart by spacebar
  document.addEventListener("keydown", (e) => {

	  if (e.key === " ")
	  {
	    start();
	  }
	});
  
  // Stop by escape
  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && running)
    {
      stop();
    }
  });

  // Click to start or if running toggle fullscreen
  canvas.addEventListener("click", (e) => { 

    if(running)
    {
      toggleFullscreen();
    }
    else
    {
      start();
    }
  });

  // Touch canvas to start or if running toggle fullscreen
  canvas.addEventListener("touchstart", (e) => {

    if(running)
    {
      toggleFullscreen();
    }
    else
    {
      start();
    }
  });

  // Toggle display frames per second
  document.addEventListener("keydown", (e) => {
    
    if(e.key == "s")
    {
      displayFramesPerSecondEnabled = !displayFramesPerSecondEnabled;
    }
  });

  // Toggle display frames per second
  document.addEventListener("keydown", (e) => {
    
    if(e.key == "m")
    {
      toggleAudio();
    }
  });
}
