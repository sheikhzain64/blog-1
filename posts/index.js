// Import the express module to create a web server
const express = require('express');

// Import the crypto module's randomBytes function to generate unique IDs
const {randomBytes} = require('crypto');

// Import the cors module to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Import the body-parser module to parse incoming request bodies
const bodyParser = require('body-parser');

// Create an instance of an express application
const app = express();

const axios = require('axios'); // Import the axios module to make HTTP requests

// Create an empty object to store posts
const posts = {};

// Use the body-parser middleware to parse incoming JSON request bodies
app.use(bodyParser.json());

// Use the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Define a GET route for /posts
app.get('/posts', (req, res) => {
    // Send the posts object as the response
    res.send(posts);
});

// Define a POST route for /posts
app.post('/posts', async (req, res) => {
    // Generate a unique ID for the new post
    const id = randomBytes(4).toString('hex');

    // Extract the title from the request body
    const { title } = req.body;
    const { name } = req.body;

    // Add the new post to the posts object
    posts[id] = {
        id,
        title,
        name
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title,
            name
        }
    });

    // Send the new post as the response
    res.status(201).send(posts[id]);
});

// Define a POST route for /events
app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

// Start the server on port 4000
app.listen(4000, () => {
    console.log('Listening on to port 4000');
});