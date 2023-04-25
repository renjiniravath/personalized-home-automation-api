const { getPreferencesOfUsers, addPreferencesOfUsers, updatePreferencesOfUsers, getAllSharedPreferencesOfUser } = require("../models/preferences")
const { getConnection } = require("../mqtt")

const getPreferencesController = (users) => {
    return getPreferencesOfUsers(users)
}

const getAllSharedPreferencesOfUserController = (user) => {
    return getAllSharedPreferencesOfUser(user)
}

const addPreferencesController = async (user, preferences) => {
    preferences = {"_id": user, ...preferences}
    const response = await addPreferencesOfUsers(preferences)
    const mqttClient = getConnection()
    mqttClient.publish("preferences/"+user, "updated", {qos: 2}, (err) => {
        if(err) throw err
    })
    return response
}

const updatePreferencesController = async (user, preferences) => {
    const response = await updatePreferencesOfUsers(user, preferences)
    const mqttClient = getConnection()
    mqttClient.publish("preferences/"+user, "updated", {qos: 2}, (err) => {
        if(err) throw err
    })
    return response
}

module.exports = { getPreferencesController, addPreferencesController, updatePreferencesController, getAllSharedPreferencesOfUserController }
