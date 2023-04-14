const { getOccupantsOfRoomController, userScanController, getRoomSettings } = require("../controllers/rooms")

const getOccupantsOfRoomHandler = async (req, res) => {
    try {
        const occupants = await getOccupantsOfRoomController(req.params.room)
        res.status(200).send({
            occupants
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

const userScanHandler = async (req, res) => {
    try {
        const response = await userScanController(req.params.room, req.params.user)
        res.status(200).send(response)
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

const getRoomSettingsHandler = async (req, res) => {
    try {
        const response = await getRoomSettings(req.params.room)
        res.status(200).send(response)
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

module.exports = {
    getOccupantsOfRoomHandler,
    userScanHandler,
    getRoomSettingsHandler
}