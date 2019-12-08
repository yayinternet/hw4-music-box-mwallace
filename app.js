// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    const menu = new MenuScreen(this.onSongSelected, this.onThemeSelected);
    const form = document.querySelector('form');
    form.addEventListener('submit', this.onSubmit);
  }

  onSongSelected(songObject) {
    console.log(songObject);
  }

  onSubmit(event) {
    event.preventDefault();
    const textInput = document.querySelector('#query-input');
    console.log(textInput.value);
  }
}
