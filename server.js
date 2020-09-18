/* External Modules */
const express = require("express");
const methodOverride = require("method-override");

/* Internal Modules */
const db = require("./models");
const controllers = require("./controllers");

/* Instanced Modules */
const app = express();

/* Configuration */
const PORT = 3000;

app.set("view engine", "ejs");

/* middleware */
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* Routes */
app.get("/", (req,res)=>{
    res.render("home.ejs")
})


/* Server Listener */
app.listen(PORT, function () {
  console.log(`Server is live and listening at http://localhost:${PORT}`);
});
