const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const { isEmail } = validator;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [ isEmail, 'Invalid Email' ]
    }
  },

  {
    collection: "users"
  }
);

userSchema.index({ email: 1 }, { unique: true });

/*
userSchema.index( {createdAt: 1}, {
    expireAfterSeconds: 1800, // Half an hour 
    partialFilterExpression: {
        active: false
    }
});
*/

module.exports = mongoose.model("User", userSchema);
