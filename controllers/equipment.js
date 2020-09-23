const express = require("express")
const router = express.Router();
const db = require("../models")

//new route
router.get("/", (req,res) => {
    res.render("equipment/new")
})

//create route
router.post("/", (req, res) => {
    db.Equipment.create(req.body, (error, createdEquipment) => {
        if (error) return res.send(error);
    })
    res.redirect("/equipment");
});

//index route / show all equipment
router.get("/index", (req,res) => {
    db.Equipment.find({}, (err,allEquipment) =>{
        if(err) return err ;
        const context = {
            equipment: allEquipment,
        }
        res.render("equipment/index", context)
    })
})






module.exports = router