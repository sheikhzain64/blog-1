import React, {useState} from "react";
import axios from "axios";
/**
 * Component for creating a new comment.
 * @param {Object} props - The component props.
 * @param {string} props.postId - The ID of the post to which the comment belongs.
 * @returns {JSX.Element} The CreateComment component.
 */
export default ({postId}) => {
    /**
     * State variable for the comment content.
     * @type {string}
     */
    const [content, setContent] = useState('');

    /**
     * Handles the form submission.
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>}
     */
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        });
        setContent('');
        console.log(`Creating comment with content: ${content}`);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input value={content} onChange={e => setContent(e.target.value)} className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}