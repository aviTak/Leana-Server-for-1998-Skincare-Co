const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    
    summary: {
      type: String,
      required: true
    }
  },

  {
    collection: "testimonials"
  }
);

testimonialSchema.index({ name: "text", summary: "text" });

module.exports = mongoose.model("Testimonial", testimonialSchema);
