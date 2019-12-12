// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    // Bindings
    this.onSubmit = this.onSubmit.bind(this);
    this.gifDisplayReady = this.gifDisplayReady.bind(this);
    this.noImagesCallback = this.noImagesCallback.bind(this);
    // Members
    this.menu = new MenuScreen();
    this.music = new MusicScreen(this.gifDisplayReady, this.noImagesCallback);
    // Event Listeners
    const form = document.querySelector('form');
    form.addEventListener('submit', this.onSubmit);
  }

  onSongSelected(songObject) {
    console.log(songObject);
  }

  onSubmit(event) {
    event.preventDefault();
    const songInput = document.querySelector('#song-selector');
    const song = this.menu.getSongObject(songInput.value);
    const textInput = document.querySelector('#query-input');
    this.music.init(song, textInput.value);
  }

  gifDisplayReady() {
    const loadScreen = document.querySelector('#loading');
    loadScreen.classList.add('inactive');
    this.music.start();
  }

  // Parameter set to true if not enough images were returned by giphy
  noImagesCallback(errorFlag) {
    if (errorFlag) {
      const error = document.querySelector('#error');
      error.classList.remove('inactive');
    } else {
      this.menu.hide();
      const loadScreen = document.querySelector('#loading');
      loadScreen.classList.remove('inactive');
    }
 
  }
}
