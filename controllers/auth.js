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
        console.log(req.body)
    } catch (err) {
        return res.send("Internal Service Error: ", err)
    }
})

//login form
router.get("/login", (req,res)=>{
    res.render("auth/login")
})

//login authenication
router.post("/login", async (req,res)=>{
    try {
        const foundUsername = await db.User.findOne({username: req.body.usernameEmail})
        const foundEmail = await db.User.findOne({email: req.body.usernameEmail})
        if(!foundUsername&&!foundEmail){
            return res.send("User or Email doesn't exist")
        }
        const match = await bcrypt.compare(req.body.password, foundUsername.password);
        const match2 = await bcrypt.compare(req.body.password, foundEmail.password)
        if(!match&&!match2) {
            return res.send("Password incorrect")
            }
        if(foundUsername){
        req.session.loggedUser = {
            username: foundUsername.username,
            email: foundUsername.email,
            id: foundUsername._id,
        }
    } else {
        req.session.loggedUser = {
            username: foundEmail.username,
            email: foundEmail.email,
            id: foundEmail._id,
        }
    }
    res.redirect("/")
    } catch (error) {
        return res.send("Internal Service Error", error)
    }
})

//My Profile page
router.get("/myProfile", (req,res)=>{
    res.render("auth/profile")
})




module.exports = router;