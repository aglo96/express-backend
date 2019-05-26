const express = require('express');
const router = new express.Router();
const Todo = require("../models/todo.model.js");
const passport = require("passport");
const jwt = require('jsonwebtoken');


router.get("/", function(req,res) { //homepage
    Todo.find({}).then((todos) => {
        res.json(todos);
    }).catch((e)=> {
        res.status(500).send();
    });
});

// router.get("/", passport.authenticate('jwt', {session:false}), function(req,res) { //homepage
//     if (req.user.isAdmin === true) {
//         Todo.find({}).then((todos) => {
//             res.json(todos);
//         }).catch((e)=> {
//             res.status(500).send();
//         });
//     }
//     else {
//         Todo.find({owner:req.user._id}).then((todos) => {
//             res.json(todos);
//         }).catch((e)=> {
//             res.status(500).send();
//         });
//     }
// });

//retrieve a single todo
router.get("/:id", function(req,res) {
    const id = req.params.id;
    Todo.findById(id, function(err, todo) {
        if (!todo) {
            return res.status(404).send(); //todo not found
        }
        res.json(todo); 
    }).catch((e) => {
        res.status(500).send(); //error
    });
});   

//retrieve a single todo
// router.get("/:id", passport.authenticate('jwt', {session:false}), function(req,res) {
//     const id = req.params.id;
//     if (req.user.isAdmin === true) {
//         Todo.findById(id, function(err, todo) {
//             if (!todo) {
//                 return res.status(404).send(); //todo not found
//             }
//             res.json(todo); 
//         }).catch((e) => {
//             res.status(500).send(); //error
//         });
//     }
//     else {
//         Todo.findOne({_id: id, owner: req.user._id} , function(err, todo) {
//             if (!todo) {
//                 return res.status(404).send(); //todo not found
//             }
//             res.json(todo); 
//         }).catch((e) => {
//             res.status(500).send(); //error
//         });
//     }
// })

//idk why this dosen't work
/* router.get('/:id', passport.authenticate('jwt', {session:false}), async (req, res) => {
    const id = req.params.id

    try {
        let todo = await Task.findOne({ _id: id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }

        res.json(todo);
    } catch (e) {
        res.status(500).send()
        console.log("Sdsds");
    }
}) */


// //delete a single item
// router.delete("/:id",passport.authenticate('jwt', { session: false }),  function(req, res) {
//     if (req.user.isAdmin ===true) {
//         Todo.findByIdAndDelete({ _id: req.params.id}, function(err,todo) {
//             if (err) {
//                 console.log(err);
//             }
//             res.json(todo);
//         } );
//     }
//     else {
//         Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id }, function(err,todo) {
//             if (err) {
//                 console.log(err);
//             }
//             res.json(todo);
//         } );
//     }
// });

//add a single todo to the database

// todoRoutes.route('/add').post(function(req,res) {
//     let todo = new Todo(req.body);
//     todo.save().then(todo=> {
//         res.status(200).json({'todo':'todo added successfully'});
//     })   
//     .catch(err=> {
//         res.status(400).send('adding new todo failed');
//     });
// });

// either this or the above will work
router.post('/add', function(req, res, next) {
    Todo.create(req.body, function (err, data) {
      if (err) return next(err);
      res.json(data);
    })
  })

//   router.post('/add', passport.authenticate('jwt', { session: false }), async (req,res) => {
//       const todo = new Todo({
//           ...req.body,
//           owner:req.user._id 
//       })
//       try {
//           await todo.save();
//           res.status(201).send(todo);
//       }catch(e) {
//           res.status(400).send(e);
//       }
//   })


//update a todo 
/* router.post("/update/:id", function(req,res) {
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
});  */
// router.post("/update/:id", passport.authenticate('jwt', { session: false }), function(req,res) {
//     const id = req.params.id;
//     if (req.user.isAdmin===true) {
//         Todo.findById(req.params.id, function(err, todo) {
//             if (!todo) {
//                 res.status(404).send("data is not found");
//             }
//             else {
//                 todo.todo_description = req.body.todo_description;
//                 todo.todo_responsible = req.body.todo_responsible;
//                 todo.todo_priority = req.body.todo_priority;    
//                 todo.todo_completed = req.body.todo_completed;
    
//                 todo.save().then(todo => {
//                     res.json("Todo updated");
//                 }).catch(err => {
//                     res.status(400).send("update not possible");
//                 });
//             } 
//         }); 
//     }
//     else {
//         Todo.findOne({_id:id, owner: req.user._id}, function(err, todo) {
//             if (!todo) {
//                 res.status(404).send("data is not found");
//             }
//             else {
//                 todo.todo_description = req.body.todo_description;
//                 todo.todo_responsible = req.body.todo_responsible;
//                 todo.todo_priority = req.body.todo_priority;
//                 todo.todo_completed = req.body.todo_completed;
    
//                 todo.save().then(todo => {
//                     res.json("Todo updated");
//                 }).catch(err => {
//                     res.status(400).send("update not possible");
//                 });
//             } 
//         }); 
//     }
// });
 

module.exports = router