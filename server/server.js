const express = require('express');
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose')
const cors = require('cors');


const app = express();
 app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(cookieparser())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect("mongodb+srv://Authortication:Authortication@cluster0.cyjwf6m.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Suceess");
})

const router = require('./routes/user_route');
app.use('/api',router)

app.listen(PORT,() => {
    console.log(`Your Server running on ${PORT}`);
})