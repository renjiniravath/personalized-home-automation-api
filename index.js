const express = require('express')
const { getPreferencesHandler, addPreferencesHandler } = require('./src/handlers/preferences');
const { getAuthorizedUsersHandler, checkIfUserIsAuthorizedHandler } = require('./src/handlers/users');
const { getOccupantsOfRoomHandler, userScanHandler, getRoomSettingsHandler } = require('./src/handlers/rooms');
const app = express()
const port = 8080
app.use(express.json());

app.get('/preferences/:users', getPreferencesHandler) // get an single user or group of users' preferences, return default preferences as fallback
app.post('/preferences/:users', addPreferencesHandler) // add an individual user's preferences, not for shared preferences
app.put('/preferences/:users')  // update an individual user's preferences, not for shared preferences

app.get('/users', getAuthorizedUsersHandler) // get a list of all authorized users
app.get('/users/:user/check', checkIfUserIsAuthorizedHandler) // check if a user is authorized, check on ID scan and console log in

app.get('/rooms/:room/occupants', getOccupantsOfRoomHandler) // return the occupants of a room
app.put('/rooms/:room/users/:user/scan', userScanHandler) // mark a user in or out of a room and return the current occupants and settings of a room
app.get('/rooms/:room/settings', getRoomSettingsHandler) // returns the current settings of a room

app.get('/users/:user/request')   // get all shared preference requests from or to a particular user
app.post('/users/:users/request') // add a new request to another individual for a shared preferences setting
app.put('/users/:users/request')  // update a request for a shared preference
app.put('/users/:users/request/approve') // approve a pending request from another user

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
