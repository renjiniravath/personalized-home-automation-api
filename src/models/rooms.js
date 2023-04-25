const getDBConnection = require("../mongo");

const getOccupantsOfRoom = async (room) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('rooms');
        const roomData = await collection.findOne({ _id: room });

        client.close();
        return roomData.occupants.sort();
    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}

const addOccupantToRoom = async (room, user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('rooms');

        const result = await collection.findOneAndUpdate(
            {_id: room},
            {
                $addToSet: { occupants: user }
            },
            { 
                returnDocument: 'after'
            },
        )
        client.close()
        return result.value.occupants
    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}

const removeOccupantFromRoom = async (room, user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('rooms');

        const result = await collection.findOneAndUpdate(
            {_id: room},
            {
                $pull: {occupants:  user}
            },
            { 
                returnDocument: 'after'
            },
        )
        client.close()
        return result.value.occupants
    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}

const checkIfOccupantInRoom = async (room, user) => {
    let client
    try {
        client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('rooms');
        const result = await collection.findOne({ _id: room, occupants: user });

        client.close()
        return !!result

    } catch (err) {
        if (client)
            client.close();
        throw err;
    }
}
module.exports = {
    getOccupantsOfRoom,
    addOccupantToRoom,
    removeOccupantFromRoom,
    checkIfOccupantInRoom
}