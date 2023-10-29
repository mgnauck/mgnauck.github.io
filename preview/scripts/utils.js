"use strict";

function getRandomInt(max)
{
  return Math.floor(Math.random() * max);
}

function degToRad(deg)
{
  return deg * 3.14159 / 180.0;
}

function clamp(v, min, max)
{
  return Math.min(max, Math.max(min, v));
}

function lerp(a, b, alpha)
{
  return a + (b - a) * alpha;
}
