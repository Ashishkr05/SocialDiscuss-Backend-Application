const express = require('express');
const {
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
    getDiscussionsByTags,
    getDiscussionsByText,
    addComment,
    updateComment,
    deleteComment,
    likeDiscussion,
    likeComment,
    incrementViewCount
} = require('../controllers/discussionController');
const auth = require('../middleware/auth');
const router = express.Router();

// Routes
router.post('/', auth, createDiscussion);
router.put('/:id', auth, updateDiscussion);
router.delete('/:id', auth, deleteDiscussion);
router.get('/tags', getDiscussionsByTags); // Ensure this is correct
router.get('/search', getDiscussionsByText);
router.post('/:id/comments', auth, addComment);
router.put('/:id/comments/:commentId', auth, updateComment);
router.delete('/:id/comments/:commentId', auth, deleteComment);
router.post('/:id/like', auth, likeDiscussion);
router.post('/:id/comments/:commentId/like', auth, likeComment);
router.post('/:id/view', incrementViewCount);

module.exports = router;
