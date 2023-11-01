const User = require("../../models/usersSchema.js");
const sendVerificationEmail = require('../../utils/sendGridEmail.js');
const {v4: uuidv4} = require('uuid');
const requestError = require('../../utils/requestError.js');

async function resendVerificationEmail (req, res, next){
    
    const {email} = req.body;
    
    if(email){
        const userExist = await User.findOne({email});
        
        if(userExist){
            if(userExist.verify){
                throw requestError(400, {"message": "Verification has already been passed"});
            } else {
                const {_id} = userExist;
                const verificationToken = uuidv4();
                
                await User.findByIdAndUpdate({_id}, 
                                            {verificationToken}, 
                                            {new: true}
                                            );

                await sendVerificationEmail(email, verificationToken);

                res.json({"message":"Verification email sent"});
            }

        } else {
            throw requestError(404, {"message": "user not found. Registration requred"});
        }

    } else {
        throw requestError(400, {"message": "missing required field email"});
    }
}

module.exports = resendVerificationEmail;