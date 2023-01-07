const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = asyncHandler(async (req, res) => {
  const reqBody = Object.assign({}, req.body);
  console.log('This is the reqBody, ', reqBody);
  const { name, email, password } = reqBody;
  console.log(
    'This is the obj deconstruction info in createUser: ',
    name,
    email,
    password
  );
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  console.log('Passed userExists');
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  console.log('Passed userExists check');
  //password encryption
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log('Passed salt and hashedpassword funcs');
  //Create the new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log('Passed create user func');
  //If error is thrown on User create change user.id to user._id
  if (user) {
    console.log('User created!!!');
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  console.log(
    'this is the req.body in loginUser func in userController: ',
    req.body
  );
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log('This is the user inside loginUser func: ', user);
  //Check user password
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log('Passwords match in login!!!');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    next();
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const generateToken = (id) => {
  const secret = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  console.log('This is the JWT secret: ', secret);
  return secret;
};

const getUser = asyncHandler(async (req, res) => {
  console.log('This is the req.user info: ', req.user);
  const { _id, name, email } = await User.findById(req.user.id);
  console.log('retrieved info in getUser: ', _id, name, email);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

module.exports = {
  createUser,
  loginUser,
  getUser,
};
