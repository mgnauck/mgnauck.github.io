"use strict";

/// TODO
/// 
/// Smooth FPS
/// Load audio
/// Load image
/// Timeline handling
/// Rewrite as classes
/// Renderer

// Canvas
let canvas = document.getElementById("demodemo");
let context;
let fullscreen = false;

// Resolution
const width = canvas.width;
const height = canvas.height;
const aspect = width / height;

// Settings
const debugMode = true;
const startByEvent = true;
const frameRateLimitEnabled = false;
const frameRateLimit = 100;

// Update frame
let requestAnimationFrameId = null;

// Timing
let running = false;
let globalStartTime;

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

  // Setup back buffer
  initializeScreenBuffer(width, height);

  // Position and size canvas
  resizeCanvas();

  // Load all data
  load();

  // Setup event listener
  initializeEventListener();

  // Start immediately
  if(!startByEvent)
  {
    start();
  }
}

function showLoadingScreen()
{
  context.fillStyle = "rgba(255, 255, 255, 255)";
  context.font = "bold 20px serif";
  context.fillText("Loading..", 3, 20);
  context.fillText("Press F, click or touch again to toggle fullscreen.", 3, 43);

  if(startByEvent)
  {
    context.fillText("Press space, click or touch to start.", 3, 66);
  }
}

function load()
{
  showLoadingScreen();

  // TODO Load data
}

function start()
{
  // Reset (if already running)
  stop();

  // Store global start time
  globalStartTime = window.performance.now();

  // Render the first frame
  requestFrameUpdate();

  // Note we are started
  running = true;
}

function stop()
{
  // Cancel previous frame
  if(running && requestAnimationFrameId != null)
  {
    window.cancelAnimationFrame(requestAnimationFrameId);
  }

  // Note we are stopped
  running = false;  
}

function render(time)
{
  //fill(backBuffer32, 0xff000000 + getRandomInt(0xffffff));
  //fill(backBuffer32, 0xff00ff00);

  let timeVal = time * 0.009;
  let scale = Math.cos(degToRad(timeVal));

  for(let y=0; y<height; y++)
  {
    for(let x=0; x<width; x++)
    {
      let xofs = Math.sin(degToRad(timeVal) + timeVal * 0.03) * width * 3/4;
      let yofs = Math.sin(degToRad(timeVal) + timeVal * 0.07) * height * 3/4;
      let c = ((xofs + x * scale) ^ (yofs + y * scale)) & 0xff;
      pixel(backBuffer32, x, y, 0xff000000 + (c << 16) + (c << 8) + c);
    }    
  }
}

function updateFrame()
{
  // Grab time at begin of frame render
  let beginFrameTime = window.performance.now();

  // Render content
  render(beginFrameTime - globalStartTime);

  // Make back buffer content visible on context
  present();

  // Display FPS
  displayFramesPerSecond(beginFrameTime, window.performance.now());

  // Request another frame update
  requestFrameUpdate();
}

function requestFrameUpdate()
{
  if (!frameRateLimitEnabled)
  {
    window.cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = window.requestAnimationFrame(updateFrame);
  }
  else
  {
    window.clearTimeout(requestAnimationFrameId);
    requestAnimationFrameId = window.setTimeout(updateFrame, 1000 / frameRateLimit);
  }
}
