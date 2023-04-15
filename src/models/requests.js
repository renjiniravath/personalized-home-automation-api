const getDBConnection = require("../mongo");

const getAllRequestsOfUser = async (user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('requests');
        const requestOfUser = await collection.find({ _id: {$regex: `.*${user}.*` }});

        let requestOfUsers = []
        await requestOfUser.forEach(doc => requestOfUsers.push(doc))
        client.close();
        return requestOfUsers

    } catch (err) { 
        if(client) 
            client.close();
        throw err;
    }

}

const addRequest = async (request) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('requests');
        const result = await collection.insertOne(request)

        client.close()
        return result

    } catch (err) {  
        if(client)
            client.close();
        throw err;
    }
}

module.exports = {getAllRequestsOfUser, addRequest}