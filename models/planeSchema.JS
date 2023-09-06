const mongoose = require ('mongoose');

const planeSchema = new mongoose.Schema( {


    company: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      passengers: {
        type: Number,
        required: true,
      },
});

const Plane = mongoose.model('Plane', planeSchema);

module.exports = Plane;