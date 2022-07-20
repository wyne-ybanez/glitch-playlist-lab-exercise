'use strict';
// lodash library utility to delete song from an array
const _ = require('lodash');

const playlistStore = {

  playlistCollection: require('./playlist-store.json').playlistCollection,

  getAllPlaylists() {
    return this.playlistCollection;
  },

  getPlaylist(id) {
    return _.find(this.playlistCollection, { 
      id: id 
    });
  },
  
  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    // lodash remove
    _.remove(playlist.songs, { id: songId });
  },
  
  removePlaylist(id) {
    _.remove(this.playlistCollection, { id: id });
  },
  
  addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
  },
};

module.exports = playlistStore;
  

      