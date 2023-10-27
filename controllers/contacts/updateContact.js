const Contact = require("../../models/contactSchema.js");
const {joiValidation} = require("../../utils/joiValidation.js");

const updateContact = async (req, res, next) => {

      const { contactId } = req.params;
      const currentUserID = req.user;
      const { name, email, phone } = req.body;
  
      if (!name & !email & !phone) {
        const error = requestError(400, "missing field");
        throw error;
      }
  
      const validationError = joiValidation({ name, email, phone });
  
      if (validationError) {
        const error = requestError(400, validationError.message);
        throw error;
      }
  
      const result = await Contact.findOneAndUpdate({_id: contactId, owner: currentUserID}, req.body, {new: true});
  
      res.json({
        status: "success",
        code: 200,
        data: result,
      });
    
  }

module.exports = updateContact;