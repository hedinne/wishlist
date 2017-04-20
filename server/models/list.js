const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new mongoose.Schema({
  title: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  listItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ListItem',
    },
  ],
});

module.exports = mongoose.model('List', ListSchema);
