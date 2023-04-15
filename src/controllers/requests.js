const { getAllRequestsOfUser, addRequest } = require("../models/requests")

const getAllRequestsController = (user) => {
    return getAllRequestsOfUser(user)
}

const addRequestController = (users, request) => {
    request = {"_id": users, ...request}
    return addRequest(request)
}

module.exports = {getAllRequestsController, addRequestController}