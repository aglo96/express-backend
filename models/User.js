const mongoose = require('mongoose');
const Todo = require('./todo.model.js');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    isAdmin: {
        type:Boolean,
        required:true
    },
    date: {
        type:Date,
        default: Date.now
    }


})

UserSchema.virtual('tasks', {  //setup virtua property to display relationship between user and tasks
    ref: 'Todo',
    localField: "_id", //user id
    foreignField:'owner'  //also user id, since owner is the user who created the task
}) 



module.exports = User = mongoose.model("users", UserSchema);


