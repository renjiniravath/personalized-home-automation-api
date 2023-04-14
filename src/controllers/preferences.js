const { getPreferencesOfUsers, addPreferencesOfUsers } = require("../models/preferences")

const getPreferencesController = (users) => {
    return getPreferencesOfUsers(users)
}

const addPreferencesController = (users, preferences) => {
    preferences = {"_id": users, ...preferences}
    return addPreferencesOfUsers(preferences)
}

module.exports = { getPreferencesController, addPreferencesController }
