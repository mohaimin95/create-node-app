
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim:true,
        min: 3
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        index:true,
        validate:{
            validator:(v) => validateEmail(v),
            message:"Please enter an valid email."
        }
    },
    password: {
        required: true,
        type: String,
        min: 6,
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = mongoose.model('user',User);