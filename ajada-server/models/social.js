const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const { isURL } = validator;

const socialSchema = new Schema(
  {
    
    type: {
      type: String,
      required: true
    },
    
    facebook: {
      type: String,
      validate(value){
        if(value && !isURL(value)){
          throw new Error("Please enter a valid URL for Facebook.");
        }
      }
    },
    
    instagram: {
      type: String,
      validate(value){
        if(value && !isURL(value)){
          throw new Error("Please enter a valid URL for Instagram.");
        }
      }
    },
    
    twitter: {
      type: String,
      validate(value){
        if(value && !isURL(value)){
          throw new Error("Please enter a valid URL for Twitter.");
        }
      }
    }
  },

  {
    collection: "meta"
  }
);

socialSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Social", socialSchema);
