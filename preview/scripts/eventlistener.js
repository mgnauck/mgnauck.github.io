"use strict";

function initializeEventListener()
{
  // Resize canvas on window resize
  window.onresize = () =>
    {
      resizeCanvas();
    };

  // Press F for fullscreen
  document.addEventListener("keydown", (e) =>
    {
      if (e.key === "f")
      {
        toggleFullscreen();
      }
    });

  // Start or restart by spacebar
  document.addEventListener("keydown", (e) =>
	{
	  if (e.key === " ")
	  {
	    start();
	  }
	});
  
  // Click to start or if running toggle fullscreen
  document.addEventListener("click", (e) =>
    { 
      if(running)
      {
        toggleFullscreen();
        return;
      }
      else if(startByEvent)
      {
        start();
      }
    });

  // Touch canvas to start or if running toggle fullscreen
  canvas.addEventListener("touchstart", (e) =>
    {  
      e.preventDefault();

      toggleFullscreen();

      if(startByEvent && !running)
      {
        start();
      }
    });

  // Toggle display frames per second
  document.addEventListener("keydown", (e) =>
    {
      if(e.key == "s")
      {
        showFps = !showFps;
      }
    });
}
