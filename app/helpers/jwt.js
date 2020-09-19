const jwt = require("jsonwebtoken");
let { APP_KEY: key } = process.env;
let jwtClass = {};

jwtClass.generateToken = data => jwt.sign(data, key);
jwtClass.validateToken = token => {
    try {
        return jwt.verify(token, key);
    }
    catch (ex) {
        return null;
    }
}
module.exports = jwtClass;