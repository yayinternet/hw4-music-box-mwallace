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
    this.gif = document.createElement('div');
    this.gif.id = 'gif';
    container.appendChild(this.gif);

  }
  
  setTheme(theme) {
    this.theme = theme;
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
         // throw new Error('Something went wrong');
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
    this.setImage(this.randomImage());
    console.log(this.images);
  }

  setImage(obj) {
    const src = 'url(' + obj.images.downsized.url + ')';
    this.gif.style.backgroundImage = src;
  }

  randomImage() {
    if (this.images === undefined)
      return;
    const index = Math.floor(Math.random() * this.images.length);
    return this.images[index];
  }
}
