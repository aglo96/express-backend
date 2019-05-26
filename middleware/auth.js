/* const jwt = require('jsonwebtoken');
const User= require("")




const auth = async (req,res,next) => {
    try{
        const token = req.header("Authorization").replace('Bearer ', '');
        const decoded = jwt.verify(token, "secret"); 
        console.log(token)
    }catch(e){
        res.status(401).send({error: 'Please authenticate.'}) //token is invalid
    }
}  */


/* const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
const keys = require("../config/keys");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, keys.secretOrKey)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth  */

/* module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    }
  }; */