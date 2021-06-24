const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         trim: true,
//         isRequired: true
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         isRequired: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Need a valid Email Address')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value<0) {
//                 throw new Error("Value need to be positive")
//             }
//         }
//     }
// })

// const me = new User({
//     name: '    Shuvro        ',
//     email: '   shuvRo@gMail.com   ',
//     age: 26
// })

// me.save()
// .then((result)=> console.log(result))
// .catch((error) => console.log(error))




// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         isRequired: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Task({
//     description: '               d2'
// })

// task.save()
// .then((result)=> console.log(result))
// .catch((error) => console.log(error))

