
const Contact = require("../../models/contactSchema.js");

const listContacts = async (req, res, next) => {
    const currentUserID = req.user._id;
     
    const data = await Contact.find({owner: currentUserID}); 
     if (!data) {
       const error = requestError();
       throw error;
     }
 
     return res.json({
       status: "ok",
       code: 200,
       data,
     });
  }

  module.exports = listContacts;