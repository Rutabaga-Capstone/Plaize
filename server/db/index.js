import { apiKey, authDomain, projectId } from "../../secrets";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase

firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId
});

var db = firebase.firestore();
module.exports = db;
