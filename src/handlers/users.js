const { getAuthorizedUsersController, checkIfUserIsAuthorizedController } = require("../controllers/users")

const getAuthorizedUsersHandler = async (req, res) => {
    try {
        const authorizedUsers = await getAuthorizedUsersController()
        res.status(200).send({
            authorizedUsers,
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

const checkIfUserIsAuthorizedHandler = async (req, res) => {
    try {
        const check = await checkIfUserIsAuthorizedController(req.params.user)
        if(check)
            res.status(200).send({ message: "User is authorized" })
        else  
            res.status(401).send({ errorMessage: "User is not authorized" })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

module.exports = {
    getAuthorizedUsersHandler,
    checkIfUserIsAuthorizedHandler
}