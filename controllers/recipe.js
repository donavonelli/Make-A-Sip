const express = require("express");
const router = express.Router();
const db = require("../models");

// index
router.get("/", (req, res) => {
    db.Recipe.find({}, (error, foundRecipes) => {
        if (error) return res.send(error);
        console.log(foundRecipes);
        const context = {
            recipes: foundRecipes,
        };
        res.render("recipe/index", context);
    });
});

// new form (view the new recipe form)
router.get("/new", (req, res) => {
    db.Ingredient.find({}, (error, foundIngredient) => {
        if (error) return res.send(error);

        const context = {
            ingredients: foundIngredient,
        };
        res.render("recipe/new", context);
    }); 
});

// create (this adds to db)
router.post("/", (req, res) => {
    console.log(req.body)
    db.Recipe.create(req.body, (error, createdRecipe) => {
        if (error) return res.send(error);
        const ingredients = req.body.ingredientId.filter(id => id.toLowerCase() !== "select an ingredient")
        createdRecipe.ingredients.push(...ingredients)
        createdRecipe.save((err) => {
            res.redirect("/recipes");
        })
    })
});

// show
router.get("/:id", (req, res) => {
    db.Recipe.findById(req.params.id, (error, foundRecipe) => {
        if (error) return res.send(error);
        const context = { recipe: foundRecipe };
        res.render("recipe/show", context);
    })
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