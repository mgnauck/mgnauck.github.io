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
    alert("Image loading failed");
  }

  images[id] = { "image" : image, "loaded" : false };

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