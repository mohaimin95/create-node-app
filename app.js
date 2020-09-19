require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const usersRoute = require("./app/routes/users");

const app = express();
const {
    PORT,
    DB_URL
} = process.env;


app.use(express.json());
app.use("/user",usersRoute);
app.get("/", (req, res) => {
    res.send({
        status: "running"
    })
});


app.listen(PORT, err => {
    if (err) {
        console.log("Error in connection", err);
    } else {
        console.log("Server running in port", PORT);
        mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, err => {
            if (err) console.log("Error in DB connection", err);
            else console.log("DB Connected !");
        });
    }
});