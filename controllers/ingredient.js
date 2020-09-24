const express = require("express");
const router = express.Router();
const db = require("../models");

// index
router.get("/", (req, res) => {
    db.Ingredient.find({}, (error, foundIngredients) => {
        if (error) return res.send(error);

        const context = {
            ingredients: foundIngredients,
        };
        res.render("ingredient/index", context);
    });
});

// new form (view the add new ingredient form)
router.get("/new", (req, res) => {
    res.render("ingredient/new");
});

// create (this adds to db)
router.post("/", (req, res) => {
    db.Ingredient.create(req.body, (error, createdIngredient) => {
        if (error) return res.send(error);
    })
    res.redirect("/ingredients");
});

// edit (view the edit ingredient page)
router.get("/:id/edit", (req, res) => {
    db.Ingredient.findById(req.params.id, (error, foundIngredient) =>  {
        if (error) return res.send(error);
    })
    const context = { ingredient: foundIngredient };
    res.render("ingredient/edit", context);
});

// update (this updates the db)
router.put("/:id", (req, res) => {
    db.Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedIngredient) => {
        if (error) return res.send(error);
    })
    res.redirect(`/ingredients/${updatedIngredient._id}`);
});

// delete
router.delete("/:id", (req, res) => {
    db.Ingredient.findByIdAndDelete(req.params.id, (error, deletedIngredient) => {
        if (error) return res.send(error);
    })
    res.redirect("/ingredients");
});


module.exports = router;