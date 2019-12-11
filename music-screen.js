// This class will represent the music visualizer screen, i.e. the screen that
// you see after you select a song.
//
// This class should create and own:
//   - 1 AudioPlayer
//   - 1 GifDisplay
//   - 1 PlayButton
//
// See HW4 writeup for more hints and details.
class MusicScreen {
  constructor() {
    // Binding
    this.playbackControl = this.playbackControl.bind(this);
    this.onKick = this.onKick.bind(this);
    // Members
    this.song = null;
    this.audioPlayer = null;
    // DOM Nodes
    this.container = document.createElement('article');
    this.player = document.createElement('section');
    this.player.id = 'player';
    this.gif = new GifDisplay(this.player);
    this.controls = document.createElement('footer');
    this.controls.id = 'controls';
    this.button = new PlayButton(this.controls, this.playbackControl);
    this.container.appendChild(this.player);
    this.container.appendChild(this.controls);
    this.container.style.display = 'none';
    const body = document.querySelector('body');
    body.appendChild(this.container);
  }

  init(song, theme) {
    this.audioPlayer = new AudioPlayer();
    this.setSong(song);
    this.setTheme(theme);
    this.show();
    this.audioPlayer.setSong(song.songUrl);
    console.log(song);
    this.audioPlayer.setKickCallback(this.onKick);
    this.playbackControl(this.button.isPlaying());
  }

  onKick() {
    console.log('kick!');
    this.gif.setRandomImage();
  }

  show() {
    this.container.style.display = 'flex';
  }

  hide() {
    this.container.style.display = 'none';
  }

  setSong(song) {
    this.song = song;
  }

  setTheme(theme) {
    this.gif.getImagesFromTheme(theme);
  }

  playbackControl(play) {
    if (this.audioPlayer === null) 
      return;
    if (play) {
      this.audioPlayer.play();
    } else {
      this.audioPlayer.pause();
    }
  }
}
