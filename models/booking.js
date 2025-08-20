const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // course collection reference
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // user collection reference
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Confirmed",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;