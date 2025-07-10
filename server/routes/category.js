const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  getCategories,
  createCategory,
} = require('../controllers/categoryController');

router.get('/', getCategories);

router.post(
  '/',
  [body('name').notEmpty().withMessage('Category name is required')],
  createCategory
);

module.exports = router;
