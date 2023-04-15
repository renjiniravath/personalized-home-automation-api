const { getAllRequestsOfUser } = require("../models/request")

const getAllRequestsController = (user) => {
    return getAllRequestsOfUser(user)
}

module.exports = {getAllRequestsController}