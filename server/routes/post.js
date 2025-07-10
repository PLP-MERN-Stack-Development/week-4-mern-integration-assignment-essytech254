const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Import controllers FIRST
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

// Create post with validation
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  createPost
);

// Other post routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
