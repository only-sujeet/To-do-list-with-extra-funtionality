const mongoose = require("mongoose")

const ConnectDB = () => {
        const mongoUrl = "mongodb://127.0.0.1:27017/projectv"

        mongoose.connect(mongoUrl).then(() => { console.log("database is connected") })
        .catch((error) => { console.log(error.message) })
}

module.exports = ConnectDB