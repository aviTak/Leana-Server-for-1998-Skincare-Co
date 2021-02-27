const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },

    tagline: String,

    summary: String,

    ship: {
      type: String,
      required: true,
      validate(value) {
        if (isNaN(Number(value)) || Number(value) < 0) {
          throw new Error("Please enter a valid shipping price.");
        }
      }
    }
  },

  {
    collection: "meta"
  }
);

homeSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Home", homeSchema);
