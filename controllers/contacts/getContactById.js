
const Contact = require("../../models/contactSchema.js");

const getContactById = async (req, res, next) => {
      const currentUserID = req.user._id;
      const { contactId } = req.params;
      const contact = await Contact.findOne({_id: contactId, owner: currentUserID});
      
      if (!contact) {
        const error = requestError(404);
        throw error;
      }
  
      res.json({
        status: "ok",
        code: 200,
        data: contact,
      });
  }

  module.exports = getContactById;