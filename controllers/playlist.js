"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");
const playlistAnalytics = require("../utils/playlist-analytics");

// Gives each song a unique ID
const uuid = require("uuid");

const playlist = {
  // index
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug("Playlist id = ", playlistId);

    const playlist = playlistStore.getPlaylist(playlistId);

    const viewData = {
      title: "Playlist",
      playlist: playlist,
      playlistSummary: {
        shortestSong: playlistAnalytics.getShortestSong(playlist),
        duration: playlistAnalytics.getPlaylistDuration(playlist),
      },
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
