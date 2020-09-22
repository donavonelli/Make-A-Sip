const express = require("express")
const router = express.Router();
const db = require("../models")

//My Profile page
router.get("/myProfile", (req,res) =>{
    const context = {
        user: res.locals.user,
    }
    res.render("user/profile",context)
})

//My Info Page
router.get("/myProfile/myInfo", (req,res) => {
    const context = {
        user: res.locals.user,
    }
    res.render("user/myInfo", context)
})
//My favorite Drinks

//My created drinks

//Create a Drink 


module.exports = router;
