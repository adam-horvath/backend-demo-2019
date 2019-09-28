let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// set up a mongoose model
let BlogEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('BlogEntry', BlogEntrySchema);