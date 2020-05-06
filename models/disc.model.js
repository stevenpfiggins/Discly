const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscSchema = new Schema({
  manufacturer: {
    type: String,
    required: [true, 'Disc manufacturer required'],
  },
  mold: {
    type: String,
    required: [true, 'Disc mold name required'],
  },
  plastics: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'A disc must have at least one plastic type.',
    },
  },
  speed: {
    type: Number,
    max: 15,
    min: 1,
    required: [true, 'A disc must have the Speed flight number'],
  },
  glide: {
    type: Number,
    max: 8,
    min: 0,
    required: [true, 'A disc must have the Glide flight number'],
  },
  turn: {
    type: Number,
    max: 0,
    min: -6,
    required: [true, 'A disc must have the Turn flight number'],
  },
  fade: {
    type: Number,
    max: 5,
    min: 0,
    required: [true, 'A disc must have the Fade flight number'],
  },
});

module.exports = Disc = mongoose.model('Disc', DiscSchema);
