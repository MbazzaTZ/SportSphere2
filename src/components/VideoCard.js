import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Play, Music } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';
import VideoTypeBadge from './VideoTypeBadge';

/**
 * VideoCard Component
 * Displays a single video with user information, content, engagement metrics,
 * and interactive features like liking, sharing, and pausing.
 *
 * @param {object} props - The component props.
 * @param {object} props.video - The video object containing details like userId, content, likes, comments, shares, videoUrl, videoType, sound.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const VideoCard = ({ video, onUserClick, usersData }) => {
    // ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL
    // State for like status and count
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(video.likes);
    // State to control video play/pause (simulated)
    const [isPaused, setIsPaused] = useState(false);
    // State to control the visibility of the large heart icon on double click
    const [showHeart, setShowHeart] = useState(false);
    // State to control the visibility of the "Link Copied!" confirmation
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    // Lookup user data based on the video's userId
    const user = usersData[video.userId];

    // If user data is not found, return null to prevent rendering an incomplete video card
    if (!user) return null;

    /**
     * Toggles the like status of the video and updates the like count.
     */
    const handleLike = () => {
        setIsLiked(prev => !prev);
        setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    };

    /**
     * Handles a double click on the video card.
     * If not already liked, it likes the video and shows a large heart animation.
     */
    const handleDoubleClick = () => {
        if (!isLiked) {
            handleLike(); // Like the video if not already liked
        }
        setShowHeart(true); // Show the large heart icon
        setTimeout(() => setShowHeart(false), 1000); // Hide it after 1 second
    };

    /**
     * Handles sharing the video. Attempts to use Web Share API,
     * falls back to Clipboard API, and displays a confirmation message.
     */
    const handleShare = async () => {
        const shareData = {
            title: `Check out this video from ${user.user}!`, // Dynamic title using user's name
            text: video.content,
            url: window.location.href // Current page URL as the share URL
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
            console.error("Share failed, falling back to clipboard:", err);
            try {
                // Fallback to Clipboard API
                await navigator.clipboard.writeText(shareData.url);
                showConfirmation();
            } catch (clipErr) {
                console.error("Clipboard API failed:", clipErr);
                // No further fallback for clipboard, as it's the last resort here
            }
        }
    };

    return (
        <div className="relative h-full w-full bg-black rounded-xl overflow-hidden snap-center shadow-xl" onDoubleClick={handleDoubleClick}>
            {/* Overlay div to handle pause on single click */}
            <div className="absolute inset-0" onClick={() => setIsPaused(!isPaused)}></div>
            
            {/* Video Thumbnail/Image (simulated video) */}
            <img src={video.videoUrl} alt="Video" className="absolute top-0 left-0 w-full h-full object-cover" />
            
            {/* Video Type Badge */}
            <VideoTypeBadge type={video.videoType} />
            
            {/* Play/Pause overlay (conditionally rendered) */}
            {isPaused && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-4 z-10 flex items-center justify-center">
                    <Play size={48} className="text-white fill-white" />
                </div>
            )}
            
            {/* Large heart icon on double click (conditionally rendered with animation) */}
            {showHeart && (
                <Heart size={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 animate-ping z-10" style={{animationDuration: '0.6s'}} />
            )}
            
            {/* Share confirmation message */}
            {showShareConfirmation && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg z-10">Link Copied!</div>
            )}
            
            {/* Bottom content area with user info, video content, and action buttons */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="flex items-end">
                    <div className="flex-grow">
                        {/* User Info (avatar, name, verified badge) - clickable to view profile */}
                        <div className="flex items-center mb-2 cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <img src={user.avatar} alt={user.user} className="w-10 h-10 rounded-full mr-3 border-2 border-white" />
                            <div className="font-bold flex items-center">
                                {user.user}
                                <VerifiedBadge tier={user.verificationTier} />
                            </div>
                        </div>
                        {/* Video content/description */}
                        <p className="text-sm mb-2">{video.content}</p>
                        {/* Sound information (if available) */}
                        {video.sound && (
                            <div className="flex items-center space-x-2">
                                <Music size={16} />
                                {/* Marquee animation for long sound names */}
                                <div className="w-40 overflow-hidden">
                                    <p className="text-xs whitespace-nowrap animate-marquee">{video.sound.name} - {video.sound.author}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Action buttons (Like, Comment, Share) */}
                    <div className="flex flex-col items-center space-y-6 ml-4">
                        <button onClick={handleLike} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${isLiked ? 'bg-red-500/50' : 'bg-white/20'}`}>
                                <Heart size={28} className={isLiked ? 'fill-current text-red-500' : ''} />
                            </div>
                            <span className="text-xs mt-1 font-semibold">{likeCount.toLocaleString()}</span>
                        </button>
                        <button className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <MessageSquare size={28} />
                            </div>
                            <span className="text-xs mt-1 font-semibold">{video.comments.toLocaleString()}</span>
                        </button>
                        <button onClick={handleShare} className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Share2 size={28} />
                            </div>
                            <span className="text-xs mt-1 font-semibold">{video.shares.toLocaleString()}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;