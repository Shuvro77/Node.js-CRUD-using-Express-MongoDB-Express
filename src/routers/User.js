const express = require('express')
const Router = new express.Router()
const User = require('../models/User')
const auth = require('../middlewares/auth')



Router.post('/users', async (req, res)=>{
    console.log(req.body)
    const user = new User(req.body)
    
    try{
        //console.log("here creating")
        const {result, token} = await user.generateAuthToken()
        //const result = await user.save()
        res.status(201).send({result, token})
    } catch(error){
        res.status(400).send({error:error.toString()})
    }   
})

Router.post('/users/login', async (req, res) => {
    console.log("login ", req.body)
    try{
        const user = await User.findByCredentials(req.body)
        console.log(user)
        const {result, token} = await user.generateAuthToken()

        res.status(200).send({result,token})
    } catch(error) {
        res.status(400).send(error)
    }
})

Router.post('/users/logout',auth, async (req, res) => {
    console.log("logout ", req.body)
    try{
        const user = req.user
        user.tokens = user.tokens.filter((token)=> {
            return token.token != req.token
        })
        await user.save()

        res.status(200).send('Logged Out ALL')
    } catch(error) {
        res.status(500).send(error)
    }
})

Router.post('/users/logoutAll',auth, async (req,res) => {
    try {
       req.user.tokens = []

        await req.user.save()
        //console.log('logoutAll here')
        res.status(200).send()

    } catch(error){
        res.status(500).send({error: "failed to logoutAll"})
    }
})


Router.get('/users/me', auth, async (req,res) =>{
    console.log(req.body)
    res.status(200).send(req.user)
})

Router.patch('/users/me',auth, async (req,res) => {
    console.log('update')
    const allowed = ['age', 'name', 'email', 'password']
    const updates = Object.keys(req.body)
    const isOk = updates.every((key)=> allowed.includes(key))

    if(!isOk) {
        return res.status(400).send({error: 'Not allowed updates'})
    }

    try {
        const user = req.user

        updates.forEach((key) => user[key] = req.body[key])
        const result = await user.save()
        
        // await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        return result? res.send(result) : res.status(400).send()
    } catch(error){
        res.status(500).send(error) 
    }
})

Router.delete('/users/me',auth, async (req, res) => {
    console.log('delete')
    try {
        const result = await req.user.remove()
        // const user = await User.findByIdAndDelete(req.params.id)
        // return user? res.send(user) : res.status(400).send()
        console.log(result)
        res.status(200).send(result)
    } catch(error){
        res.status(500).send(error)
    }
})

module.exports = Router