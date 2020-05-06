const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  discs: [
    {
      disc: {
        type: Schema.Types.ObjectId,
        ref: 'Disc',
        required: true,
      },
      plastic: String,
      wear: String,
      inBag: Boolean,
      rating: Number,
    },
  ],
});

module.exports = Collection = mongoose.model('Collection', CollectionSchema);
