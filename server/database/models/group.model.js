const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: { type: Array, default: [] },
  chat: { type: Array, default: [] },
  rides: { type: Array, default: [] },
  city: { type: String },
  type: {
    type: String,
    enum: ['ouvert', 'invitation', 'ferme'],
    required: true,
  },
  description: { type: String, default: '' },
  sport: { type: String, default: '' },
  createdAt: { type: Number },
  waitingList: {
    type: Array,
    default: [],
    items: {
      type: {
        id: String,
        username: String,
      },
    },
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
