const MongoClient = require('mongodb').MongoClient

const url = process.env.MONGO_DB_URL

const getDBConnection = async () => {
    const client = await MongoClient.connect(url)
    return client
}

module.exports = getDBConnection
