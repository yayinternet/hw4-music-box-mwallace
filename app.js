// This class will represent the music visualizer as a whole, similar to the
// role that the `App` class played in HW3.
//
// See HW4 writeup for more hints and details.
class App {
  constructor() {
    const menu = new MenuScreen(this.onSongSelected);
  }

  onSongSelected(songObject) {
    console.log(songObject);
  }
  // TODO(you): Add methods as necessary.
}
