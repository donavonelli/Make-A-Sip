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
//Drink Library
router.get("/profile/drinkLibrary", async (req,res) => {
    await db.User.findById(res.locals.user.id).populate("favoriteDrinks").exec((err, foundUser)=>{

        const context = {
                user: foundUser,
            }
        res.render("user/drinkLibrary", context)
    
    })    
    })

//My created drinks
router.get("/profile/createdDrinks", async (req,res) => {
    await db.Recipe.find({user:res.locals.user.id}, (error,foundRecipes)=>{
        if (error) return res.send(error);
        console.log(foundRecipes)
        const context = {
            recipes: foundRecipes,
        }
        res.render("user/createdDrinks", context)
    })
})
//Create a Drink page
// router.get("/profile/newDrink", (req, res) => {
//     res.render("recipe/new");
// });

//Create a drink post
// router.post("/recipes/new", async (req, res) => {
//     const {name, ingredients, method, equipment} = req.body
//     try {
//         const ingredient = await db.Ingredient.findOne(ingredients)
//         const equipments = await db.Equipment.findOne(equipment)
//         const newRecipe = {
//             name: name,
//             ingredients: ingredient,
//             method: method,
//             equipment: equipments,
//         }
//         console.log(newRecipe)
        // const recipe = await db.Recipe.create()
    // } catch (error) {
    //     return console.log(error)
    // }
    /* res.redirect("/recipes"); */
// });







module.exports = router;
