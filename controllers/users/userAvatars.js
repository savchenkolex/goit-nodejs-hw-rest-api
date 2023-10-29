const User = require("../../models/usersSchema.js");
const fs = require("fs").promises;
const path = require("path");
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);


const userAvatars = async (req, res, next) => {
    // console.log("ctrl: ", req.file);
    
    // const {stdout, stderr} = await exec(`cd tmp; md5sum *`);
    // console.dir(stdout);
    // const target = path.join(process.cwd(), "tmp");
    // const files = await fs.readdir(target);
    // for(const file of files){
    //     console.log(file);
    // }
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    const {_id} = req.user._id;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});


    res.json({avatarURL});
}

module.exports = userAvatars;