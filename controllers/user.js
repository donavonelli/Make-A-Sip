const express = require("express")
const router = express.Router();
const db = require("../models")

router.get("/:id", (req,res) =>{
    console.log(req.session.id)
    db.User.findById(req.params.id, (err,foundUser)=>{
        if(err) return err;
        res.render("profile", {user: foundUser})

    })
})

module.exports = router;
