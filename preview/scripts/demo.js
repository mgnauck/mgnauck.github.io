// Canvas
const canvas = document.getElementById("demodemo");
const width = canvas.width;
const height = canvas.height;
const aspect = width / height;

// Context
var context

// Settings
var fullscreen = false
const startByEvent = false
var showFps = true

// Back buffer
var backBuffer = new ArrayBuffer(width * height * 4)
var backBuffer8 = new Uint8ClampedArray(backBuffer)
var backBuffer32 = new Uint32Array(backBuffer);
var backBufferImageData = 0;

// Update frame
const limitFrameRate = true;
const frameRateLimit = 100;
var requestAnimationFrameId = null;

// Timing
var globalStartTime = 0

function initialize()
{  
  if (canvas.getContext)
  {
    context = canvas.getContext("2d", { alpha: false });
  }
  else
  {
    // Canvas not supported
    console.log("Canvas not supported")
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
  // Fullscreen
  document.addEventListener("keydown", (e) => { if (e.key === "f") { toggleFullscreen(); } }, false);
  document.addEventListener("click", (e) => { toggleFullscreen(); }, false);
  document.addEventListener("click", (e) => { toggleFullscreen(); }, false);
  document.addEventListener("touchend", (e) => { toggleFullscreen(); }, false);

  // Display frames per second
  document.addEventListener("keydown", (e) => { if(e.key == "s" ) showFps = !showFps; }, false);

  // Start by event
  if(startByEvent)
  {
    document.addEventListener("keydown", (e) => { if (e.key === " ") { start(); } }, false);
  }
}

function showLoader()
{
  context.font = "bold 22px serif";
  context.fillStyle = "rgba(255,255,255,255)";
  context.fillText("Press F or click to view fullscreen.", 3, 32);
  context.fillText("Press space to start.", 3, 70);
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