const { ObjectId } = require('mongoose').Types;
const cardRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/card');

const celebrateCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
      .custom((value, helper) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helper('Невалидные данные');
      }),
  }),
});

cardRouter.get('/cards', getCards);
cardRouter.delete('/cards/:cardId', celebrateCard, deleteCard);
cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .regex(/https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/),
  }),
}), createCard);
cardRouter.put('/cards/:cardId/likes', celebrateCard, likeCard);
cardRouter.delete('/cards/:cardId/likes', celebrateCard, dislikeCard);

module.exports = cardRouter;
