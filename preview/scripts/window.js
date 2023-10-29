"use strict";

function openFullscreen()
{
    if (canvas.requestFullscreen)
    {
      canvas.requestFullscreen().catch((err) => { console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`); });
    }
    else if (canvas.webkitRequestFullscreen)
    {
      canvas.webkitRequestFullscreen().catch((err) => { console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`); });
    }
    else if (canvas.msRequestFullscreen)
    {
      canvas.msRequestFullscreen().catch((err) => { console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`); });
    }

    fullscreen = true;
}

function exitFullscreen()
{
  if(document.exitFullscreen)
  {
    document.exitFullscreen();  
  }
  else if(document.webkitExitFullscreen)
  {
    document.webkitExitFullscreen();
  }
  else if(document.msExitFullscreen)
  {
    document.msExitFullscreen();
  }
 
  fullscreen = false;
}

function toggleFullscreen()
{
  if(fullscreen)
  {
    exitFullscreen();
  }
  else
  {
    openFullscreen();
  }
}

function resizeCanvas()
{
  canvas.style.position = 'absolute';
  canvas.style.cursor = 'none';

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowAspect = windowWidth / windowHeight;

  if (windowAspect >= aspect)
  {
    canvas.style.top = "0px";
    canvas.style.left = (windowWidth - (windowHeight * aspect)) / 2 + "px";
    canvas.style.width = windowHeight * aspect + "px";
    canvas.style.height = windowHeight + "px";
  }
  else
  {
    canvas.style.top = (windowHeight - (windowWidth / aspect)) / 2 + "px";
    canvas.style.left = "0px";
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / aspect + "px";
  }
}
