const {MongoClient, ObjectID} = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


// MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
//     if(error) {
//         return console.log('Errror: ==> ', error)
//     }
//     const db = client.db(databaseName)
//     // --> create
//     // db.collection('users').insertOne({
//     //     name: 'ts',
//     //     age: '26'
//     // })

//     // --> query

//     // db.collection('users').findOne({_id: new ObjectID("60d1e22fc3292a5f3a24b98d")},(error, result)=>{
//     //     if(error) {
//     //         return console.log(error)
//     //     }
//     //     console.log(result)
//     // })

//     // db.collection('users').find({}).sort('name',-1).limit(3).toArray((error, documents)=>{
//     //     if(error) {
//     //         return console.log(error)
//     //     }
//     //     console.log(documents)
//     // })


//     // // update 
//     // db.collection('users').updateOne({ _id: new ObjectID('60d1e263ee22725f7d1978b0') }, {$set:{name: 'Lolipop'}})
//     // .then((result)=> console.log(result))
//     // .catch((error)=> console.log(error))



//     // delete
//     db.collection('users').deleteMany({name:'ts'})
//     .then((result)=> console.log(result))
//     .catch((error)=> console.log(error))
// })




// MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
//     if(error) {
//         return console.log('error: ',error)
//     }

//     const db = client.db(databaseName)
//     // db.collection('tasks').insertMany([
//     //     {
//     //         description: "d1",
//     //         completed: false
//     //     },
//     //     {
//     //         description: "d2",
//     //         completed: true
//     //     },
//     //     {
//     //         description: "d3",
//     //         completed: false
//     //     }
//     // ],( error, result) => {
//     //     console.log(result.ops)
//     // })

//     // db.collection('tasks').findOne({_id: new ObjectID("60d1fbd0cede0f6c21f2f0d0")},(error, result)=>{
//     //     if(error) {
//     //         return console.log(error)
//     //     }
//     //     console.log(result)
//     // })

//     // db.collection('tasks').find({}).toArray((error, documents)=>{
//     //     if(error) {
//     //         return console.log(error)
//     //     }
//     //     console.log(documents)
//     // })

//     // db.collection('tasks').find({}).count((error, documents)=>{
//     //     if(error) {
//     //         return console.log(error)
//     //     }
//     //     console.log(documents)
//     // })

//     // db.collection('tasks').updateMany({completed: false},{$set:{completed: true}})
//     // .then((result)=>console.log(result.modifiedCount))
//     // .catch((error)=> console.log(error))

//     db.collection('tasks').deleteOne({description: 'd2'})
//     .then((result)=> console.log(result))
//     .catch((error)=> console.log(error))
// })