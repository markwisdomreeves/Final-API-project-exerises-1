
require('dotenv').config();
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require("./routers/user");
// const db = require("./database/db");


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// All Routes
app.use(userRoute);


// Connection to mongodb database
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log("Connection to mongodb database has failed", err)
    }
    console.log("Connection to mongodb database is successful")
})


const port = process.env.PORT || 3000;
// Listening on port
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})