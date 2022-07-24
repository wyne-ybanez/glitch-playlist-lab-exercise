"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");

const song = {
  // Displays the index version for the song, requires the id and playlist
  index(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Editing Song ${songId} from Playlist ${playlistId}`);
    const viewData = {
      title: "Edit Song",
      playlist: playlistStore.getPlaylist(playlistId),
      song: playlistStore.getSong(playlistId, songId),
    };
    response.render("song", viewData);
  },

  // Update requires playlist, specific song and its id + a playload for editing the song fields
  update(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    const song = playlistStore.getSong(playlistId, songId);
    const newSong = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug(`Updating Song ${songId} from Playlist ${playlistId}`);
    playlistStore.updateSong(song, newSong);
    response.redirect("/playlist/" + playlistId);
  },
};

module.exports = song;
