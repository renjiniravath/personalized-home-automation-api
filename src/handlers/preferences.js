const { getPreferencesController, addPreferencesController, updatePreferencesController } = require("../controllers/preferences")

const getPreferencesHandler = async (req, res) => {
    try {
        const preferences = await getPreferencesController(req.params.users)
        res.status(200).send({
            preferences
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

const addPreferencesHandler = async (req, res) => {
    try {
        console.log(req.body)
        await addPreferencesController(req.params.users, req.body)
        res.status(200).send({
            message: `${req.params.users}'s preferences were succesfully saved`
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

const updatePreferencesHandler = async (req, res) => {
    try {
        if (req.params.users.includes('-')){
            console.log("This API is only used to update individual user's preference")
            res.status(500).send({
                errorMessage: "This API is only used to update individual user's preference"
            })
            return
        }
        const response = await updatePreferencesController(req.params.users, req.body)
        res.status(200).send(response)
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

module.exports = { getPreferencesHandler, addPreferencesHandler, updatePreferencesHandler }