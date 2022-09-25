const Card = require('../models/card');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name, link, owner });
    return res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }
    if (!card.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Нет прав на удаление'));
    }
    await card.remove();
    return res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }
    return res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Запрашиваемая карточка не найдена'));
    }
    return res.send(card);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};
