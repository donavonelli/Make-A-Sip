const express = require("express")
const router = express.Router();
const db = require("../models")
const bcrypt = require("bcryptjs")

//register form
router.get("/register", (req,res)=>{
    res.render("auth/register")
})

//login form
router.get("/login", (req,res)=>{
    res.render("auth/login")
})





module.exports = router;