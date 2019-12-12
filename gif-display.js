// This class will represent the gif display area. It keeps track of which gif
// is being shown and can select a new random gif to be shown.
// 
// See HW4 writeup for more hints and details.
class GifDisplay {
  constructor(container) {
    // Bindings
    this.onResolved = this.onResolved.bind(this);
    // Members
    this.theme = null;
    this.images = [];
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
    const rating = '&rating=g';
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
    this.images = resource['data'];
    this.setRandomImage(this.foreground);
    this.setRandomImage(this.background);
  }

  setImage(element, obj) {
    const src = 'url(' + obj.images.downsized.url + ')';
    element.style.backgroundImage = src;
  }

  randomImage() {
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

  setRandomImage(element) {
    this.setImage(element, this.randomImage());
  }
}
