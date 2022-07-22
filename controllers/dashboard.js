"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");
const accounts = require("./accounts.js");

// Gives playlists a unique ID
const uuid = require("uuid");

const dashboard = {
  // Index
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Playlist Dashboard",
      // Get the loggedin Users, their ID and then their playlist
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
    };
    logger.info("about to render", playlistStore.getAllPlaylists());
    response.render("dashboard", viewData);
  },

  // Delete Playlist
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect("/dashboard");
  },

  // Add Playlist
  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: [],
    };
    logger.debug("Creating a new Playlist", newPlayList);
    playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
