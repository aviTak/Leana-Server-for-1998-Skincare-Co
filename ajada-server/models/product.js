const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validator = require("validator");
const { isURL } = validator;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    item: {
      required: true,
      type: [
        {
          price: {
            type: String,
            required: true,
            validate(value) {
              if (isNaN(Number(value)) || Number(value) < 0) {
                throw new Error("Please enter a valid price.");
              }
            }
          },

          size: {
            type: String,
            required: true,
            validate(value) {
              if (isNaN(Number(value)) || Number(value) < 0) {
                throw new Error("Please enter a valid quantity.");
              }
            }
          }
        }
      ]
    },

    gender: {
      type: String,
      required: true
    },

    photo: {
      type: [String],
      required: true,
      validate(value) {
        value.forEach(v => {
          if (!isURL(v)) {
            throw new Error("Please enter a valid URL");
          }
        });
      }
    },

    summary: String,
    available: Boolean
  },

  {
    collection: "products"
  }
);

productSchema.index({ name: "text", summary: "text" });

module.exports = mongoose.model("Product", productSchema);
