const express = require('express')
const Router = new express.Router()
const Task = require('../models/Task')
const auth = require('../middlewares/auth')
const User = require('../models/User')




// Endpoints for tasks

Router.post('/tasks', auth, async (req, res) => {
    console.log('create Task')
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        const result = await task.save()
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save()
    // .then((result)=>{
    //     res.status(201).send(result)
    // })
    // .catch((error)=>{
    //     res.status(400).send(error)
    // })
})

Router.get('/tasks', auth, async (req, res) => {
    console.log('Read all tasks', req.user._id)
    try {
        //console.log(user)
        await req.user.populate('tasks').execPopulate()
        //console.log(user.tasks)

        //const tasks = await Task.find({})
        //return user ? res.send(user.tasks) : res.status(404).send()
        res.send(req.user.tasks)

    } catch (error) {
        res.status(500).send(error)
    }

    // Task.find({})
    // .then((tasks)=>{
    //     if(!tasks){
    //         return res.status(404).send()
    //     }
    //     res.send(tasks)
    // })
    // .catch((error)=>{
    //     res.status(500).send(error)
    // })
})

Router.get('/tasks/:id', auth, async (req, res) => {

    const id = req.params.id
    console.log('find Task ', id)

    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id })
        return task ? res.send(task) : res.status(404).send()
    } catch (error) {
        res.status(500).send(error)
    }

    // Task.findOne({_id: id})
    // .then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // })
    // .catch((error)=>{
    //     res.status(500).send(error)
    // })
})

Router.patch('/tasks/:id',auth, async (req, res) => {
    console.log('update')
    const allowed = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isOk = updates.every((key) => allowed.includes(key))

    if (!isOk) {
        return res.status(400).send({ error: 'Not allowed updates' })
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task) {
            throw new Error()
        }

        updates.forEach((key) => task[key] = req.body[key])
        const result = await task.save()


        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        return result ? res.send(result) : res.status(400).send()
    } catch (error) {
        res.status(500).send('Failed to update')
    }
})

Router.delete('/tasks/:id',auth,  async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if(!task) {
            throw new Error()
        }
        return task ? res.send(task) : res.status(400).send()
    } catch (error) {
        res.status(500).send("no found the task")
    }
})


module.exports = Router

