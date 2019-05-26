const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");

const PORT = 4000;
const todoRouter = require("./routers/todo.js");
const users = require("./routers/users.js");

const app = express();

//application-level middleware
/* app.use((req,res,next) => {
    res.status(503).send("Site is under maintenance!") //show website is under maintenance message.this middleware will be used for all requests
}) */

// Bodyparser middleware
/* app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );   */


  
app.use(cors());
app.use(bodyParser.json());



 // Passport middleware
 app.use(passport.initialize());
 // Passport config
 require("./config/passport")(passport);
 // Routes
 app.use("/users", users); 
 app.use("/todos", todoRouter);

var mongoDB = 'mongodb+srv://awsomeag:97390636@agcluster-sdaji.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, {useNewUrlParser:true}); //todos is the name of the database u created
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("mongo connection established successfully");
});




app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
}); 



//JWT
/* const jwt = require("jsonwebtoken");
const myFunction = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse'); //returns a new authentication token to client to perform privileged tasks
    const data = jwt.verify(token, 'thisismynewcourse');
} 
 */
