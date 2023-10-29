"use strict";

let images = new Map();

function loadImage(url, id)
{
  let image = new Image();

  image.onload = () => {

    images.get(id).loaded = true;

    console.log(`Image ${url} loaded and available via '${id}'`);
  };

  image.onerror = () => {

    console.log(`Failed to load image ${url}`);
  }

  // Store image in our images array
  images.set(id, { image: image, loaded: false, url: url });

  // Start loading the image
  image.src = url;
}

function imagesLoaded()
{
  for(const image of images.values())
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
  return images.get(id).image;
}
