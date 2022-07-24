"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");

// Gives each song a unique ID
const uuid = require("uuid");

const playlist = {
  // index
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug("Playlist id = ", playlistId);

    let shortestSong = null;
    const playlist = playlistStore.getPlaylist(playlistId);

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

    console.log(shortestSong);
    const viewData = {
      title: "Playlist",
      playlist: playlistStore.getPlaylist(playlistId),
      shortestSong: shortestSong,
    };
    response.render("playlist", viewData);
  },

  // delete song method
  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect("/playlist/" + playlistId);
  },

  // add song
  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    playlistStore.addSong(playlistId, newSong);
    logger.debug("New Song = ", newSong);
    response.redirect("/playlist/" + playlistId);
  },
};

module.exports = playlist;
