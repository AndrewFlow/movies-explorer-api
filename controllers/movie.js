const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const ResourceNotFound = require('../errors/ResourceNotFound');

const {
  CREATED,
  INVALID_DATA,
  FORBIDDEN_MESSAGE,
  INVALID_ID,
  MISSING_CARD,
} = require('../constants/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest(INVALID_DATA));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      switch (true) {
        case !movie
          : throw new ResourceNotFound(MISSING_CARD);
        case !movie.owner.equals(req.user._id)
          : throw new Forbidden(FORBIDDEN_MESSAGE);
        default
          : return movie.remove().then(() => res.send(movie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(INVALID_ID));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
