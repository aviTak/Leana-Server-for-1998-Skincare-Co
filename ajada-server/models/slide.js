const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const { isURL } = validator;

const slideSchema = new Schema(
  {
    
    heading: {
      type: String,
      required: true
    },
    
    caption: {
      type: String,
      required: true
    },
    
    photo: {
      type: String,
      required: true,
      validate(value){
        if(!isURL(value)){
          throw new Error("Please enter a valid URL");
        }
      }
    }
  },

  {
    collection: "slides"
  }
);

slideSchema.index({ heading: "text", caption: "text" });

module.exports = mongoose.model("Slide", slideSchema);
