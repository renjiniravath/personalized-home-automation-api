const getDBConnection = require("../mongo");

const getAllRequestsOfUser = async (user) => {

    try {
        const client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('requests');
        const requestOfUser = await collection.find({ _id: {$regex: `.*${user}.*` }});

        let requestOfUsers = []
        await requestOfUser.forEach(doc => requestOfUsers.push(doc))
        client.close();
        return requestOfUsers

    } catch (err) {  
        client.close();
        throw err;
    }

}

module.exports = {getAllRequestsOfUser}