const { getAllRequestsController, addRequestController, updateRequestController, approveRequestController} = require("../controllers/requests")

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

const updateRequestHandler = async (req, res) => {
    try {
        if (!req.body.requester) {
            console.log("Requester should be specified")
            res.status(400).send({
                errorMessage: "Requester should be specified"
            })
            return
        }
        const response = await updateRequestController(req.params.users, req.body.requester, req.body.preferences)
        res.status(200).send(response)
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

const approveRequestHandler = async (req, res) => {
    try {
        if (!(req.params.users.includes(req.body.requesters))) {
            console.log("User not authorized")
            res.status(401).send({
                errorMessage: "User not authorized"
            })
            return
        }        
        const response = await approveRequestController(req.params.users, req.body)
        if (response === 2)
            res.status(200).send({
                message: `This request was marked as approved by everyone involved and moved to preferences`
            })
        else if (response === 3)
            res.status(200).send({
                message: `This request was marked as approved by ${req.body.requesters}`
            })
        else {
            console.log(`This request was already marked as approved by ${req.body.requesters}`)
            res.status(400).send({
                errorMessage: `This request was already marked as approved by ${req.body.requesters}`
            })
        }
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

module.exports = { getAllRequestsHandler, addRequestHandler, updateRequestHandler, approveRequestHandler}