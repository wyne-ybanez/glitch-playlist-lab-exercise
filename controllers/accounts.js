"use strict";

const userstore = require("../models/user-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  // Accounts index
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    reponse.render("index", viewData);
  },

  // Accounts login
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  // Accounts logout
  logout(request, response) {
    response.cookie("playlist", "");
    response.redirect("/");
  },

  // Accounts Signup
  signup(request, response) {
    const viewData = {
      title: "Register for an account",
    };
    response.render("signup", viewData);
  },

  // Accounts registering
  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  // Accounts authentication
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);

    if (user) {
      response.cookie("playlist", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  // Accounts get current user
  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
