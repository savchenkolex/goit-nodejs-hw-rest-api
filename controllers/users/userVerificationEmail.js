const User = require('../../models/usersSchema.js');
const requestError = require('../../utils/requestError.js');

async function userVerificationMail (req, res, next ){

    const {verificationToken} = req.params;
    const userExist = await User.findOne({verificationToken});
    
    if(userExist) {
        await User.findByIdAndUpdate(
            {_id: userExist._id}, 
            {verificationToken:'', verify: true}, 
            );
        
        res.json({message: 'Verification successful'});
    }else{
        throw requestError(404, 'User not found');
    }

}

module.exports = userVerificationMail;