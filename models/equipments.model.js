const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   equipmentImage: {
      type: String,
      required: true
   },
   availability: {
      type: Boolean,
      default: true
   }
})

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;