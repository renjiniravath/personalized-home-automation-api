const { addPreferencesOfUsers } = require("../models/preferences")
const { getAllRequestsOfUser, addRequest, updateRequest, getRequest, removeRequest, updateRequesters} = require("../models/requests")

const getAllRequestsController = (user) => {
    return getAllRequestsOfUser(user)
}

const addRequestController = async (users, request) => {
    const requestRecord = await getRequest(users)
    if(requestRecord) {
        const requester = request.requester;
        return updateRequest(users, requester, request.preferences)  
    } else {
        request = {"_id": users, ...request}
        request.requesters = [ request.requester ]
        delete request.requester
        return addRequest(request)
    }
}

const updateRequestController = (users, requester, request) => {
    return updateRequest(users, requester, request)
}

const approveRequestController = async (users, request) => {

    requestRecord = await getRequest(users) 
    existingRequesters = requestRecord.requesters
    updatedRequestersString = [...existingRequesters,request.requesters].sort().join('-')

    if(existingRequesters.includes(request.requesters))
        return 1
    else if (updatedRequestersString ===  users) {
        await removeRequest(users)
        preferences = {"_id":users ,...requestRecord.preferences}
        await addPreferencesOfUsers(preferences, true)
        return 2
    }
    else {
        updatedRequesters = [...existingRequesters, request.requesters]
        await updateRequesters(users,updatedRequesters)
        return 3
    }
}

module.exports = {getAllRequestsController, addRequestController, updateRequestController, approveRequestController}