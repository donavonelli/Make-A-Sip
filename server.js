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
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "fillertext",
  store: new MongoStore({
    url: "mongodb://localhost:27017/make-a-sip",
  }),
  cookie: {
    // milliseconds
    maxAge: 1000 * 60 * 60 * 24 * 7 *2
  } 
}));
// middleware to add user to all ejs views
app.use(function (req, res, next) {
  res.locals.user = req.session.loggedUser; // adds the user to all ejs views
  next();
});

/* Routes */
// Landing Page route 
app.get("/", (req,res)=>{
  res.render("landingPage.ejs")
})

//Home page after logged in
app.get("/home", (req,res)=>{
  res.render("home.ejs")
})

// Auth route
app.use("/", controllers.auth);

// Recipe route
app.use("/recipes", controllers.recipes);

//User route //use username
app.use("/user", controllers.user)


/* Server Listener */
app.listen(PORT, () => {
  console.log(`Server is live and listening at http://localhost:${PORT}`);
});
