const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  INVALID_DATA,
  RESOURCE_NOT_FOUND_MESSAGE,
  CREATED,
} = require('../constants/constants');
const BadRequest = require('../errors/BadRequest');
const ResourceNotFound = require('../errors/ResourceNotFound');
const ConflictingRequest = require('../errors/ConflictingRequest');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => User.create({
    name: name || undefined,
    email,
    password: hash,
  }))
    .then((user) => res.status(CREATED).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictingRequest('Данный Email уже используется.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest(INVALID_DATA));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user == null) {
        next(new ResourceNotFound(RESOURCE_NOT_FOUND_MESSAGE));
      } else {
        return res.send(user);
      }
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, email } = req.body;
  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest(INVALID_DATA));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getMyInfo,
  updateUser,
  createUser,
  login,
};
