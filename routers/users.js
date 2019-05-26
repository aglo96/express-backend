const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys.js");

const validateRegisterInput  = require("../validation/register.js");
const validateLoginInput = require("../validation/login.js");
const User = require("../models/User.js");


//For registration
router.post("/register", (req,res)=> {
    //form validation
    const {errors, isValid} = validateRegisterInput(req.body);
    //if not valid
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //if valid input, use MongoDB's User.findOne() to see if the user already exist
    User.findOne({email:req.body.email}).then(user=> {
        if (user) {
            return res.status(400).json({email:"Email already exists"});
        }
        //if user does not already exists in database, make new user
        const newUser = new User({name:req.body.name,email:req.body.email,password:req.body.password,isAdmin:req.body.isAdmin});
        //Hash password before saving in database
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash) => {
                if (err) {
                    throw err;
                }
                newUser.password = hash;
                newUser.save().then(user => {res.json(user) 
                }).catch(err => console.log(err));
            });
        })
    })
})






//For login
router.post("/login", (req,res) => {
    //Form validation
    const {errors, isValid} = validateLoginInput(req.body);
    //if not valid
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //if valid
    const email = req.body.email;
    const password = req.body.password;
    //Find user by email
    User.findOne({email}).then(user => {
        //if user don't exist in database
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        //if user exist check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User matched, create payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                //sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 31556926 },// expires in one year
                    (err,token) => {
                        res.json({success:true, token: "Bearer " + token})
                    }
                )
            }
            else { //if password dosen't match with database
                return res.status(400).json({passwordincorrect: "Password incorrect"})
            }
        })
    })
})



module.exports = router;