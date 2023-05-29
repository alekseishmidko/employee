const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { prisma } = require("../prisma/prisma-client");
/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "enter all forms" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // сравнение пароля и хешпароля
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));
    const secret = process.env.SECRET;
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "uncorrect login or password (login)" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in login" });
  }
};
/**
 * @route POST /api/user/register
 * @desс Регистрация
 * @access Public
 */
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "enter all forms" });
    }
    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (registeredUser) {
      return res
        .status(400)
        .json({ message: "email is exiting yet!(Register)" });
    }
    // Salt это строка для большей защиты пароля
    const salt = await bcrypt.genSalt(10);
    // кодирую пароль с помощью bcrypt c помощью соли
    const hashedPassword = await bcrypt.hash(password, salt);
    // сохраняю в пользователе хешированный пароль
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const secret = process.env.SECRET;
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res
        .status(400)
        .json({ message: "failed to create user(register)" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in register" });
  }
};

/**
 *
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req, res, next) => {
  return res.status(200).json(req.user);
};
module.exports = { login, register, current };
