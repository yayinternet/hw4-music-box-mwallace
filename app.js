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
    this.menu.hide();
    this.music.start();
  }

  noImagesCallback() {
    const error = document.querySelector('#error');
    error.classList.remove('inactive'); 
  }
}
