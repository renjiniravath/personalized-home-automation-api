const { getAllRequestsController, addRequestController} = require("../controllers/requests")

const getAllRequestsHandler = async (req, res) => {
    try {
        const requests = await getAllRequestsController(req.params.user)
        res.status(200).send({
            requests
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}
const addRequestHandler = async (req, res) => {
    try {
        await addRequestController(req.params.users, req.body)
        res.status(200).send({
            message: `${req.params.users}'s shared preferences were succesfully saved`
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

module.exports = { getAllRequestsHandler, addRequestHandler}