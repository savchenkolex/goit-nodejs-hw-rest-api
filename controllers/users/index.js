const userRegister = require('./userRegister.js');
const userLogin = require('./userLogin.js');
const userLogout = require('./userLogout.js');
const userAll = require('./userAll.js');
const userCurrent = require('./userCurrent.js');
const userAvatars = require('./userAvatars.js');
const userGetAvatars = require('./userGetAvatars.js');
const userVerificationEmail = require('./userVerificationEmail.js');
const resendVerificationEmail = require('./resendVerificationEmail.js');

module.exports = {
    userRegister,
    userLogin,
    userLogout,
    userAll,
    userCurrent,
    userAvatars,
    userGetAvatars,
    userVerificationEmail,
    resendVerificationEmail
}