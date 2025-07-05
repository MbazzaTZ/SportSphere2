import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, MoreHorizontal, X, Plus, Bookmark } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';
import PlatformIcon from './PlatformIcon';
import CommentSection from './CommentSection';

/**
 * Utility function to format time ago (copied from original App.js)
 * @param {string} isoString - ISO 8601 formatted date string.
 * @returns {string} - Formatted time string (e.g., "5m ago", "2d ago").
 */
const formatTimeAgo = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    return `${years}y ago`;
};

/**
 * PostCard Component
 * Displays a single social media post, adapting its layout based on the platform
 * and including features like likes, comments, sharing, and bookmarking.
 *
 * @param {object} props - The component props.
 * @param {object} props.post - The post object containing details like userId, content, likes, comments, time, image, platform.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {function} props.onFollowToggle - Callback function to toggle follow status for a user.
 * @param {function} props.isFollowingUser - Function to check if a user is currently followed.
 * @param {function} props.showAlert - Function to display an alert message.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const PostCard = ({ post, onUserClick, onFollowToggle, isFollowingUser, showAlert, usersData }) => {
    // ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL
    // State for like status and count
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    // State for bookmark status
    const [isBookmarked, setIsBookmarked] = useState(false);
    // State to control the visibility of the "Link Copied!" confirmation
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);
    // State to control the visibility of the comment section
    const [showComments, setShowComments] = useState(false);

    // Lookup user data based on the post's userId
    const user = usersData[post.userId];

    // If user data is not found, return null to prevent rendering an incomplete post
    if (!user) return null;

    /**
     * Toggles the like status of the post and updates the like count.
     */
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    /**
     * Toggles the bookmark status of the post.
     */
    const handleBookmark = () => setIsBookmarked(!isBookmarked);

    /**
     * Handles sharing the post. Attempts to use Web Share API,
     * falls back to Clipboard API, and then a textarea copy method.
     * Displays a confirmation message on successful copy.
     */
    const handleShare = async () => {
        const shareData = {
            title: `Check out this post from ${user.user}!`, // Dynamic title using user's name
            text: post.content,
            url: window.location.href, // Current page URL as the share URL
        };

        // Function to show the "Link Copied!" confirmation and hide it after a delay
        const showConfirmation = () => {
            setShowShareConfirmation(true);
            setTimeout(() => setShowShareConfirmation(false), 2000); // Hide after 2 seconds
        };

        try {
            // Attempt to use the Web Share API
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // If Web Share API is not supported, throw an error to fall back
                throw new Error("Web Share API not supported");
            }
        } catch (err) {
            console.log("Share failed, falling back to clipboard:", err);
            try {
                // Fallback to Clipboard API
                await navigator.clipboard.writeText(shareData.url);
                showConfirmation();
            } catch (clipErr) {
                console.error("Clipboard API failed:", clipErr);
                // Further fallback for older browsers or restricted environments
                const textArea = document.createElement("textarea");
                textArea.value = shareData.url;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy'); // Deprecated but widely supported for fallback
                    showConfirmation();
                } catch (execErr) {
                    console.error('Fallback copy failed:', execErr);
                }
                document.body.removeChild(textArea);
            }
        }
    };

    // Determine if the post should be styled like an Instagram post (has image and is from Instagram)
    const isInstagramStyle = post.platform === 'Instagram' && post.image;
    // Format the post time to a human-readable "time ago" string
    const timeAgo = formatTimeAgo(post.time);

    // Render Instagram-style post card
    if (isInstagramStyle) {
        return (
            <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 mb-6 max-w-lg mx-auto relative">
                {/* Share confirmation message */}
                {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">Link Copied!</div>}
                }
                
                {/* Post Header */}
                <div className="flex items-center p-3">
                    {/* User Avatar - clickable to view profile */}
                    <img src={user.avatar} alt={user.user} className="w-9 h-9 rounded-full mr-3 cursor-pointer" onClick={() => onUserClick(user.id)} />
                    <div className="flex-grow">
                        {/* User Name and Verified Badge - clickable to view profile */}
                        <div className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                            {user.user}
                            <VerifiedBadge tier={user.verificationTier} />
                            {/* Follow/Unfollow button */}
                            {onFollowToggle && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onFollowToggle(user.id); }} // Prevent event bubbling
                                    className="ml-2 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    {isFollowingUser(user.id) ? <X size={16} /> : <Plus size={16} />}
                                </button>
                            )}
                        </div>
                        {/* Time ago */}
                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </div>
                    {/* More options button (non-functional) */}
                    <button className="ml-auto"><MoreHorizontal size={20} className="text-gray-600 dark:text-gray-400" /></button>
                </div>
                
                {/* Post Image */}
                <img src={post.image} alt="Post content" className="w-full h-auto" />
                
                {/* Action Buttons (Like, Comment, Share, Bookmark) */}
                <div className="p-3 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button onClick={handleLike}>
                            <Heart size={26} className={`${isLiked ? 'text-red-500 fill-current' : 'text-gray-800 dark:text-gray-200'} hover:text-red-500`} />
                        </button>
                        <button onClick={() => setShowComments(!showComments)}>
                            <MessageSquare size={26} className="text-gray-800 dark:text-gray-200" />
                        </button>
                        <button onClick={handleShare}>
                            <Share2 size={26} className="text-gray-800 dark:text-gray-200" />
                        </button>
                    </div>
                    <button onClick={handleBookmark}>
                        <Bookmark size={26} className={`${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-800 dark:text-gray-200'} hover:text-yellow-500`} />
                    </button>
                </div>
                
                {/* Likes Count and Post Content */}
                <div className="px-3 pb-3">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{likeCount.toLocaleString()} likes</p>
                    <div className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                        <span className="font-bold mr-1 cursor-pointer" onClick={() => onUserClick(user.id)}>{user.user}</span>
                        <VerifiedBadge tier={user.verificationTier} />
                        <span className="ml-1">{post.content}</span>
                    </div>
                    {/* View all comments button */}
                    <button onClick={() => setShowComments(!showComments)} className="text-sm text-gray-500 dark:text-gray-400 mt-1 hover:underline">
                        View all {post.comments.toLocaleString()} comments
                    </button>
                    {/* Comment Section (conditionally rendered) */}
                    {showComments && <CommentSection comments={post.commentsData} commentCount={post.comments} onUserClick={onUserClick} usersData={usersData} />}
                </div>
            </div>
        );
    }

    // Render generic post card (for Twitter, Facebook, etc.)
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 relative">
            {/* Share confirmation message */}
            {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">Link Copied!</div>}
            }
            
            <div className="p-4">
                {/* Post Header */}
                <div className="flex items-center mb-4">
                    {/* User Avatar - clickable to view profile */}
                    <img src={user.avatar} alt={user.user} className="w-12 h-12 rounded-full mr-4 cursor-pointer" onClick={() => onUserClick(user.id)} />
                    <div className="flex-grow">
                        {/* User Name and Verified Badge - clickable to view profile */}
                        <div className="flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{user.user}</p>
                            <VerifiedBadge tier={user.verificationTier} />
                            {/* Follow/Unfollow button */}
                            {onFollowToggle && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onFollowToggle(user.id); }}
                                    className="ml-2 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    {isFollowingUser(user.id) ? <X size={16} /> : <Plus size={16} />}
                                </button>
                            )}
                        </div>
                        {/* User Handle (if available) */}
                        {user.handle && <p className="text-gray-500 dark:text-gray-400 text-sm">{user.handle}</p>}
                        }
                        {/* Time ago */}
                        <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </div>
                    {/* Platform Icon */}
                    <div className="ml-auto"><PlatformIcon platform={post.platform} className="w-6 h-6" /></div>
                </div>
                {/* Post Content */}
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
            </div>
            {/* Post Image (conditionally rendered if available) */}
            {post.image && <img src={post.image} alt="Post content" className="w-full h-auto" />}
            
            {/* Action Buttons (Like, Comment, Share, Bookmark) */}
            <div className="p-4 flex justify-between items-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-6">
                    <button onClick={handleLike} className={`flex items-center space-x-1 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                        <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                        <span>{likeCount.toLocaleString()}</span>
                    </button>
                    <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <MessageSquare size={20} />
                        <span>{post.comments.toLocaleString()}</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
                <button onClick={handleBookmark}>
                    <Bookmark size={20} className={isBookmarked ? 'text-yellow-500 fill-current' : ''} />
                </button>
            </div>
            {/* Comment Section (conditionally rendered) */}
            {showComments && <div className="px-4 pb-2"><CommentSection comments={post.commentsData} commentCount={post.comments} onUserClick={onUserClick} usersData={usersData} /></div>}
            }
        </div>
    );
};

export default PostCard;