const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://127.0.0.1:27017'

const getDBConnection = async () => {
    const client = await MongoClient.connect(url)
    return client
}

module.exports = getDBConnection
