const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortUrl: {
      type: String,
      trim: true,
      unique: true,
    },
    lastAccessed: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

urlSchema.index({ originalUrl: 1, shortUrl: 1 });

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
