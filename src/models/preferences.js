const getDBConnection = require("../mongo");


const getPreferencesOfUsers = async (users) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('preferences');
        const preferences = await collection.findOne({ _id: users });

        client.close();

        return preferences || {};

    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}

const addPreferencesOfUsers = async (preferences) => {
    let client
    try {
        const client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('preferences')
        const result = await collection.insertOne(preferences)

        client.close()
        return result

    } catch (err) {
        if (client)  
            client.close();
        throw err;
    }
}

module.exports = { getPreferencesOfUsers, addPreferencesOfUsers }