const jwt = require("../helpers/jwt");
let auth = () => {
    return (req, res, next) => {
        let { authorization: token = null } = req.headers || {};
        let userObj = jwt.validateToken(token);
        if (token && userObj) {
            req.user = userObj;
            return next();
        } else {
            return res.status(401).send({ message: "Unauthorized Request !" });
        }
    }
}
module.exports = auth;