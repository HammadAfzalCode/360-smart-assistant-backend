const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const { userType, firstName, lastName, email, password, confirmPassword } =
    req.body;

  // Validate confirmPassword
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Password or email is not correct",
    });
  }

  try {
    // Check if the email is already registered
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already registered",
      });
    }

    // Create a new user
    const newUser = await user.create({
      userType,
      firstName,
      lastName,
      email,
      password,
    });

    // Remove sensitive information
    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;

    // Generate a token
    result.token = generateToken({ id: result.id });

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  const token = generateToken({ id: result.id });

  return res.json({
    status: "success",
    token,
  });
};

module.exports = { signup, login };
