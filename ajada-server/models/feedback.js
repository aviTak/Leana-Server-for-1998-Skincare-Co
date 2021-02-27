const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const { isEmail } = validator;

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      validate(value) {
        if (!isEmail(value)) {
          throw new Error("Please enter a valid Email.");
        }
      }
    },

    date: Date
  },

  {
    collection: "feedbacks"
  }
);

feedbackSchema.index({ name: "text", message: "text" });

module.exports = mongoose.model("Feedback", feedbackSchema);
