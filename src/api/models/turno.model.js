const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  nomeTurno: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Turno', turnoSchema);
