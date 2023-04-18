const express = require('express')
var cors = require('cors')
const { getPreferencesHandler, addPreferencesHandler, updatePreferencesHandler } = require('./src/handlers/preferences');
const { getAuthorizedUsersHandler, checkIfUserIsAuthorizedHandler } = require('./src/handlers/users');
const { getOccupantsOfRoomHandler, userScanHandler, getRoomSettingsHandler } = require('./src/handlers/rooms');
const { getAllRequestsHandler, addRequestHandler, updateRequestHandler, approveRequestHandler } = require('./src/handlers/requests');
const app = express()
const port = 8080
app.use(express.json());
app.use(cors())

app.get('/users/:users/preferences', getPreferencesHandler) // get an single user or group of users' preferences, return default preferences as fallback
app.post('/users/:users/preferences', addPreferencesHandler) // add an individual user's preferences, not for shared preferences
app.put('/users/:users/preferences', updatePreferencesHandler)  // update an individual user's preferences, not for shared preferences

app.get('/users', getAuthorizedUsersHandler) // get a list of all authorized users
app.get('/users/:user/check', checkIfUserIsAuthorizedHandler) // check if a user is authorized, check on ID scan and console log in

app.get('/rooms/:room/occupants', getOccupantsOfRoomHandler) // return the occupants of a room
app.put('/rooms/:room/users/:user/scan', userScanHandler) // mark a user in or out of a room and return the current occupants and settings of a room
app.get('/rooms/:room/settings', getRoomSettingsHandler) // returns the current settings of a room

app.get('/users/:user/requests', getAllRequestsHandler)   // get all shared preference requests from or to a particular user
app.post('/users/:users/requests', addRequestHandler) // add a new request to another individual for a shared preferences setting
app.put('/users/:users/requests', updateRequestHandler)  // update a request for a shared preference
app.put('/users/:users/requests/approve', approveRequestHandler) // approve a pending request from another user

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
