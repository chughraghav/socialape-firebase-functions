const functions = require('firebase-functions');
const express = require('express');

const {
    getAllScreams, 
    postOneScream, 
    getScream, 
    commentOnScream,
    likeScream,
    unlikeScream,
    deleteScream
} = require('./handlers/screams');
const {
     signUp, 
     login,
     uploadImage, 
     addUserDetails, 
     getAuthenticatedUser 
    } = require('./handlers/users');
    
const FBAuth = require('./util/fbAuth');

const app = express();

// Scream Routes
app.get('/screams',getAllScreams );
// Post one scream
app.post( '/scream', FBAuth , postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', FBAuth, deleteScream);
app.get('/scream/:screamId/like', FBAuth, likeScream);
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)


// users routes
app.post('/signup', signUp );
app.post('/login', login);
app.post('/user/image', FBAuth , uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser)

exports.api = functions.region('asia-east2').https.onRequest(app);