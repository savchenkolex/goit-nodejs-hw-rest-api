const User = require("../../models/usersSchema.js");
var gravatar = require('gravatar');

async function userGetAvatars (req, res, next) {
    const {_id} = req.user;
    const {avatarURL, email } = await User.findById(_id);
    console.log(avatarURL);
    if(!avatarURL){
        console.log("havent avatar");
        const gravatarURL = gravatar.url(email, {s:250, protocol: "http",});
        await User.findByIdAndUpdate(_id, {avatarURL: gravatarURL});
        res.json({gravatar: gravatarURL});
        return;
    }
    res.json({avatarURL});

}

module.exports = userGetAvatars;