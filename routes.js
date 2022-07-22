"use strict";

const express = require("express");
const router = express.Router();

// Routes - controllers
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const playlist = require("./controllers/playlist.js");
const accounts = require("./controllers/accounts.js");

// Accounts
router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

// Dashboard
router.get("/dashboard", dashboard.index);
router.get("/dashboard/deleteplaylist/:id", dashboard.deletePlaylist);
router.post("/dashboard/addplaylist", dashboard.addPlaylist);

// About, Playlist
router.get("/about", about.index);
router.get("/playlist/:id", playlist.index);
router.get("/playlist/:id/deletesong/:songid", playlist.deleteSong);
router.post("/playlist/:id/addsong", playlist.addSong);

module.exports = router;
