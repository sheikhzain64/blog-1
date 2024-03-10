import React from "react";
import CreatePost from "./CreatePost";
import ListPosts from "./ListPosts";

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <CreatePost />
      <ListPosts />
    </div>
  );
};
export default App;
