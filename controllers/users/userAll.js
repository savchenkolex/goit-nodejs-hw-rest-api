const User = require("../../models/usersSchema.js");

const requestError = require("../../utils/requestError.js");

const userAll = async (req, res, next) => {
    
    const { _id } = req.user; 
    const {level} = await User.findById(_id);

    if(level === "admin"){
        const users = await User.find({}, {email: 1, password: 1, avatarURL: 1});
        const count = await User.countDocuments({});
        res.json({
            count,
            data: users
        });
    } else {
        throw requestError(401);
    }
}

module.exports = userAll;