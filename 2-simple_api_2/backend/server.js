const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// MongoDB Database
const mongodbURL = "mongodb+srv://mark_api_2:mark12345@simple-api-two.fidff.mongodb.net/simple-api-two?retryWrites=true&w=majority";

// connection to the mongodb database
mongoose.connect(mongodbURL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let db = mongoose.connection;

db.once("open", () => console.log("connection to the database is successful"));

// we are checking if the connection to the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:")); 


/* (optional) it is only made for logging and bodyParser is use the 
parse the require body to be a readable json format */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


// This is our get method: This method is use to get all Data from our database
router.get('/getAllData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({
            success: true,
            data: data
        });
        return res.json({ success: true, data: data });
    });
});


// This is our update method: This method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


// This is our delete method: This method removes existing data from our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


// This is our create single data method: This create a new single data in our database
router.post('/createSingleData', (req, res) => {
    let data = new Data();
    const { id, message } = req.body;
    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'This Data is already exist in the database'
        });
    }
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


// This is the main routes
app.use('/api', router);


// Listening the to our app on it's port
app.listen(API_PORT, () => console.log(`Server is running on PORT ${API_PORT}`));
