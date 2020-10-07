
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/api/users");

const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;



// Connecting to MongoDB Database
mongoose.connect(db, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connection to MongoDB database is successful");
})
.catch((error) => {
    console.error("We have encountered error connecting to MongoDB", error);
});


// Passport middleware
app.use(passport.initialize());


// Passport config
require("./config/passport")(passport);


// Routes
app.use("/api/users", users);


// Listening on Port
const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server is running and listening on ${port}!`)
});


