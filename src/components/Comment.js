import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

/**
 * Comment Component
 * Displays a single comment, including user avatar, name, comment text,
 * and like/dislike functionality.
 *
 * @param {object} props - The component props.
 * @param {object} props.comment - The comment object containing userId, text, likes, dislikes.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const Comment = ({ comment, onUserClick, usersData }) => {
    // State to manage the user's reaction to the comment (null, 'liked', 'disliked')
    const [reaction, setReaction] = useState(null);
    // State for the number of likes, initialized from comment data or 0
    const [likeCount, setLikeCount] = useState(comment.likes || 0);
    // State for the number of dislikes, initialized from comment data or 0
    const [dislikeCount, setDislikeCount] = useState(comment.dislikes || 0);

    // Lookup user data based on the comment's userId
    const user = usersData[comment.userId];

    // If user data is not found, return null to prevent rendering an incomplete comment
    if (!user) return null;

    /**
     * Handles the user reacting (liking/disliking) to the comment.
     * Toggles the reaction and updates like/dislike counts accordingly.
     * @param {string} newReaction - The new reaction type ('liked' or 'disliked').
     */
    const handleReaction = (newReaction) => {
        if (reaction === newReaction) {
            // If the same reaction is clicked again, undo it
            setReaction(null);
            if (newReaction === 'liked') {
                setLikeCount(likeCount - 1);
            }
            if (newReaction === 'disliked') {
                setDislikeCount(dislikeCount - 1);
            }
        } else {
            // Set a new reaction
            let newLikes = likeCount;
            let newDislikes = dislikeCount;

            // If there was a previous reaction, undo its effect on counts
            if (reaction === 'liked') {
                newLikes--;
            }
            if (reaction === 'disliked') {
                newDislikes--;
            }

            // Apply the new reaction's effect on counts
            if (newReaction === 'liked') {
                newLikes++;
            }
            if (newReaction === 'disliked') {
                newDislikes++;
            }
            
            // Update the state with the new reaction and counts
            setReaction(newReaction);
            setLikeCount(newLikes);
            setDislikeCount(newDislikes);
        }
    };

    return (
        <div className="flex items-start space-x-2 mb-2">
            {/* User Avatar - clickable to view user profile */}
            <img
                src={user.avatar}
                alt={user.user}
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => onUserClick(user.id)}
            />
            <div className="flex-1">
                {/* Comment content bubble */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    {/* User Name - clickable to view user profile, includes VerifiedBadge */}
                    <p className="font-bold text-sm flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                        {user.user}
                        <VerifiedBadge tier={user.verificationTier} />
                    </p>
                    {/* The actual comment text */}
                    <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
                </div>
                {/* Reaction and Reply buttons */}
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 px-2 mt-1">
                    {/* Like button */}
                    <button
                        onClick={() => handleReaction('liked')}
                        className={`flex items-center space-x-1 hover:text-blue-500 ${reaction === 'liked' ? 'text-blue-500' : ''}`}
                    >
                        <ThumbsUp size={14} /> <span>{likeCount}</span>
                    </button>
                    {/* Dislike button */}
                    <button
                        onClick={() => handleReaction('disliked')}
                        className={`flex items-center space-x-1 hover:text-red-500 ${reaction === 'disliked' ? 'text-red-500' : ''}`}
                    >
                        <ThumbsDown size={14} /> <span>{dislikeCount}</span>
                    </button>
                    {/* Reply button (currently non-functional) */}
                    <button className="hover:underline">Reply</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;