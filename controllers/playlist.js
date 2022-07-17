'use strict'

const logger = require('../utils/logger');
const playlistCollection = require('../models/playlist-store.js');

const playlist = {
  index(request, response) {
    // extracting and logging the ID
    const playlistId = request.params.id;
    logger.info('Playlist id = ' + playlistId);
    const viewData = {
      title: 'Playlist',
    };
    response.render('playlist', viewData);
  }
};

module.exports = playlist;