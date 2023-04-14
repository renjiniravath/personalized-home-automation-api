const { getAuthorizedUsers, checkIfUserIsAuthorized } = require("../models/users")

const getAuthorizedUsersController = () => {
    return getAuthorizedUsers()
}

const checkIfUserIsAuthorizedController = (user) => {
    return checkIfUserIsAuthorized(user)
}

module.exports = {getAuthorizedUsersController, checkIfUserIsAuthorizedController}