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
//Create a Drink 
router.get("/profile/newDrink", (req, res) => {
    res.render("recipe/new");
});

module.exports = router;
