const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const { isURL } = validator;

const footerSchema = new Schema(
  {    
    type: {
      type: String,
      required: true
    },
    
    privacy: {
     type: String,
      validate(value){
        if(value && !isURL(value)){
          throw new Error("Please enter a valid URL for Privacy Policy.");
        }
      }
    }
  },

  {
    collection: "meta"
  }
);

footerSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Footer", footerSchema);
