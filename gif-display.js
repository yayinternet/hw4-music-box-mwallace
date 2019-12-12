// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(container, gifDisplayReadyCallback, noImagesCallback) {
    // Bindings
    this.onResolved = this.onResolved.bind(this);
    // Callbacks
    this.gifDisplayReadyCallback = gifDisplayReadyCallback;
    this.noImagesCallback = noImagesCallback;
    // Members
    this.theme = null;
    this.images = [];
    this.preloaded = [];
    this.preloadIndex = 0;
    // DOM Nodes
    this.foreground = document.createElement('div');
    this.foreground.id = 'gif';
    this.foreground.style.zIndex = 1;
    container.appendChild(this.foreground);
    this.background = document.createElement('div');
    this.background.id = 'gif';
    this.background.style.zIndex = 0;
    container.appendChild(this.background);
  }

  getImagesFromTheme(theme) {
    this.setTheme(theme);
    this.getImages(theme);
  }
  
  setTheme(theme) {
    this.theme = theme;
  }

  swapBuffers() {
    // Check to see which buffer is in the foreground presently
    if (this.foreground.style.zIndex === '1') {
      // Swap the foreground with back buffer
      this.background.style.zIndex = 1;
      this.foreground.style.zIndex = 0;
      // Fetch a new image for the new back buffer
      this.setRandomImage(this.foreground);
    } else {
      this.background.style.zIndex = 0;
      this.foreground.style.zIndex = 1;
      this.setRandomImage(this.background);
    }
  }

  getImages(theme = this.theme) {
    const url = 'https://api.giphy.com/v1/gifs/search?q=';
    const limit = '&limit=25';
    const rating = '&rating=r';
    // Hello github!
    const api_key = '&api_key=';
    const query = encodeURIComponent(theme);
    fetch(url + query + api_key + limit + rating)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(this.onResolved)
      .catch((error) => {
        console.log(error)
      });
  }

  onResolved(resource) {
    if (resource === undefined)
      return;
    if (resource.data.length >= 2) {
      this.noImagesCallback(false);
      this.images = resource['data'];
      this.preload();
    } else
      this.noImagesCallback(true);
  }

  preload() {
    for (let i = 0; i < this.images.length; ++i) {
      const img = new Image();
      img.src = this.images[i].images.downsized.url;
      img.addEventListener('load', (event) => {
        if (this.preloadIndex === 1) {
          this.loadInitialImages();
        }
        this.preloaded[this.preloadIndex] = img;
        ++this.preloadIndex;
      });
    }
  }

  loadInitialImages() {
    this.foreground.backgroundImage = this.preloaded[0];
    this.background.backgroundImage = this.preloaded[1];
    this.gifDisplayReadyCallback();
  }

  setImage(element, obj) {
    const src = 'url(' + obj.images.downsized.url + ')';
    element.style.backgroundImage = src;
  }

  randomImageObject() {
    if (this.images === undefined)
      return;
    const tail = this.images.length - 1;
    const index = Math.floor(Math.random() * tail);
    // Swap pick with the last index so that we don't pick two of the same
    // images in a row
    const tmp = this.images[index];
    this.images[index] = this.images[tail];
    this.images[tail] = tmp;
    return tmp;
  }

  randomPreloadedImage() {
    if (this.preloadIndex <= 0)
      return;
    const tail = this.preloadIndex - 1;
    const index = Math.floor(Math.random() * tail);
    const tmp = this.preloaded[index];
    this.preloaded[index] = this.preloaded[tail];
    this.preloaded[tail] = tmp;
    return tmp;
  }

  setRandomImageFromObject(element) {
    this.setImage(element, this.randomImageObject());
  }

  setRandomImage(element) {
    const img = this.randomPreloadedImage();
    if (img === undefined)
      return;
    element.style.backgroundImage = 'url(' + img.src + ')';
  }
}
