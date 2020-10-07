
require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// import routes
const productRouter = require("./routes/productRouter");


const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// All Routes
app.use('/api/products', productRouter);


// connection to mongodb database
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Connection to Database successfully")
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening on port", port);
})