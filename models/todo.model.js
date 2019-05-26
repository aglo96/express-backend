const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator  = require('validator');

let Todo = new Schema({
    todo_description: {
        type: String, //validation
        required:true,
        trim:true //trim leading and trailing whitespaces
    },
    todo_responsible: {
        type:String,
        required:true,
        trim:true
    },
    todo_priority: {
        type:String,    
        required:true
    },
    /* todo_email: {
        type:String,
        required:true,
        unique:true, //each email should ne unique
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) { //USING NPM VALIDATOR
                throw new Error('Email is invalid');
            }
        }
    }, */

    todo_completed: {
        type:Boolean
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User" //same name as User in User.js model
    } 

});

module.exports = mongoose.model("Todo", Todo ); 
