const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.createUser = async (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hashedPassword,
    });
    return res.send({
      name: user.name, about: user.about, avatar: user.avatar, email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким Email уже существует'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
    return res.send(user);
  } catch {
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch {
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Запрашиваемый пользователь не найден'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(new InternalServerError('Произошла ошибка на сервере'));
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // const token = jwt.sign({ _id: user._id }, 'SECRET');
    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: true,
    });
    return res.send({
      name: user.name, about: user.about, avatar: user.avatar, email,
    });
  } catch (err) {
    // return next(new InternalServerError('Произошла ошибка на сервере'));
    return next(err);
  }
};

module.exports.deleteCookie = async (req, res, next) => {
  try {
    await res.clearCookie('jwt');
    return res.send({});
  } catch (err) {
    return next(err);
  }
};
