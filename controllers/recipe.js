const express = require("express");
const router = express.Router();
const db = require("../models");

// index
router.get("/", (req, res) => {
    db.Recipe.find({}, (error, foundRecipes) => {
        if (error) return res.send(error);
        const context = {
            recipes: foundRecipes,
            user: res.locals.user
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
router.post("/",(req, res) => {
    req.body.user = req.session.loggedUser.id
    db.Recipe.create(req.body, async (error, createdRecipe) => {
        if (error) return res.send(error);
        const ingredients = req.body.ingredientId.filter(id => id.toLowerCase() !== "select an ingredient")
        createdRecipe.ingredients.push(...ingredients)
        await createdRecipe.save(async (err,recipe) => {
            await db.User.findByIdAndUpdate(req.body.user, {$addToSet:{createdDrinks:recipe._id}}, {new:true}, (err, user) =>{
            if (err) return res.send(error);
                res.redirect("/recipes");
            })
        })
    })
});

// show
router.get("/:id", (req, res) => {
    db.Recipe.findById(req.params.id).populate("user").populate("ingredients").exec( (error, foundRecipe) => {
        if (error) return res.send(error);
        const context = { recipe: foundRecipe,
        user:res.locals.user };
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
router.put("/:id", async (req, res) => {
    await db.Recipe.findById(req.params.id, async (err,foundRecipe) =>{
        if (err) return err;
        await db.User.findByIdAndUpdate(res.locals.user.id, {$addToSet:{favoriteDrinks:foundRecipe._id}}, { new: true }, (error, user) => {
            if (error) return res.send(error);
            res.redirect(`/user/profile/drinkLibrary`);
        })
    })
});

// delete
router.delete("/:id", async (req, res) => {
    await db.Recipe.findByIdAndDelete(req.params.id, (error, deletedRecipe) => {
        if (error) return res.send(error);

    })
    res.redirect("/recipes");
});

module.exports = router;