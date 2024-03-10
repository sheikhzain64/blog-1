const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(cors());

// Array to store comments
const commentsByPostId = {};

// GET route to retrieve all comments for a specific post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// POST route to add a new comment to a specific post
app.post('/posts/:id/comments', (req, res) => {
    const { content } = req.body;
    const commentId = crypto.randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments; // Save the comments to the array
    res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
    console.log('Server listening on to port 4001');
});
