"use strict";

// Canvas
let canvas = document.getElementById("demodemo");
const width = canvas.width;
const height = canvas.height;
const aspect = width / height;

// Context
let context;

// Settings
let fullscreen = false;
const startByEvent = true;
let showFps = true;

// Back buffer
let backBuffer = new ArrayBuffer(width * height * 4);
let backBuffer8 = new Uint8ClampedArray(backBuffer);
let backBuffer32 = new Uint32Array(backBuffer);
let backBufferImageData = 0;

// Update frame
const limitFrameRate = true;
const frameRateLimit = 100;
let requestAnimationFrameId = null;

// Timing
let started = false;
let globalStartTime = 0;

function initialize()
{  
  if (canvas.getContext)
  {
    context = canvas.getContext("2d", { alpha: false });
  }
  else
  {
    // Canvas not supported
    console.log("Canvas not supported");
    return;
  }

  // Create background buffer
  backBufferImageData = context.createImageData(width, height);

  // Setup event listener
  setupEventListener();

  if(startByEvent)
  {
    showLoader();
  }
  else
  {
    requestFrameUpdate();
  }
}

function setupEventListener()
{
  // Press F for fullscreen
  document.addEventListener("keydown", (e) =>
    {
      if (e.key === "f")
      {
        toggleFullscreen();
      }
    });
  
  // Click to start 
  document.addEventListener("click", (e) =>
    { 
      if(startByEvent)
      {
        start();
      }
    });

  // Touch canvas for fullscreen and to start
  canvas.addEventListener("touchstart", (e) =>
    { 
      toggleFullscreen(); 

      if(startByEvent)
      {
        start();
      }
    });

  // Display frames per second
  document.addEventListener("keydown", (e) =>
    {
      if(e.key == "s")
      {
        showFps = !showFps;
      }
    });

  // Screen resize triggers new positioning of canvas
  window.onresize = () =>
    {
      updateCanvasPosition()
    };

  // Start by event
  if(startByEvent)
  {
    document.addEventListener("keydown", (e) =>
      {
        if (e.key === " ")
        {
          start();
        }
      });
  }
}

function showLoader()
{
  context.font = "bold 22px serif";
  context.fillStyle = "rgba(255,255,255,255)";
  context.fillText("Press F or click to view fullscreen.", 3, 32);
  context.fillText("Press space to start.", 3, 70);

  updateCanvasPosition();
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

function updateCanvasPosition()
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

function fillBuffer(buffer, color)
{
  const length = width * height;
  for(let i=0; i<length; i++)
  {
    buffer[i] = color;
  }
}

function setPixel(buffer, x, y, color)
{
  buffer[width * y + x] = color;
}

function start()
{
  // Cancel previous frame
  if(requestAnimationFrameId != null)
  {
    window.cancelAnimationFrame(requestAnimationFrameId);
  }

  // Store global start time
  globalStartTime = window.performance.now();

  // Note we are started
  started = true;

  // Render the first frame
  requestFrameUpdate();
}

function requestFrameUpdate()
{
  if (!limitFrameRate)
  {
    window.cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = window.requestAnimationFrame(update);
  }
  else
  {
    window.clearTimeout(requestAnimationFrameId);
    requestAnimationFrameId = window.setTimeout(update, 1000 / frameRateLimit);
  }
}

function render(time)
{
  //fillBuffer(backBuffer32, 0xff000000 + getRandomInt(0xffffff));
  //fillBuffer(backBuffer32, 0xff00ff00);

  let timeVal = time * 0.009;
  let scale = Math.cos(degToRad(timeVal));

  for(let y=0; y<height; y++)
  {
    for(let x=0; x<width; x++)
    {
      let xofs = Math.sin(degToRad(timeVal) + timeVal * 0.03) * width * 3/4;
      let yofs = Math.sin(degToRad(timeVal) + timeVal * 0.07) * height * 3/4;
      let c = ((xofs + x * scale) ^ (yofs + y * scale)) & 0xff;
      setPixel(backBuffer32, x, y, 0xff000000 + (c << 16) + (c << 8) + c);
    }    
  }
}

function update()
{
  // Grab time at begin of frame render
  let beginFrameTime = window.performance.now();

  // Render content
  render(window.performance.now() - globalStartTime);
  
  // Set updated back buffer contents
  backBufferImageData.data.set(backBuffer8)

  // Show backbuffer image on context
  context.putImageData(backBufferImageData, 0, 0);

  // Grab time at end of frame render
  let endFrameTime = window.performance.now();

  // Display FPS
  if(showFps)
  {
    const size = 16
    context.font = "bold " + size.toString() + "px serif";
    context.fillText(Math.round(1000.0 / (endFrameTime - beginFrameTime)), 3, size);
  }

  // Request another frame update
  requestFrameUpdate();
}
