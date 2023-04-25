const mqtt = require('mqtt')

let client

const createConnection = () => {
    client = mqtt.connect('mqtt://192.168.0.191:1883', {clientId:"home-automation-api"})
}

const getConnection = () => {
    return client
}

module.exports = {
    createConnection,
    getConnection
}
