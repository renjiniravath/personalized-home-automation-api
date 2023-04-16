const { getPreferencesOfUsers, addPreferencesOfUsers, updatePreferencesOfUsers } = require("../models/preferences")

const getPreferencesController = (users) => {
    return getPreferencesOfUsers(users)
}

const addPreferencesController = (users, preferences) => {
    preferences = {"_id": users, ...preferences}
    return addPreferencesOfUsers(preferences)
}

const updatePreferencesController = (users, preferences) => {
    return updatePreferencesOfUsers(users, preferences)
}

module.exports = { getPreferencesController, addPreferencesController, updatePreferencesController }
