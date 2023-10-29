"use strict";

let backBuffer;
let backBuffer8;
let backBuffer32;
let backBufferImageData;

function initializeScreenBuffer(width, height)
{
  backBuffer = new ArrayBuffer(width * height * 4);
  backBuffer8 = new Uint8ClampedArray(backBuffer);
  backBuffer32 = new Uint32Array(backBuffer);
  backBufferImageData = context.createImageData(width, height);  
}

function present()
{
  // Set updated back buffer contents
  backBufferImageData.data.set(backBuffer8)

  // Show backbuffer image on context
  context.putImageData(backBufferImageData, 0, 0);  
}

function fill(buffer32, color)
{
  const length = width * height;
  for(let i=0; i<length; i++)
  {
    buffer32[i] = color;
  }
}

function pixel(buffer32, x, y, color)
{
  buffer32[width * y + x] = color;
}

function line(buffer32, x1, y1, x2, y2, color)
{
  // TODO
}

function triangle(buffer32, x1, y1, x2, y2, x3, y3, color)
{
  // TOOD
}
