const router = require("express").Router();
const userController = require("../controllers/user.controller");
const Auth = require("../middlewares/auth");
router.post('/register', (req, res) => {
    let {
        email = null,
        password = null,
        name = null
    } = req.body;
    if (email && password && name && validateEmail(email)) {
        userController.register({
            email,
            password,
            name,
        }).then(data => res.send(data))
            .catch(err => {
                res.status(err.status || 500).send({ message: err.message || "error" })
            });
    } else {
        res.status(400).send({
            message: "Invalid/Missing email or password !"
        })
    }
});

router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        userController.login({
            email: req.body.email,
            password: req.body.password
        }).then(data => res.send(data))
            .catch(err => res.status(err.status || 500).send(err));
    } else {
        res.status(400).send({
            message: "Invalid/Missing email or password !"
        })
    }
});
router.post('/change-password', Auth(), (req, res) => {
    if (req.body.password) {
        userController.changePassword(req.body.password, req.user._id).then(() => res.send({ message: "Successfully Changed !" }))
            .catch(err => res.status(err.status || 500).send(err));
    } else {
        res.status(400).send({
            message: "Invalid/Missing Password"
        })
    }
});

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
module.exports = router;