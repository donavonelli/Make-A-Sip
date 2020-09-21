const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Ingredient",
            },
        ],
        equipment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Equipment",
            },
        ],
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
);

const Recipe = mongoose.model("Recipe", recipeSchema)

module.exports = Recipe;