"use strict";

const displayFramesPerSecondEnabled = true & debugMode;
const framesPerSecondFontSize = 16;

const framesPerSecondSamples = new Float32Array(100);
const framesPerSecondSampleWeight = 1.0 / framesPerSecondSamples.length;
let framesPerSecondSampleIndex = 0;
let averageFramesPerSecond = 0.0;

function displayFramesPerSecond(beginTime, endTime)
{
  if(displayFramesPerSecondEnabled)
  {
    updateFramesPerSecond(beginTime, endTime);
    
    context.font = `${framesPerSecondFontSize}px serif`;
    context.fillStyle = "rgba(0, 255, 0, 255)";
    context.fillText(Math.round(averageFramesPerSecond), 3, framesPerSecondFontSize);
  }
}

function updateFramesPerSecond(beginTime, endTime)
{
    // Calculate new frames per second sample
    let newSampleValue = 1000.0 / (endTime - beginTime) * framesPerSecondSampleWeight;

    // Update average frames per second by including newly calculated sample and removing oldest sample
    averageFramesPerSecond += newSampleValue - framesPerSecondSamples[framesPerSecondSampleIndex];

    // Store newly calculated sample
    framesPerSecondSamples[framesPerSecondSampleIndex] = newSampleValue;

    // Move to next sample for next update
    framesPerSecondSampleIndex = (framesPerSecondSampleIndex + 1) % framesPerSecondSamples.length;
}
