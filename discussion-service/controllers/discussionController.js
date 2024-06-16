const Discussion = require('../models/Discussion');

// Create discussion
exports.createDiscussion = async (req, res) => {
    const { text, image, hashtags } = req.body;
    const createdBy = req.user.userId; // Ensure this matches your payload in auth service
    try {
        const discussion = new Discussion({ text, image, hashtags, createdBy });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update discussion
exports.updateDiscussion = async (req, res) => {
    const { id } = req.params;
    const { text, image, hashtags } = req.body;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        if (discussion.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'User not authorized' });
        }
        discussion.text = text || discussion.text;
        discussion.image = image || discussion.image;
        discussion.hashtags = hashtags || discussion.hashtags;
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete discussion
exports.deleteDiscussion = async (req, res) => {
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        if (discussion.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'User not authorized' });
        }
        await discussion.remove();
        res.status(200).json({ msg: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add comment
exports.addComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const createdBy = req.user.userId;
    try {
        const discussion = await Discussion.findById(id);
        discussion.comments.push({ text, createdBy });
        await discussion.save();
        res.status(201).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update comment
exports.updateComment = async (req, res) => {
    const { id, commentId } = req.params;
    const { text } = req.body;
    try {
        const discussion = await Discussion.findById(id);
        const comment = discussion.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        if (comment.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'User not authorized' });
        }
        comment.text = text || comment.text;
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete comment
exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        const comment = discussion.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        if (comment.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ msg: 'User not authorized' });
        }
        comment.remove();
        await discussion.save();
        res.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Like discussion
exports.likeDiscussion = async (req, res) => {
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (discussion.likes.includes(req.user.userId)) {
            return res.status(400).json({ msg: 'Discussion already liked' });
        }
        discussion.likes.push(req.user.userId);
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Like comment
exports.likeComment = async (req, res) => {
    const { id, commentId } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        const comment = discussion.comments.id(commentId);
        if (comment.likes.includes(req.user.userId)) {
            return res.status(400).json({ msg: 'Comment already liked' });
        }
        comment.likes.push(req.user.userId);
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get discussions based on tags
exports.getDiscussionsByTags = async (req, res) => {
    const { tags } = req.query;
    if (!tags) {
        return res.status(400).json({ error: 'Tags query parameter is required' });
    }
    try {
        const tagsArray = tags.split(','); // Convert string to array
        const discussions = await Discussion.find({ hashtags: { $in: tagsArray } }).populate('createdBy');
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get discussions based on text
exports.getDiscussionsByText = async (req, res) => {
    const { searchText } = req.query;
    try {
        const discussions = await Discussion.find({ text: { $regex: searchText, $options: 'i' } }).populate('createdBy');
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View count increment
exports.incrementViewCount = async (req, res) => {
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ msg: 'Discussion not found' });
        }
        discussion.viewCount += 1;
        await discussion.save();
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
