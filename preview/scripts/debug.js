"use strict";

const displayFramesPerSecondEnabled = true & debugMode;
const framesPerSecondFontSize = 16;

function displayFramesPerSecond(beginTime, endTime)
{
  if(displayFramesPerSecondEnabled)
  {
    context.font = "bold " + framesPerSecondFontSize + "px serif";
    context.fillText(Math.round(1000.0 / (endTime - beginTime)), 3, framesPerSecondFontSize);
  }
}
