import React, { useState } from 'react';
import axios from 'axios';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCreatePost = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title,
            name
        });
        setTitle('');
        setName('');
        console.log(`Creating post with title: ${title}, and name: ${name}`);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
            />
            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={handleTitleChange}
            />
            <button onClick={handleCreatePost}>Submit</button>
            <p>Name: {name}</p>
            <p>Title: {title}</p>
        </div>
    );
};

export default PostCreate;
