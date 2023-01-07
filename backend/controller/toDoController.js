const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const ToDo = require('../models/toDoItemModel');

//Create a toDo task for the user
//route POST to api/todo

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await ToDo.find({ user: req.user.id });
  res.status(200).json(tasks);
});

const createToDo = asyncHandler(async (req, res) => {
  console.log('This is the req.body: ', req.body);
  if (!req.body.task || !req.body.date || !req.body.description) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //IF THIS DOESNT WORK: Need to deal with JWT token issue on user key/value
  const toDo = await ToDo.create({
    task: req.body.task,
    date: req.body.date,
    description: req.body.description,
    user: req.user.id,
  });
  res.status(200).json(toDo);
});

const updateToDo = asyncHandler(async (req, res) => {
  console.log('This is the req.params: ', req.params);
  const toDoTask = await ToDo.findById(req.params.id);
  if (!toDoTask) {
    res.status(400);
    throw new Error('ToDo task not found');
  }

  const user = await User.findById(req.user.id);

  //check if user exists
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the toDoTask user
  if (toDoTask.user.toString() !== user.id) {
    res.status(400);
    throw new Error('User not authorized');
  }
  const updatedToDoTask = await ToDo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedToDoTask);
});

const deleteToDo = asyncHandler(async (req, res) => {
  console.log('This is the req.params: ', req.params);
  const toDoTask = await ToDo.findById(req.params.id);
  if (!toDoTask) {
    res.status(400);
    throw new Error('ToDo task not found');
  }
  const user = await User.findById(req.user.id);

  //check if user exists
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the toDoTask user
  if (toDoTask.user.toString() !== user.id) {
    res.status(400);
    throw new Error('User not authorized');
  }
  await toDoTask.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTasks,
  createToDo,
  updateToDo,
  deleteToDo,
};
