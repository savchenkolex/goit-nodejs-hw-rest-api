const User = require("../../models/usersSchema.js");
const fs = require("fs").promises;
const path = require("path");
const jimp = require("jimp");



const userAvatars = async (req, res, next) => {

    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const {_id} = req.user._id;
    const {path: tempUpload, originalname} = req.file;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    jimp.read(tempUpload)
        .then((image)=>{
            image.cover(250, 250).write(resultUpload);
        })
        .catch((error) => {console.log(error)});
   
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});


    res.json({avatarURL});
}

module.exports = userAvatars;