const { ObjectId } = require('mongoose').Types;
const userRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers, getUserId, updateUser, updateAvatar, getUserMe,
} = require('../controllers/user');

userRouter.get('/users/me', getUserMe);
userRouter.get('/users', getUsers);
userRouter.get('/users/:userID', celebrate({
  params: Joi.object().keys({
    userID: Joi.string().alphanum().length(24)
      .custom((value, helper) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helper('Невалидные данные');
      }),
  }),
}), getUserId);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(/https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/),
  }),
}), updateAvatar);

module.exports = userRouter;
