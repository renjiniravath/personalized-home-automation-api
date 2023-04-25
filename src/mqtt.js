const mqtt = require('mqtt')

let client

const createConnection = () => {
    client = mqtt.connect(process.env.MQTT_BROKER_URL, {clientId: process.env.MQTT_CLIENT_ID})
}

const getConnection = () => {
    return client
}

module.exports = {
    createConnection,
    getConnection
}
