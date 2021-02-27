const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {    
    type: {
      type: String,
      required: true
    },
    
    heading: String,
    info: String
    
  },

  {
    collection: "meta"
  }
);

contactSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Contact", contactSchema);
