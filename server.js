const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require("./models/todo.model") //database model

app.use(cors());
app.use(bodyParser.json());

var mongoDB = 'mongodb+srv://awsomeag:97390636@agcluster-sdaji.mongodb.net/test?retryWrites=true';

/* mongoose.connect("mongodb://127.0.0.1:27017/todos", {useNewUrlParser:true}); //todos is the name of the database u created
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("mongo connection established successfully");
}); */

mongoose.connect(mongoDB, {useNewUrlParser:true}); //todos is the name of the database u created
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("mongo connection established successfully");
});

/* mongoose.connect(mongoDB, { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
 */


//retrieve entire database
todoRoutes.get("/", function(req,res) { //homepage
    Todo.find({}).then((todos) => {
        res.json(todos);
    }).catch((e)=> {
        res.status(500).send();
    });
});

//retrieve a single todo
todoRoutes.get("/:id", function(req,res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (!todo) {
            return res.status(404).send(); //todo not found
        }
        res.json(todo); 
    }).catch((e) => {
        res.status(500).send(); //error
    });
});

//delete a single item
todoRoutes.delete("/:id", function(req, res) {
    Todo.findByIdAndRemove(req.params.id, req.body, function(err,todo) {
        if (err) {
            console.log(err);
        }
        res.json(todo);
    } );
});

//add a single todo to the database

/* todoRoutes.route('/add').post(function(req,res) {
    let todo = new Todo(req.body);
    todo.save().then(todo=> {
        res.status(200).json({'todo':'todo added successfully'});
    })   
    .catch(err=> {
        res.status(400).send('adding new todo failed');
    });
}); */

// either this or the above will work
todoRoutes.post('/add', function(req, res, next) {
    Todo.create(req.body, function (err, data) {
      if (err) return next(err);
      res.json(data);
    })
  })



//update a todo 
todoRoutes.post("/update/:id", function(req,res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo) {
            res.status(404).send("data is not found");
        }
        else {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json("Todo updated");
            }).catch(err => {
                res.status(400).send("update not possible");
            });
        } 
    }); 
});


/* todoRoutes.post("/completed", function(req, res) {
    const todo;
    Todo.find({todo_completed:true}).then(todo=>{
        Todo.create(req.body, function(err, todo));
    });
}); */
    

/* Todo.find({
    todo_completed:true
}).then(todo => {
    console.log("Todos", todo);
}, */

app.use("/todos", todoRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
}); 