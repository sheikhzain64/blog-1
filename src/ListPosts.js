import React, {useState, useEffect} from "react";
import axios from "axios";
import CreateComment from "./CreateComment";
import ListComment from "./ListComment";

export default () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4000/posts");
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []); // Empty array means only run once
    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div
                className="card"
                style={{width: "30%", marginBottom: "20px"}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}{<p>created by</p>}{post.name}</h3>
                    <ListComment postId={post.id}/>
                    <CreateComment postId={post.id}/>
                </div>
            </div>
        );
    });
    return (
        <div>
            <h2>Posts</h2>
            <div className="d-flex flex-row flex-wrap justify-content-between">
                {renderedPosts}
            </div>
        </div>
    );
};