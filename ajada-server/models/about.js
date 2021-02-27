const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },

    heading: String,
    yourInfo: String,
    disclaimerInfo: String
  },

  {
    collection: "meta"
  }
);

aboutSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("About", aboutSchema);
