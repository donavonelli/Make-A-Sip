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







module.exports = router;
