const mongoose = require("mongoose");

require("dotenv").config();
const connectionString = process.env.MONGODB_URI 


mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Mongodb connected....");
  })
  .catch(function (error) {
    console.log("Mongodb connection err", error);
  });

mongoose.connection.on("disconnect", function (event) {
  console.log("mongodb disconnected", event);
});

module.exports = {
    Equipment : require("./Equipment"),
    Ingredient: require("./Ingredient"),
    Recipe: require("./Recipe"),
    User: require("./User")
};