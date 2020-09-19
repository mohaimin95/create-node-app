const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let bcryptJS = {};

bcryptJS.generateHash = password => password ? bcrypt.hashSync(String(password), salt) : null;

bcryptJS.validate = (plain, hashed) => bcrypt.compareSync(String(plain), hashed);

module.exports = bcryptJS;