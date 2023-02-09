const User = require("./model/users");
const UserService = require("./routes/service");

module.exports = UserService(User);
