const { getAllRequestsController } = require("../controllers/request")

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

module.exports = { getAllRequestsHandler}