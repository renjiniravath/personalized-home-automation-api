const getDBConnection = require("../mongo");

const getOccupantsOfRoom = async (room) => {
    try {
        const client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('rooms');
        const roomData = await collection.findOne({ _id: room });

        client.close();
        return roomData.occupants;
    } catch (err) {
        client.close();
        throw err;
    }
}

const addOccupantToRoom = async (room, user) => {
    try {
        const client = await getDBConnection()
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
        client.close();
        throw err;
    }
}

const removeOccupantFromRoom = async (room, user) => {
    try {
        const client = await getDBConnection()
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
        client.close();
        throw err;
    }
}

const checkIfOccupantInRoom = async (room, user) => {
    try {
        const client = await getDBConnection()
        const db = client.db('personalizedHomeAutomation')

        const collection = db.collection('rooms');
        const result = await collection.findOne({ _id: room, occupants: user });

        client.close()
        return !!result

    } catch (err) {
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