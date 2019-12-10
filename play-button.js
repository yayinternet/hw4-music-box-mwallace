// This class will represent the play button in the MusicScreen. Clicking on
// it toggles audio playback.
//
// See HW4 writeup for more hints and details.
class PlayButton {
  constructor(container, playbackControl) {
    // Binding
    this.togglePlaying = this.togglePlaying.bind(this);
    // Members
    this.container = container;
    this.playing = false;
    // Callbacks
    this.playbackControl = playbackControl;
    // DOM Nodes
    this.controlsButton = document.createElement('img');
    this.controlsButton.id = 'controlsButton';
    this.controlsButton.src = 'images/play.png';
    this.container.appendChild(this.controlsButton);
    // Event Listeners
    this.controlsButton.addEventListener('click', this.togglePlaying);
    // Synchronize button's state with audio player's state
    this.playbackControl(this.playing);
  }
  
  togglePlaying(event) {
    event.stopPropagation();
    if (this.playing) {
      this.playing = false;
      this.controlsButton.src = 'images/play.png';
    } else {
      this.playing = true;
      this.controlsButton.src = 'images/pause.png';
    }
    this.playbackControl(this.playing);
  }

  isPlaying() {
    return this.playing;
  }

}
