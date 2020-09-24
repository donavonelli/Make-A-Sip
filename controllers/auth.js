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
            return res.status("Email already registered")
        }
        if(foundUsername){
            return res.status("Username already registered")
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash
        await db.User.create(req.body);
        res.redirect("/user/profile")
        console.log(req.body)
    } catch (err) {
        return res.status("Internal Service Error: ", err)
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
        if(foundUsername){
            const match = await bcrypt.compare(req.body.password, foundUsername.password);
            if(!match) {
                return res.send("Password incorrect")
                }
            req.session.loggedUser = {
                username: foundUsername.username,
                email: foundUsername.email,
                id: foundUsername._id,
            
        }
    }
        if(foundEmail){
            const match = await bcrypt.compare(req.body.password, foundEmail.password);
            if(!match) {
                return res.send("Password incorrect")
                }
            req.session.loggedUser = {
                username: foundEmail.username,
                email: foundEmail.email,
                id: foundEmail._id,
            }
        }
    res.redirect("/home")
    } catch (error) {
        return res.send("Internal Service Error", error)
    }
})





module.exports = router;