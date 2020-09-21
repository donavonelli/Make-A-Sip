const express = require("express");
const router = express.Router();
const db = require("../models");

// index
router.get("/", (req, res) => {
    db.Recipe.find({}, (error, foundRecipes) => {
        if (error) return res.send(error);

        const context = {
            recipes: foundRecipes,
        };
        res.render("recipe/index", context);
    });
});

// new form (view the new recipe form)
router.get("/new", (req, res) => {
    res.render("recipe/new");
});

// create (this adds to db)
router.post("/", (req, res) => {
    db.Recipe.create(req.body, (error, createdRecipe) => {
        if (error) return res.send(error);
    })
    res.redirect("/recipes");
});

// show
router.get("/:id", (req, res) => {
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
        if (error) return res.send(error);
    })
    const context = { recipe: foundRecipe };
    res.render("recipe/show", context);
});

// edit (view the edit recipe page)
router.get("/:id/edit", (req, res) => {
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
        if (error) return res.send(error);
    })
    const context = { recipe: foundRecipe };
    res.render("recipe/edit", context);
});

// update (this updates the db)
router.put("/:id", (req, res) => {
    db.Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedRecipe) => {
        if (error) return res.send(error);
    })
    res.redirect(`/recipes/${updatedRecipe._id}`);
});

// delete
router.delete("/:id", (req, res) => {
    db.Recipe.findByIdAndDelete(req.params.id, (error, deletedRecipe) => {
        if (error) return res.send(error);
    })
    res.redirect("/recipes");
});

module.exports = router;