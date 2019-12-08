// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor(onSongSelectedCallback, onThemeSelectedCallback) {
    // Bindings
    this.onResolved = this.onResolved.bind(this);
    this.onSongSelected = this.onSongSelected.bind(this);
    // Members
    this.songs = {};
    this.onSongSelectedCallback = onSongSelectedCallback;
    this.onThemeSelectedCallback = onThemeSelectedCallback;
    this.themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
    // Listen to select menu changed events
    document.querySelector('#song-selector').addEventListener('change', this.onSongSelected);
    // Hardcode this playlist for now (it would be nice if we could let the 
    // user add their own playlist later).
    this.playlist = 'https://yayinternet.github.io/hw4-music/songs.json';
    // Open the playlist
    this.getPlaylist(this.playlist);
    // Prepopulate theme randomly
    this.prepopulateTheme();

  }

  onSuccess(response) {
    return response.json();
  }

  onFailure(error) {
    console.log(error);
  }

  onResolved(resource) {
    this.songs = resource;
    this.populateMenu(resource);
  }

  getPlaylist(playlist) {
    fetch(playlist)
      .then(this.onSuccess, this.onFailure)
      .then(this.onResolved);
  }

  populateMenu(songs) {
    const songSelector = document.querySelector('#song-selector');
    for (const [songName, songObject] of Object.entries(songs)) {
      const element = document.createElement('option');
      element.value = songName;
      element.innerHTML = songObject.title;
      songSelector.appendChild(element);
    }
  }

  onSongSelected(event) {
    event.preventDefault();
    event.stopPropagation();
    this.onSongSelectedCallback(this.songs[event.currentTarget.value]);
  }

  prepopulateTheme() {
    const index = Math.floor(Math.random() * this.themes.length);
    const themeInput = document.querySelector('#query-input');
    themeInput.defaultValue = this.themes[index];
    this.onThemeSelectedCallback(this.themes[index]);
  }


}