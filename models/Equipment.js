const mongoose = require("mongoose")

const equipmentSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        optional: Boolean

    }, 
)

const Equipment = mongoose.model("Equipment", equipmentSchema)

module.exports = Equipment;