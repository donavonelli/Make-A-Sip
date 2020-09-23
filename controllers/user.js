const express = require("express")
const router = express.Router();
const db = require("../models")

//My Profile page
router.get("/profile", (req,res) =>{
    const context = {
        user: res.locals.user,
    }
    res.render("user/profile",context)
})

//My Info Page
router.get("/profile/myInfo", (req,res) => {
    const context = {
        user: res.locals.user,
    }
    res.render("user/info", context)
})
//My favorite Drinks
router.get("/profile/favoriteDrinks", (req,res) => {
    const context = {
        user: res.locals.user,
    }
    res.render("user/favoriteDrinks", context)
})
//My created drinks
router.get("/profile/createdDrinks", (req,res) => {
    const context = {
        user: res.locals.user,
    }
    res.render("user/createdDrinks", context)
})
//Create a Drink page
router.get("/profile/newDrink", (req, res) => {
    res.render("recipe/new");
});

//Create a drink post
router.post("/recipes/new", async (req, res) => {
    const {name, ingredients, method, equipment} = req.body
    try {
        const ingredient = await db.Ingredient.findOne(ingredients)
        const equipments = await db.Equipment.findOne(equipment)
        const newRecipe = {
            name: name,
            ingredients: ingredient,
            method: method,
            equipment: equipments,
        }
        console.log(newRecipe)
        // const recipe = await db.Recipe.create()
    } catch (error) {
        return console.log(error)
    }
    /* res.redirect("/recipes"); */
});
// show
router.get("/:id", (req, res) => {
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
        if (error) return res.send(error);
    })
    const context = { recipe: foundRecipe };
    res.render("recipe/show", context);
});







module.exports = router;
