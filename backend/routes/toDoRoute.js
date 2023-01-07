const express = require('express');
const router = express.Router();
const {
  getTasks,
  createToDo,
  updateToDo,
  deleteToDo,
} = require('../controller/toDoController');
const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, getTasks);
router.post('/', protect, createToDo);
router.put('/:id', protect, updateToDo);
router.delete('/:id', protect, deleteToDo);

module.exports = router;
