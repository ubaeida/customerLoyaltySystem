var bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}
const verifyPassword = (original, hashed) => {
    return bcrypt.compareSync(original, hashed)
}

module.exports = {
    hashPassword,
    verifyPassword
}