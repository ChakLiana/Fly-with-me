const mongoose = require('mongoose');

const Ivent = mongoose.model('Ivent', {
  coords: {
    type: Array,
    required: true,
  },
});

module.exports = Ivent;
