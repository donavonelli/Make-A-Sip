/* External Modules */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

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
// Home route 
app.get("/", (req,res)=>{
    res.render("home.ejs")
})
//Auth route
app.use("/", controllers.auth)


/* Server Listener */
app.listen(PORT, () => {
  console.log(`Server is live and listening at http://localhost:${PORT}`);
});
