const { getPreferencesOfUsers } = require("../models/preferences")
const { getOccupantsOfRoom, checkIfOccupantInRoom, removeOccupantFromRoom, addOccupantToRoom } = require("../models/rooms")
const { checkIfUserIsAuthorized } = require("../models/users")

const getOccupantsOfRoomController = (room) => {
    return getOccupantsOfRoom(room)
}

const userScanController = async (room, user) => {
    if(!await checkIfUserIsAuthorized(user))
        return { authorized: false }
    let occupants
    if(await checkIfOccupantInRoom(room, user)) 
        occupants = await removeOccupantFromRoom(room, user)
    else
        occupants = await addOccupantToRoom(room, user)
    let settings = await getPreferencesOfUsers(occupants.sort().join("-"))
    if(Object.keys(settings).length === 0) {
        settings = await getPreferencesOfUsers('Default')
    }
    return {
        authorized: true,
        occupants,
        settings
    }
}

const getRoomSettings = async (room) => {
    const occupants = await getOccupantsOfRoom(room)
    let settings = await getPreferencesOfUsers(occupants.sort().join("-"))
    if(Object.keys(settings).length === 0) {
        settings = await getPreferencesOfUsers('Default')
    }
    return {
        occupants,
        settings,
    }
}

module.exports = {
    getOccupantsOfRoomController,
    userScanController,
    getRoomSettings
}