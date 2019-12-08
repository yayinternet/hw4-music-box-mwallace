// This class will represent the menu screen that you see when you first load
// the music visualizer.
//
// See HW4 writeup for more hints and details.
class MenuScreen {
  constructor() {
    // Bindings
    this.onResolved = this.onResolved.bind(this);
    // Members
    this.songs = {};
    this.themes = ['candy', 'charlie brown', 'computers', 'dance', 'donuts', 'hello kitty', 'flowers', 'nature', 'turtles', 'space'];
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

  prepopulateTheme() {
    const index = Math.floor(Math.random() * this.themes.length);
    const themeInput = document.querySelector('#query-input');
    themeInput.defaultValue = this.themes[index];
  }

  getSongObject(songName) {
    return this.songs[songName];
  }

}