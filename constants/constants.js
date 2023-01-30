const CREATED = 201;
const SERVER_ERROR = 500;
const RESOURCE_NOT_FOUND = 404;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const INVALID_ID = 'Неккоректный id';
const INVALID_DATA = 'Переданы некорректные данные';
const MISSING_USER = 'Запрашиваемый пользователь не найден';
const EMPTY_FIELD = 'Поле не должно быть пустым!';
const INVALID_FIELD = 'Переданы некорректные данные .Значениe должно не менее 2 и не более 30 символов';
const SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';
const MISSING_CARD = 'Нет карточки с таким id';
const RESOURCE_NOT_FOUND_MESSAGE = 'Ресурс не найден';
const UNAUTHORIZED_MESSAGE = 'Необходима авторизация';
const FORBIDDEN_MESSAGE = 'Ошибка доступа';

module.exports = {
  SERVER_ERROR,
  RESOURCE_NOT_FOUND,
  BAD_REQUEST,
  CREATED,
  INVALID_ID,
  INVALID_DATA,
  MISSING_USER,
  EMPTY_FIELD,
  INVALID_FIELD,
  SERVER_ERROR_MESSAGE,
  MISSING_CARD,
  RESOURCE_NOT_FOUND_MESSAGE,
  UNAUTHORIZED,
  UNAUTHORIZED_MESSAGE,
  FORBIDDEN,
  FORBIDDEN_MESSAGE,
};
