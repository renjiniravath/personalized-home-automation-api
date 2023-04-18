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

        const requesters = [request.requesters];
        request.requesters = requesters;
        const result = await collection.insertOne(request)

        client.close()
        return result

    } catch (err) {  
        if(client)
            client.close();
        throw err;
    }
}

const updateRequest = async (users, requester, request) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')
        const collection = db.collection('requests');

        validFields = ['temperatureInF', 'fanSpeed', 'humidity', 'lightBrightness', 'lightColor'] 
        const preferences = {};
        for ([key, val] of Object.entries(request)) {
            if (validFields.includes(key))
                preferences['preferences.'+key] = val
        }
        
        await collection.updateOne(
            {_id: users},
            {
                $set:  {'requesters': [requester]}
            },
            {
                returnDocument: 'after'
            }, 
        )

        await collection.updateOne(
            {_id: users},
            {
                $set:  preferences
            },
            {
                returnDocument: 'after'
            }, 
        )
        const result = await collection.findOne({ _id: users })

        client.close()
        return result

    } catch (err) {  
        if(client)
            client.close();
        throw err;
    }    
}

const getRequest = async(user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('requests');
        let result = await collection.findOne(
            {_id: user},
        );
        client.close();
        return result

    } catch (err) { 
        if(client) 
            client.close();
        throw err;
    }

}

const removeRequest = async(user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')
        const collection = db.collection('requests');  
         
        const result = await collection.deleteOne(
            {_id: user}
        )
        client.close()
        return result

    } catch (err) {  
        if(client)
            client.close();
        throw err;
    }
}

const updateRequesters = async(users, request) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')
        const collection = db.collection('requests');  
         
        const result = await collection.findOneAndUpdate(
            {_id: users},
            {
                $set:  {'requesters': request}
            },
            {
                returnDocument: 'after'
            }, 
        )
        client.close()
        return result

    } catch (err) {  
        if(client)
            client.close();
        throw err;
    }
}
module.exports = {getAllRequestsOfUser, addRequest, updateRequest, getRequest, removeRequest, updateRequesters}