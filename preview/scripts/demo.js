"use strict";

/// TODO
/// Loader progress
/// Timeline/effects/sync handling
/// Rewrite as classes
/// Renderer

// Canvas
let canvas = document.getElementById("demodemo");
let context;

// Settings
let fullscreen = false;
const debugMode = true;
const noAudio = false;

// Window
const width = canvas.width;
const height = canvas.height;
const aspect = width / height;

// Frame update
const frameRateLimitEnabled = false;
const frameRateLimit = 100;

// Update
let loadingIntervalId;
let requestAnimationFrameId;

// Flow control
let autoStart = false;
let loading = false;
let running = false;
let globalStartTime;

function initialize()
{  
  console.log("Initializing");

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
}

function showLoadingScreen(percentProgress)
{
  context.fillStyle = "rgba(0, 0, 0, 255)";
  context.clearRect(0, 0, width, height);

  context.fillStyle = "rgba(255, 255, 255, 255)";
  context.font = "bold 20px serif";
  context.fillText("Loading..", 3, 20);
}

function showStartScreen()
{
  context.fillStyle = "rgba(0, 0, 0, 255)";
  context.clearRect(0, 0, width, height);

  context.drawImage(getImage("unikLogo"), 0, 0);

  context.fillStyle = "rgba(255, 255, 255, 255)";
  context.fillText("Loading completed.", 3, 220);
  context.fillText("Press F, click or touch again to toggle fullscreen.", 3, 243);

  if(!autoStart)
  {
    context.fillText("Press space, click or touch to start.", 3, 266);
  }
}

function load()
{
  console.log("Loading");

  loading = true;

  // Draw loading screen
  showLoadingScreen(0);

  // Load data
  loadAudio("audio/music.mp3");
  loadImage("images/unik2.png", "unikLogo");

  // Start checking if loading has completed
  loadingIntervalId = setInterval(isLoadingComplete, 200);
}

function isLoadingComplete()
{
  let finished = (audioLoaded || noAudio) && imagesLoaded();
  if(finished)
  {
    console.log("Loading complete");

    loading = false;

    // Stop checking if loading has completed
    clearInterval(loadingIntervalId);

    // Draw start screen
    showStartScreen();

    // Setup event listener
    initializeEventListener();

    if(autoStart)
    {
      // Start immediately      
      start();
    }    
  }
  else
  {
    // Draw updated loading screen
    showLoadingScreen(0 /* TODO progress */);

    // Reset check if loading has completed
    loadingIntervalId = setInterval(isLoadingComplete, 200);
  }
}

function start()
{
  // Reset (if already running)
  stop();

  console.log("Starting");

  // Store global start time
  globalStartTime = window.performance.now();

  // Start to play audio
  playAudio();

  // Render the first frame
  requestFrameUpdate();

  // Note we are started
  running = true;
  autoStart = false;
}

function stop()
{
  if(running)
  {
    console.log("Stopping");

    // Note we are stopped
    running = false;

    // Stop audio playing
    pauseAudio();

    // Cancel previous frame
    if(requestAnimationFrameId != undefined)
    {
      window.cancelAnimationFrame(requestAnimationFrameId);
    }

    // Draw start screen
    showStartScreen();
  }
}

function render(time)
{
  //fill(backBuffer32, 0xff000000 + getRandomInt(0xffffff));
  //fill(backBuffer32, 0xff00ffff);

  let timeVal = time * 0.009123;
  let scale = Math.cos(degToRad(timeVal * 3.4)) * 3.0 + 3.2;

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
