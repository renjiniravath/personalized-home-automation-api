const getDBConnection = require("../mongo");


const getPreferencesOfUsers = async (users) => {

    try {
        const client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('preferences');
        const preferences = await collection.findOne({ _id: users });

        client.close();

        return preferences || {};

    } catch (err) {
        client.close();
        throw err;
    }
}

const addPreferencesOfUsers = async (preferences) => {

    try {
        const client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('preferences')
        const result = await collection.insertOne(preferences)

        client.close()
        return result

    } catch (err) {  
        client.close();
        throw err;
    }
}

module.exports = { getPreferencesOfUsers, addPreferencesOfUsers }