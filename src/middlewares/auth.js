const jwt = require('jsonwebtoken')
const User = require('../models/User')


const auth = async (req, res, next) => {
    try {
        const token = req.header('authorization').replace('Bearer ', '')
        const _id = jwt.verify(token, 'auth')._id
        const user = await User.findOne({_id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token

        //console.log(token, 'id: ',_id, user)
        next()
    } catch (e){
        res.status(500).send({error: 'Please authenticate!'})
    }
    
    
    
}

module.exports = auth