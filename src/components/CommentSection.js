import React, { useState } from 'react';
import Comment from './Comment'; // Assuming Comment component is in the same directory or accessible

/**
 * CommentSection Component
 * Manages and displays a list of comments for a post, including an input field
 * for adding new comments.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.comments - An array of initial comment objects.
 * @param {number} props.commentCount - The initial total count of comments.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const CommentSection = ({ comments: initialComments, commentCount: initialCommentCount, onUserClick, usersData }) => {
    // State to manage the list of comments, initialized with provided comments
    const [comments, setComments] = useState(initialComments || []);
    // State for the total comment count
    const [commentCount, setCommentCount] = useState(initialCommentCount);
    // State for the new comment input field
    const [newComment, setNewComment] = useState('');

    /**
     * Handles the submission of a new comment.
     * Adds the new comment to the list and clears the input field.
     * @param {Event} e - The form submission event.
     */
    const handleCommentSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // If the new comment input is empty or just whitespace, do nothing
        if (newComment.trim() === '') {
            return;
        }

        // Create a new comment object for the current user
        const newCommentObj = {
            userId: 'currentuser', // Assuming 'currentuser' is the ID for the logged-in user
            text: newComment,
            likes: 0,
            dislikes: 0
        };

        // Add the new comment to the existing list of comments
        setComments([...comments, newCommentObj]);
        // Increment the total comment count
        setCommentCount(commentCount + 1);
        // Clear the new comment input field
        setNewComment('');
    };

    return (
        <div className="mt-3">
            {/* Map through existing comments and render each using the Comment component */}
            {comments.map((comment, index) => (
                <Comment
                    key={index} // Using index as key, consider a unique ID for real apps
                    comment={comment}
                    onUserClick={onUserClick}
                    usersData={usersData} // Pass usersData to the Comment component
                />
            ))}
            {/* Form for adding a new comment */}
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 mt-3">
                {/* Current user's avatar */}
                <img
                    src={usersData['currentuser'].avatar} // Get current user's avatar from usersData
                    alt="current user"
                    className="w-8 h-8 rounded-full"
                />
                {/* New comment input field */}
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Post button, disabled if comment input is empty */}
                <button
                    type="submit"
                    className="text-blue-500 font-semibold text-sm hover:text-blue-600 disabled:text-gray-400"
                    disabled={!newComment.trim()}
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CommentSection;
