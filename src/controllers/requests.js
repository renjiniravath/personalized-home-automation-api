const { addPreferencesOfUsers } = require("../models/preferences")
const { getAllRequestsOfUser, addRequest, updateRequest, getRequest, removeRequest, updateRequesters} = require("../models/requests")
const { getConnection } = require("../mqtt")

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

    const requestRecord = await getRequest(users) 
    const existingRequesters = requestRecord.requesters
    const updatedRequestersString = [...existingRequesters, request.requester].sort().join('-')

    if(existingRequesters.includes(request.requester))
        return 1
    else if (updatedRequestersString ===  users) {
        await removeRequest(users)
        const preferences = {"_id":users ,...requestRecord.preferences}
        await addPreferencesOfUsers(preferences, true)
        const mqttClient = getConnection()
        mqttClient.publish("preferences/"+users, "updated", {qos: 2}, (err) => {
            if(err) throw err
        })
        return 2
    }
    else {
        const updatedRequesters = [...existingRequesters, request.requester]
        await updateRequesters(users,updatedRequesters)
        return 3
    }
}

module.exports = {getAllRequestsController, addRequestController, updateRequestController, approveRequestController}