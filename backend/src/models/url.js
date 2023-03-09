const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortUrlId: {
      type: String,
      trim: true,
      unique: true,
    },
    lastAccessed: {
      type: Date,
      required: true,
      default: Date.now,
    },
    numberOfClicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

urlSchema.index({ originalUrl: 1, shortUrlId: 1 });

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
