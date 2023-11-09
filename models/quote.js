const mongoose = require('mongoose');

const quoteSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  
});

quoteSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

exports.Quote = mongoose.model('Quote', quoteSchema);


