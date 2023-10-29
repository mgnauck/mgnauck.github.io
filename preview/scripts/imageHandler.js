"use strict";

let images = {};

function loadImage(url, id)
{
  let image = new Image();

  image.onload = () => {

    images[id].loaded = true;

    console.log(`Image ${url} loaded and available via '${id}'`);
  };

  image.onerror = () => {

    console.log(`Failed to load image ${url}`);
  }

  // Store image in our images array
  images[id] = { "image" : image, "loaded" : false };

  // Start loading the image
  image.src = url;
}

function imagesLoaded()
{
  for(const image of Object.values(images))
  {
    if(!image.loaded)
    {
      return false;
    }
  }

  return true;
}

function getImage(id)
{
  return images[id].image;
}