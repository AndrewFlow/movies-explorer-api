const mongoose = require('mongoose');
const validator = require('validator');
const {
  INVALID_DATA,
} = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: INVALID_DATA,
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: INVALID_DATA,
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: INVALID_DATA,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
