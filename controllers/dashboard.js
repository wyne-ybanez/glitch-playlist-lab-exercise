"use strict";

const logger = require("../utils/logger");
const playlistStore = require('../models/playlist-store');

// Gives playlists a unique ID
const uuid = require('uuid');

const dashboard = {
  // Index
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: playlistStore.getAllPlaylists(),
    };
    logger.info('about to render', playlistStore.getAllPlaylists());
    response.render('dashboard', viewData);
  },
  
  // Delete Playlist
  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
  
  // Add Playlist
  addPlaylist(request, response) {
    const new
  }
};

module.exports = dashboard;