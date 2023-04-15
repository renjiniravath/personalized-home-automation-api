const getDBConnection = require("../mongo");

const getAuthorizedUsers = async () => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('users');
        const authorizedUsers = await collection.findOne({ _id: "authorized" });

        client.close();
        return authorizedUsers.usernames;
    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}

const checkIfUserIsAuthorized = async (user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('users');
        const result = await collection.findOne({ usernames: user });

        client.close();
        return !!result;
    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}

module.exports = {getAuthorizedUsers, checkIfUserIsAuthorized}