const functions = require('firebase-functions');
const express = require('express');

const {getAllScreams, postOneScream} = require('./handlers/screams');
const { signUp, login, uploadImage, addUserDetails } = require('./handlers/users')
const FBAuth = require('./util/fbAuth');

const app = express();

// Scream Routes
app.get('/screams',getAllScreams );
// Post one scream
app.post( '/scream', FBAuth , postOneScream);

// users routes
app.post('/signup', signUp );
app.post('/login', login);
app.post('/user/image', FBAuth , uploadImage);
app.post('/user', FBAuth, addUserDetails);

exports.api = functions.region('asia-east2').https.onRequest(app);