require('../src/db/mongoose')
const Task = require('../src/models/Task')

// Task.findByIdAndRemove('60d2df4bb378681a89550e33')
// .then((result)=> {
//     console.log(result)
//     return Task.countDocuments({completed: true})
// })
// .then((result) => {
//     console.log(result)
// })
// .catch((error)=> {
//     console.log(error)
// })


const deleteTaskAndCount = async (id) => {
    const removedUser = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: true })
    return { removedUser, count }
}

deleteTaskAndCount('60d2e068ffc4411ca966da6d')
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })



// Task.deleteMany({description : undefined})
// .then((result)=>{
//     console.log(result)
// })
// .catch((error)=>{
//     console.log(error)
// })