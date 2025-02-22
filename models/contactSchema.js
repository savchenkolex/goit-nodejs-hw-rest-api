const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post('save', (error, data, next)=>{
  console.log(error);
  error.status = 400;
  console.log(data);
  next();
})

const Contact = model("contacts", contactSchema);

module.exports = Contact;
