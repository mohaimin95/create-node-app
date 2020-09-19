const User = require("../models/User");
const bcrypt = require("../helpers/bcrypt");
const jwt = require("../helpers/bcrypt");

let userController = {};

userController.register = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        const user = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: bcrypt.generateHash(password),

        });
        user.save((err, doc) => {
            if (err) {
                let message = "Error in Saving Data !",status=500;
                switch(String(err.code)) {
                    case '11000':
                     message = "Email Already Exists";
                     status = 409
                     break;
                }
                reject({
                    message,
                    status
                })
            } else {
                resolve({
                    message: "Registration success !",
                    token: generateToken(doc._id)
                });
            }
        });
    });

}
userController.login = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        User.findOne({ 'email': email.trim().toLowerCase() }, (err, user) => {
            if (err) {
                return reject({
                    status: 500,
                    message: "Error ! Try Again.",
                    error: err
                })
            } else {
                if (!user) {
                    return reject({
                        status: 401,
                        message: "Unauthorized user !"
                    })
                } else {
                    if (bcrypt.validate(password, user.password)) {
                        return resolve({
                            token: generateToken(user._id)
                        })
                    } else {
                        return reject({
                            status: 401,
                            message: "Unauthorized user !"
                        })
                    }

                }
            }
        });
    })
}
const generateToken = _id => jwt.generateHash({ _id, createdAt: new Date().getTime() })
module.exports = userController;