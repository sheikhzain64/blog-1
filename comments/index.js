const express = require('express');   // Import the express module
const bodyParser = require('body-parser'); // Import the body-parser module to parse incoming request bodies
const crypto = require('crypto');// Import the crypto module's randomBytes function to generate unique IDs
const cors = require('cors');// Import the cors module to enable Cross-Origin Resource Sharing
const app = express();// Create an instance of an express application
const axios = require('axios');// Import the axios module to make HTTP requests

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
app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const commentId = crypto.randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments; // Save the comments to the array
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });
    res.status(201).send(comments);
});
// POST route to receive events from the event bus
app.post('/events', (req, res) => {
    console.log('Received Event:', req.body.type);
    res.send({});
});

// Start the server
app.listen(4001, () => {
    console.log('Server listening on to port 4001');
});
