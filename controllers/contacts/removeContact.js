const Contact = require("../../models/contactSchema.js");


const removeContact = async (req, res, next) => {
      const currentUserID = req.User._id;
      const { contactId } = req.params;
  
      const isRemoved = await Contact.findOneAndRemove({_id: contactId, owner: currentUserID});
  
      if (isRemoved) {
        res.json({
          status: "success",
          code: 200,
          message: "contact deleted",
        });
      }
   
  }

module.exports = removeContact;