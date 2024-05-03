const mongoose = require("mongoose");

const kitchensSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Kitchens = mongoose.model("Kitchens", kitchensSchema);

module.exports = Kitchens;
