const express = require('express')
require('./db/mongoose')

const userRouter = require('../src/routers/User')
const taskRouter = require('../src/routers/Task')

const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000


// middle ware for routers

// app.use((req,res, next)=> {
//     console.log(req)
//     res.status(503).send('Under Manintenance')
// })


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const Task = require('../src/models/Task')
const User = require('../src/models/User')

const myFun = async() => {
    // const task = await Task.findById('60d48427923eea7277a14aa3')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('60d465680a4764660cc0577a')
    // await user.populate('tasks').execPopulate()
    //console.log('tasks', user.tasks)

}

myFun()





app.listen(port, () => {
    console.log('Server is up!')
})

