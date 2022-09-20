//Connect through online database mongodb cluster
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://soumyajit:soumyajit@musicplayer.qqrryez.mongodb.net/music?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connection Succesfull")
}).catch((e)=>{
    console.log(e)
})
