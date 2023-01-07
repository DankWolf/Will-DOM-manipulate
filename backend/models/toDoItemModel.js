const mongoose = require('mongoose');

const toDoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Please add task'],
    },
    date: {
      type: String,
      required: [true, 'Please add task creation date'],
    },
    description: {
      type: String,
      required: [true, 'Please add a task description'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ToDo', toDoSchema);
