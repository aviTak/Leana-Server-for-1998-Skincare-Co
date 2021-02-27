const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    
    discount: {
      type: String,
      required: true,
      validate(value) {
        if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 100) {
          throw new Error("Please enter a valid discount percentage.");
        }
      }
    }
  },

  {
    collection: "coupons"
  }
);

couponSchema.index({ code: "text" });

module.exports = mongoose.model("Coupon", couponSchema);
