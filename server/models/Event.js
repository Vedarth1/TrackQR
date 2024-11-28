const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  qrId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
  },
  url: {
    type: String,
  },
  deviceType: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);