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

// create
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

// update


// delete

module.exports = router;