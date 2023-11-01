const User = require("../../models/usersSchema.js");
const { joiRegister } = require("../../utils/joiValidation.js");
const requestError = require("../../utils/requestError.js");
const bcrypt = require('bcryptjs');
var gravatar = require('gravatar');
const sendVerificationEmail = require('../../utils/sendGridEmail.js');
const {v4: uuidv4} = require('uuid');

const userRegister = async (req, res, next) => {
  const { email, password } = req.body;

  const validationError = joiRegister({ email, password });

  if (validationError) {
    const error = requestError(400, validationError.message);
    throw error;
  }
  
  const userExist = await User.find({ email });
  if (userExist.length) {

    const errorUserExist = requestError(409, "Email in use" );

    throw errorUserExist;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const gravatarURL = gravatar.url(email, {s:250, protocol: "http",});
  
  const verificationToken = uuidv4();
  
  await sendVerificationEmail(email, verificationToken);

  const result = await User.create({
    email, 
    "password": hashedPassword,
    "avatarURL": gravatarURL,
    verificationToken
    });
  
  res.status(201).json({
    status: "created",
    code: 201,
    user: {
        "email": result.email,
        "subscription": result.subscription,
    }
  });

};

module.exports = userRegister;
