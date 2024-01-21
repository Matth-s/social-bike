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
  sport: { type: Array, default: '' },
  createdAt: { type: Number },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
