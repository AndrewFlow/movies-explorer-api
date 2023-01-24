const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');
const ResourceNotFound = require('../errors/ResourceNotFound');

const {
  CREATED,
  INVALID_DATA,
  FORBIDDEN_MESSAGE,
  INVALID_ID,
} = require('../constants/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
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
  const userId = req.user._id;
  const { movieId } = req.params;

  Movie.findOne({ movieId })
    .then((movie) => {
      if (!movie) {
        throw new ResourceNotFound(INVALID_ID);
      }
      const owner = movie.owner.toString();

      if (owner !== userId) {
        throw new Forbidden(FORBIDDEN_MESSAGE);
      }
      Movie.findByIdAndDelete(movie._id)
        .then((data) => res.send(data))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(INVALID_ID));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
