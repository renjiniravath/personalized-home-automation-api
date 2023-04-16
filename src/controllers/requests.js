const { getAllRequestsOfUser, addRequest, updateRequest } = require("../models/requests")

const getAllRequestsController = (user) => {
    return getAllRequestsOfUser(user)
}

const addRequestController = (users, request) => {
    request = {"_id": users, ...request}
    return addRequest(request)
}

const updateRequestController = (users, requester, request) => {
    return updateRequest(users, requester, request)
}

module.exports = {getAllRequestsController, addRequestController, updateRequestController}