const router = require('express').Router();
const ResourceNotFound = require('../errors/ResourceNotFound');
const {
  RESOURCE_NOT_FOUND_MESSAGE,
} = require('../constants/constants');

router.all('*', () => {
  throw new ResourceNotFound(RESOURCE_NOT_FOUND_MESSAGE);
});

module.exports = router;
