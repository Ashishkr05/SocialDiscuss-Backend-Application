const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [ReplySchema]
});

const DiscussionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    image: { type: String },
    hashtags: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    viewCount: { type: Number, default: 0 },
    comments: [CommentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
