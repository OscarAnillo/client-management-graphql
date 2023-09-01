const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    }
})

module.exports = new mongoose.model("Client", clientSchema);