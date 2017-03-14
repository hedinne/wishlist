const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  price: String,
  marked: { type: Boolean, default: false },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
});

module.exports = mongoose.model('ListItem', ListItemSchema);
