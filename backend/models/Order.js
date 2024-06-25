const mongoose = require("mongoose");
// const Product = require('./Products')
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    Product: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        artist:{
            type: String,
       
            required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = {Order};
