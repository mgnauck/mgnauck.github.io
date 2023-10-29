let imagesLoaded = true;

let logo;

function loadImage(resource)
{
  imagesLoaded = false;

  let image = new Image();
  image.onload = () =>
  {
    imagesLoaded = true;
    console.log(`Image ${resource} loaded`);
  };
  image.src = resource;

  return image;
}