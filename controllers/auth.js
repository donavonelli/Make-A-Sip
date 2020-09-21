const express = require("express")
const router = express.Router();
const db = require("../models")
const bcrypt = require("bcryptjs")

//register form
router.get("/register", (req,res)=>{
    res.render("auth/register")
})

//register user in DB
router.post("/register", async (req,res)=>{
    try{
        const foundEmail = await db.User.findOne({email: req.body.email});
        const foundUsername = await db.User.findOne({username: req.body.username});
        if(foundEmail){
            return res.send("Email already registered")
        }
        if(foundUsername){
            return res.send("Username already registered")
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash
        await db.User.create(req.body);
        res.redirect("/myProfile")
    } catch (err) {
        return res.send("Internal Service Error: ", err)
    }
})

//login form
router.get("/login", (req,res)=>{
    res.render("auth/login")
})

//login authenication

//My




module.exports = router;