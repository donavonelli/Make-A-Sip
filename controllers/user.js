const express = require("express")
const router = express.Router();
const db = require("../models")

//My Profile page
router.get("/myProfile", (req,res) =>{
    console.log(req.session.id)
    const context = {
        user: res.locals.user,
    }
    res.render("profile",context)
})

module.exports = router;
