/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const path = require("path");

/* Internal Modules */
const db = require("./models");
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();

/* Configuration */
const PORT = 3000;

app.set("view engine", "ejs");

/* middleware */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


/* Routes */
// Home route 
app.get("/", (req,res)=>{
    res.render("home.ejs")
});

// Auth route
app.use("/", controllers.auth);

// Recipe route
app.use("/recipes", controllers.recipes);

// Ingredient route
app.use("/ingredients", controllers.ingredients);


/* Server Listener */
app.listen(PORT, () => {
  console.log(`Server is live and listening at http://localhost:${PORT}`);
});
