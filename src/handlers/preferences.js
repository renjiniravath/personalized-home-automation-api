const { getPreferencesController, addPreferencesController, updatePreferencesController, getAllSharedPreferencesOfUserController } = require("../controllers/preferences")

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

const getAllSharedPreferencesOfUserHandler = async (req, res) => {
    try {
        const sharedPreferences = await getAllSharedPreferencesOfUserController(req.params.user)
        res.status(200).send({
            sharedPreferences
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
        await addPreferencesController(req.params.user, req.body)
        res.status(200).send({
            message: `${req.params.user}'s preferences were successfully saved`
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
        if (req.params.user.includes('-')){
            console.log("This API is only used to update individual user's preference")
            res.status(400).send({
                errorMessage: "This API is only used to update individual user's preference"
            })
            return
        }
        await updatePreferencesController(req.params.user, req.body)
        res.status(200).send({
            message: `${req.params.user}'s preferences were successfully updated`
        })
    } catch(exception) {
        console.log("Unexpected error occured ", exception)
        res.status(500).send({
            errorMessage: "Unexpected error occured. Check server logs"
        })
    }
}

module.exports = { getPreferencesHandler, addPreferencesHandler, updatePreferencesHandler, getAllSharedPreferencesOfUserHandler }