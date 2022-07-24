"use strict";

const playlistAnalytics = {
  // Get shortest song
  getShortestSong(playlist) {
    let shortestSong = null;

    /*
    - Set shortestSong to the first song in the array (if there is one)
    - Loop through the array until we reach the end
    - If we locate any shorter song, set it to shortestSong
    */
    if (playlist.songs.length > 0) {
      shortestSong = playlist.songs[0];
      for (let i = 1; i < playlist.songs.length; i++) {
        if (playlist.songs[i].duration < shortestSong.duration) {
          shortestSong = playlist.songs[i];
        }
      }
    }
    return shortestSong;
  },

  // Get playlist duration
  getPlaylistDuration(playlist) {
    let playlistDuration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      let song = playlist.songs[i];
      playlistDuration = playlistDuration + song.duration;
    }
    return playlistDuration;
  },
};

module.exports = playlistAnalytics;
