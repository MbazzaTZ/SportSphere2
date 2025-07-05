import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Bell, Twitter, Instagram, Facebook, Video, Search, Plus, MessageSquare, Share2, MoreHorizontal, Menu, Shield, Trophy, Users, Heart, Bookmark, Linkedin, Briefcase, X, ChevronLeft, ChevronRight, Radio, BarChart3, TrendingUp, TrendingDown, Star, Mic, UserCheck, Flag, Clipboard, ArrowLeft, Calendar as CalendarIcon, Link as LinkIcon, MapPin, ThumbsUp, ThumbsDown, Image, ListTodo, Film, Zap, Play, Music, ShoppingCart, Award, Send, Lock, User, Phone, MailOpen, KeyRound, Edit } from 'lucide-react';

// --- DATA ---
// Importing all mock data from a single source
import {
    verificationTiers,
    allUsersById,
    mockStories,
    mockPosts,
    mockVideos,
    mockProContent,
    initialLiveGames,
    mockLiveBets,
    shopTeams,
    shopMatches,
    shopProducts,
    azamTvData,
    bestOffers,
    mockMessages
} from './mockData';


// --- UTILITY FUNCTIONS ---
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

const formatOdds = (odds) => {
    return odds > 0 ? `+${odds.toFixed(0)}` : odds.toFixed(0);
};

// --- COMPONENTS ---

// MessageBox Component
const MessageBox = ({ message, type, onClose }) => {
    let bgColor = '';
    let textColor = '';
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            break;
        case 'info':
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            break;
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center space-y-4`}>
                <p className="text-lg font-semibold text-center">{message}</p>
                <button
                    onClick={onClose}
                    className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

const VerifiedBadge = ({ tier }) => {
    if (!tier || !verificationTiers[tier]) return null;
    const { label, icon, color } = verificationTiers[tier];
    return (
        <span className="relative group inline-flex items-center align-middle">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${color} ml-1.5`}>
                {icon}
            </span>
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
                {label}
            </span>
        </span>
    );
};

const PlatformIcon = ({ platform, className }) => {
    switch (platform) {
        case 'Facebook': return <Facebook className={`text-blue-600 ${className}`} />;
        case 'Twitter': return <Twitter className={`text-blue-400 ${className}`} />;
        case 'Instagram': return <Instagram className={`text-pink-500 ${className}`} />;
        case 'LinkedIn': return <Linkedin className={`text-blue-700 ${className}`} />;
        case 'TikTok': return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.33.36-1.72 1.46-3.2 3.02-4.17.02-3.48.01-6.97 0-10.45 1.53-.02 3.05-.02 4.57-.02.01 1.49.01 2.98 0 4.48z"></path></svg>;
        default: return null;
    }
};

const Comment = ({ comment, onUserClick, usersData }) => {
    const user = usersData[comment.userId];
    if (!user) return null;

    const [reaction, setReaction] = useState(null);
    const [likeCount, setLikeCount] = useState(comment.likes || 0);
    const [dislikeCount, setDislikeCount] = useState(comment.dislikes || 0);

    const handleReaction = (newReaction) => {
        if (reaction === newReaction) {
            setReaction(null);
            if (newReaction === 'liked') setLikeCount(likeCount - 1);
            if (newReaction === 'disliked') setDislikeCount(dislikeCount - 1);
        } else {
            let newLikes = likeCount;
            let newDislikes = dislikeCount;
            if (reaction === 'liked') newLikes--;
            if (reaction === 'disliked') newDislikes--;

            if (newReaction === 'liked') newLikes++;
            if (newReaction === 'disliked') newDislikes++;
            
            setReaction(newReaction);
            setLikeCount(newLikes);
            setDislikeCount(newDislikes);
        }
    };

    return (
        <div className="flex items-start space-x-2 mb-2">
            <img src={user.avatar} alt={user.user} className="w-8 h-8 rounded-full cursor-pointer" onClick={() => onUserClick(user.id)} />
            <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <p className="font-bold text-sm flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>{user.user} <VerifiedBadge tier={user.verificationTier} /></p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 px-2 mt-1">
                    <button onClick={() => handleReaction('liked')} className={`flex items-center space-x-1 hover:text-blue-500 ${reaction === 'liked' ? 'text-blue-500' : ''}`}>
                        <ThumbsUp size={14} /> <span>{likeCount}</span>
                    </button>
                    <button onClick={() => handleReaction('disliked')} className={`flex items-center space-x-1 hover:text-red-500 ${reaction === 'disliked' ? 'text-red-500' : ''}`}>
                        <ThumbsDown size={14} /> <span>{dislikeCount}</span>
                    </button>
                    <button className="hover:underline">Reply</button>
                </div>
            </div>
        </div>
    );
};

const CommentSection = ({ comments: initialComments, commentCount: initialCommentCount, onUserClick, usersData }) => {
    const [comments, setComments] = useState(initialComments || []);
    const [commentCount, setCommentCount] = useState(initialCommentCount);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() === '') return;
        const newCommentObj = {
            userId: 'currentuser',
            text: newComment,
            likes: 0,
            dislikes: 0
        };
        setComments([...comments, newCommentObj]);
        setCommentCount(commentCount + 1);
        setNewComment('');
    };

    return (
        <div className="mt-3">
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} onUserClick={onUserClick} usersData={usersData} />
            ))}
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 mt-3">
                <img src={usersData['currentuser'].avatar} alt="current user" className="w-8 h-8 rounded-full" />
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="text-blue-500 font-semibold text-sm hover:text-blue-600 disabled:text-gray-400" disabled={!newComment.trim()}>Post</button>
            </form>
        </div>
    );
};

const PostCard = ({ post, onUserClick, onFollowToggle, isFollowingUser, showAlert, usersData }) => {
    const user = usersData[post.userId];
    if (!user) return null;

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    const handleBookmark = () => setIsBookmarked(!isBookmarked);

    const handleShare = async () => {
        const shareData = {
            title: `Check out this post from ${user.user}!`,
            text: post.content,
            url: window.location.href,
        };
        const showConfirmation = () => {
            setShowShareConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                throw new Error("Web Share API not supported");
            }
        } catch (err) {
            console.log("Share failed, falling back to clipboard:", err);
            try {
                await navigator.clipboard.writeText(shareData.url);
                showConfirmation();
            } catch (clipErr) {
                console.error("Clipboard API failed:", clipErr);
                const textArea = document.createElement("textarea");
                textArea.value = shareData.url;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showConfirmation();
                } catch (execErr) {
                    console.error('Fallback copy failed:', execErr);
                }
                document.body.removeChild(textArea);
            }
        }
    };

    const isInstagramStyle = post.platform === 'Instagram' && post.image;
    const timeAgo = formatTimeAgo(post.time);

    if (isInstagramStyle) {
        return (
            <div className="bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 mb-6 max-w-lg mx-auto relative">
                {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">Link Copied!</div>}
                <div className="flex items-center p-3">
                    <img src={user.avatar} alt={user.user} className="w-9 h-9 rounded-full mr-3 cursor-pointer" onClick={() => onUserClick(user.id)} />
                    <div className="flex-grow">
                        <div className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                            {user.user}
                            <VerifiedBadge tier={user.verificationTier} />
                            {onFollowToggle && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onFollowToggle(user.id); }}
                                    className="ml-2 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    {isFollowingUser(user.id) ? <X size={16} /> : <Plus size={16} />}
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </div>
                    <button className="ml-auto"><MoreHorizontal size={20} className="text-gray-600 dark:text-gray-400" /></button>
                </div>
                <img src={post.image} alt="Post content" className="w-full h-auto" />
                <div className="p-3 flex justify-between items-center"><div className="flex items-center space-x-4"><button onClick={handleLike}><Heart size={26} className={`${isLiked ? 'text-red-500 fill-current' : 'text-gray-800 dark:text-gray-200'} hover:text-red-500`} /></button><button onClick={() => setShowComments(!showComments)}><MessageSquare size={26} className="text-gray-800 dark:text-gray-200" /></button><button onClick={handleShare}><Share2 size={26} className="text-gray-800 dark:text-gray-200" /></button></div><button onClick={handleBookmark}><Bookmark size={26} className={`${isBookmarked ? 'text-yellow-500 fill-current' : 'text-gray-800 dark:text-gray-200'} hover:text-yellow-500`} /></button></div>
                <div className="px-3 pb-3">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{likeCount.toLocaleString()} likes</p>
                    <div className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                        <span className="font-bold mr-1 cursor-pointer" onClick={() => onUserClick(user.id)}>{user.user}</span>
                        <VerifiedBadge tier={user.verificationTier} />
                        <span className="ml-1">{post.content}</span>
                    </div>
                    <button onClick={() => setShowComments(!showComments)} className="text-sm text-gray-500 dark:text-gray-400 mt-1 hover:underline">
                        View all {post.comments.toLocaleString()} comments
                    </button>
                    {showComments && <CommentSection comments={post.commentsData} commentCount={post.comments} onUserClick={onUserClick} usersData={usersData} />}
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 relative">
            {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">Link Copied!</div>}
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <img src={user.avatar} alt={user.user} className="w-12 h-12 rounded-full mr-4 cursor-pointer" onClick={() => onUserClick(user.id)} />
                    <div className="flex-grow">
                        <div className="flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{user.user}</p>
                            <VerifiedBadge tier={user.verificationTier} />
                            {onFollowToggle && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onFollowToggle(user.id); }}
                                    className="ml-2 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                >
                                    {isFollowingUser(user.id) ? <X size={16} /> : <Plus size={16} />}
                                </button>
                            )}
                        </div>
                        {user.handle && <p className="text-gray-500 dark:text-gray-400 text-sm">{user.handle}</p>}
                        <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo}</p>
                    </div>
                    <div className="ml-auto"><PlatformIcon platform={post.platform} className="w-6 h-6" /></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
            </div>
            {post.image && <img src={post.image} alt="Post content" className="w-full h-auto" />}
            <div className="p-4 flex justify-between items-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-6">
                    <button onClick={handleLike} className={`flex items-center space-x-1 transition-colors ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}><Heart size={20} className={isLiked ? 'fill-current' : ''} /><span>{likeCount.toLocaleString()}</span></button>
                    <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-1 hover:text-blue-500 transition-colors"><MessageSquare size={20} /><span>{post.comments.toLocaleString()}</span></button>
                    <button onClick={handleShare} className="flex items-center space-x-1 hover:text-green-500 transition-colors"><Share2 size={20} /></button>
                </div>
                <button onClick={handleBookmark}><Bookmark size={20} className={isBookmarked ? 'text-yellow-500 fill-current' : ''} /></button>
            </div>
            {showComments && <div className="px-4 pb-2"><CommentSection comments={post.commentsData} commentCount={post.comments} onUserClick={onUserClick} usersData={usersData} /></div>}
        </div>
    );
};

// Styles for different video types
const videoTypeStyles = {
    highlight: { label: 'Highlight', icon: <Star size={14} />, color: 'bg-yellow-500/80' },
    news: { label: 'News', icon: <Clipboard size={14} />, color: 'bg-blue-500/80' },
    live: { label: 'LIVE', icon: <Radio size={14} />, color: 'bg-red-600/80 animate-pulse' },
    reel: { label: 'Reel', icon: <Video size={14} />, color: 'bg-purple-600/80' },
};

// Badge component to display video type
const VideoTypeBadge = ({ type }) => {
    const style = videoTypeStyles[type] || {};
    if (!style.label) return null;
    return (
        <div className={`absolute top-4 left-4 flex items-center space-x-2 text-white text-xs font-bold p-1.5 rounded-full backdrop-blur-md z-10 ${style.color}`}>
            {style.icon}
            <span>{style.label}</span>
        </div>
    );
};

const VideoCard = ({ video, onUserClick, usersData }) => {
    const user = usersData[video.userId];
    if (!user) return null;

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(video.likes);
    const [isPaused, setIsPaused] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    const handleLike = () => {
        setIsLiked(prev => !prev);
        setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    };

    const handleDoubleClick = () => {
        if (!isLiked) {
            handleLike();
        }
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
    };

    const handleShare = async () => {
        const shareData = { title: `Check out this video from ${user.user}!`, text: video.content, url: window.location.href };
        const showConfirmation = () => { setShowShareConfirmation(true); setTimeout(() => setShowConfirmation(false), 2000); };
        try {
            if (navigator.share) { await navigator.share(shareData); } else { throw new Error("Web Share API not supported"); }
        } catch (err) {
            try { await navigator.clipboard.writeText(shareData.url); showConfirmation(); } catch (clipErr) { console.error("Clipboard API failed:", clipErr); }
        }
    };

    return (
        <div className="relative h-full w-full bg-black rounded-xl overflow-hidden snap-center shadow-xl" onDoubleClick={handleDoubleClick}>
            <div className="absolute inset-0" onClick={() => setIsPaused(!isPaused)}></div>
            <img src={video.videoUrl} alt="Video" className="absolute top-0 left-0 w-full h-full object-cover" />
            <VideoTypeBadge type={video.videoType} />
            {isPaused && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 rounded-full p-4 z-10 flex items-center justify-center"><Play size={48} className="text-white fill-white" /></div>}
            {showHeart && <Heart size={100} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 animate-ping z-10" style={{animationDuration: '0.6s'}} />}
            {showShareConfirmation && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg z-10">Link Copied!</div>}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="flex items-end">
                    <div className="flex-grow">
                        <div className="flex items-center mb-2 cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <img src={user.avatar} alt={user.user} className="w-10 h-10 rounded-full mr-3 border-2 border-white" />
                            <div className="font-bold flex items-center">{user.user} <VerifiedBadge tier={user.verificationTier} /></div>
                        </div>
                        <p className="text-sm mb-2">{video.content}</p>
                        {video.sound && (
                            <div className="flex items-center space-x-2">
                                <Music size={16} />
                                <div className="w-40 overflow-hidden"><p className="text-xs whitespace-nowrap animate-marquee">{video.sound.name} - {video.sound.author}</p></div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col items-center space-y-6 ml-4">
                        <button onClick={handleLike} className="flex flex-col items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm ${isLiked ? 'bg-red-500/50' : 'bg-white/20'}`}><Heart size={28} className={isLiked ? 'fill-current text-red-500' : ''} /></div>
                            <span className="text-xs mt-1 font-semibold">{likeCount.toLocaleString()}</span>
                        </button>
                        <button className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><MessageSquare size={28} /></div><span className="text-xs mt-1 font-semibold">{video.comments.toLocaleString()}</span></button>
                        <button onClick={handleShare} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Share2 size={28} /></div><span className="text-xs mt-1 font-semibold">{video.shares.toLocaleString()}</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * HighlightsHub Component
 * The main container for the vertical video feed.
 */
const HighlightsHub = ({ onUserClick, usersData }) => (
    <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
        {mockVideos.map(video => <VideoCard key={video.id} video={video} onUserClick={onUserClick} usersData={usersData} />)}
    </div>
);

// ProContentCard Component
const ProContentCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 p-4 flex items-start max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-4"><Briefcase className="text-gray-500" /></div>
        <div className="flex-grow"><h3 className="font-bold text-blue-600 dark:text-blue-400">{item.title}</h3><p className="text-gray-800 dark:text-gray-200">{item.team || item.company}</p><p className="text-gray-500 dark:text-gray-400 text-sm">{item.location} ({item.type})</p></div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm">View</button>
    </div>
);

// ChannelMessageCard component displays a single message in the WhatsApp-like channel.
const ChannelMessageCard = ({ message }) => (
    <div className={`flex items-end mb-4 ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}>
        {!message.isUserMessage && <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />}
        <div className={`p-3 rounded-xl shadow-md ${message.isUserMessage ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'} max-w-[80%]`}>
            {!message.isUserMessage && <p className="font-semibold text-sm mb-1">{message.sender}</p>}
            <p className="text-sm">{message.message}</p>
            <p className="text-xs text-right mt-1 opacity-80">{message.time}</p>
        </div>
        {message.isUserMessage && <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full ml-2 flex-shrink-0" />}
    </div>
);

// ProZone component displays professional sports content in a WhatsApp channel-like format.
const ProZone = ({ usersData }) => {
    const [channelMessages, setChannelMessages] = useState(mockProContent);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const newMsg = {
            id: channelMessages.length + 1,
            sender: usersData['currentuser'].user,
            message: newMessage.trim(),
            time: timeString,
            avatar: usersData['currentuser'].avatar,
            isUserMessage: true
        };
        setChannelMessages(prevMessages => [...prevMessages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-black">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 p-4 max-w-lg mx-auto w-full">Sports Industry Channel</h2>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-w-lg mx-auto w-full">
                {channelMessages.map(msg => (
                    <ChannelMessageCard key={msg.id} message={msg} />
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex items-center space-x-2 max-w-lg mx-auto w-full">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50" disabled={!newMessage.trim()}>
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

const LiveGameCard = ({ game, onClick }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500" onClick={onClick}>
        <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2"><span>{game.sport}</span><span className="font-bold text-red-500 animate-pulse">{game.time}</span></div>
            <div className="flex justify-between items-center"><span className="text-lg font-bold text-gray-800 dark:text-gray-200">{game.team1}</span><span className="text-2xl font-bold text-gray-900 dark:text-white">{game.score1}</span></div>
            <div className="flex justify-between items-center mt-1"><span className="text-lg font-bold text-gray-800 dark:text-gray-200">{game.team2}</span><span className="text-2xl font-bold text-gray-900 dark:text-white">{game.score2}</span></div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-2 text-center">
                <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm">
                    <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.team1)}</span>
                    <span className="text-xs text-gray-500">{game.team1}</span>
                </button>
                {game.odds.draw && (<button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm"><span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.draw)}</span><span className="text-xs text-gray-500">Draw</span></button>)}
                <button className={`bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm ${!game.odds.draw ? 'col-start-3' : ''}`}><span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.team2)}</span><span className="text-xs text-gray-500">{game.team2}</span></button>
            </div>
        </div>
    </div>
);

const LiveBettingCard = ({ bet, onClick }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-purple-500" onClick={() => onClick(bet)}>
        <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{bet.sport} - {bet.match}</span>
                <span className="font-bold text-purple-500">{bet.time} Betting</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{bet.market}</h3>
            <div className="grid grid-cols-2 gap-2 text-center">
                {bet.options.map((option, index) => (
                    <button key={index} className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 text-sm flex flex-col items-center justify-center">
                        <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(option.odds)}</span>
                        <span className="text-xs text-gray-500">{option.player}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

const MatchStatsModal = ({ game, onClose, showAlert }) => {
    if (!game) return null;
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    const handleShare = async () => {
        const shareData = { title: `${game.team1} vs ${game.team2}`, text: `Check out the live stats for ${game.team1} vs ${game.team2}!`, url: window.location.href };
        const showConfirmation = () => { setShowShareConfirmation(true); setTimeout(() => setShowConfirmation(false), 2000); };
        try {
            if (navigator.share) { await navigator.share(shareData); } else { throw new Error("Web Share API not supported"); }
        } catch (err) {
            try { await navigator.clipboard.writeText(shareData.url); showConfirmation(); } catch (clipErr) { console.error("Clipboard API failed:", clipErr); }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm m-4" onClick={e => e.stopPropagation()}>
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-md font-bold">{game.team1} vs {game.team2}</h2>
                    <button onClick={onClose}><X size={20} /></button>
                </div>
                <div className="p-3">
                    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">{game.team1}</span>
                            <span className="text-2xl font-bold">{game.score1}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-lg font-bold">{game.team2}</span>
                            <span className="text-2xl font-bold">{game.score2}</span>
                        </div>
                        <p className="text-center text-red-500 font-bold text-xs mt-1 animate-pulse">{game.time}</p>
                    </div>
                    <h3 className="font-bold text-sm mt-3 mb-1">Team Stats</h3>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-center text-xs">
                        <div className="font-bold text-gray-500 dark:text-gray-400">{game.team1}</div>
                        <div className="font-bold text-gray-500 dark:text-gray-400">Stat</div>
                        <div className="font-bold text-gray-500 dark:text-gray-400">{game.team2}</div>
                        {Object.keys(game.stats.team1).map(key => (
                            <React.Fragment key={key}>
                                <div className="font-semibold">{game.stats.team1[key]}</div>
                                <div className="text-xs text-gray-500">{key}</div>
                                <div className="font-semibold">{game.stats.team2[key]}</div>
                            </React.Fragment>
                        ))}
                    </div>
                    <h3 className="font-bold text-sm mt-3 mb-1">Top Performers</h3>
                    {game.stats.topPerformers.map((player, index) => (
                        <div key={index} className="flex justify-between items-center text-xs mb-1">
                            <span>{player.name}</span>
                            <span className="font-semibold text-xs">PTS: {player.pts} | REB: {player.reb} | AST: {player.ast}</span>
                        </div>
                    ))}
                </div>
                <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center">
                    <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full flex items-center space-x-1 transition-colors ${isLiked ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                        <ThumbsUp size={18} className={isLiked ? 'fill-current' : ''} /> <span className="text-xs">Like</span>
                    </button>
                    <button onClick={() => setIsDisliked(!isDisliked)} className={`p-2 rounded-full flex items-center space-x-1 transition-colors ${isDisliked ? 'text-red-500' : 'hover:text-red-500'}`}>
                        <ThumbsDown size={18} className={isDisliked ? 'fill-current' : ''} /> <span className="text-xs">Dislike</span>
                    </button>
                    <button onClick={handleShare} className="p-2 rounded-full flex items-center space-x-1 hover:text-green-500">
                        <Share2 size={18} /> <span className="text-xs">Share</span>
                    </button>
                </div>
                {showShareConfirmation && <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">Link Copied!</div>}
            </div>
        </div>
    );
};

const NewPostModal = ({ onClose, showAlert, usersData }) => {
    const [postContent, setPostContent] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [taggedUsers, setTaggedUsers] = useState('');
    const [showPollInputs, setShowPollInputs] = useState(false);

    const handleMediaChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setMediaFile(e.target.files[0].name);
        }
    };

    const handlePollOptionChange = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const addPollOption = () => {
        if (pollOptions.length < 4) {
            setPollOptions([...pollOptions, '']);
        }
    };

    const handleSubmitPost = () => {
        console.log('New Post:', {
            content: postContent,
            media: mediaFile,
            poll: showPollInputs ? pollOptions.filter(opt => opt.trim() !== '') : null,
            taggedUsers: taggedUsers.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
            time: new Date().toISOString(),
            userId: 'currentuser',
        });
        showAlert('Post created successfully!', 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create New Post</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <textarea
                        className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 resize-y"
                        rows="6"
                        placeholder="What's on your mind? Share your sports thoughts, news, or updates!"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                    ></textarea>

                    <div className="flex flex-wrap items-center gap-4">
                        <label htmlFor="media-upload" className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors shadow-md">
                            <Image size={20} />
                            <span>Add Media</span>
                            <input type="file" id="media-upload" className="hidden" onChange={handleMediaChange} />
                        </label>
                        {mediaFile && <span className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center"><Film size={16} className="mr-1"/> {mediaFile}</span>}

                        <button onClick={() => setShowPollInputs(!showPollInputs)} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors shadow-md ${showPollInputs ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                            <ListTodo size={20} />
                            <span>{showPollInputs ? 'Hide Poll' : 'Create Poll'}</span>
                        </button>
                    </div>

                    {showPollInputs && (
                        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg mb-2">Poll Options:</p>
                            {pollOptions.map((option, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                                />
                            ))}
                            {pollOptions.length < 4 && (
                                <button onClick={addPollOption} className="text-blue-500 text-sm font-semibold hover:underline mt-2">
                                    + Add another option
                                </button>
                            )}
                        </div>
                    )}

                    <div>
                        <label htmlFor="tagged-users" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tag Users (e.g., @LeBron James, @Man Utd)</label>
                        <input
                            type="text"
                            id="tagged-users"
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                            value={taggedUsers}
                            onChange={(e) => setTaggedUsers(e.target.value)}
                        />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSubmitPost}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={postContent.trim() === '' && !mediaFile && !showPollInputs}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};


const LiveTab = ({ onGameClick, onBettingCardClick }) => {
    const [liveGames, setLiveGames] = useState(initialLiveGames);
    const [liveBets, setLiveBets] = useState(mockLiveBets);
    const [viewingLiveMatch, setViewingLiveMatch] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setLiveGames(prevGames =>
                prevGames.map(game => {
                    const newOdds = { ...game.odds };
                    for (const key in newOdds) { if (typeof newOdds[key] === 'number') { const change = (Math.random() - 0.5) * (key === 'total' ? 1 : 20); newOdds[key] = Math.round(newOdds[key] + change); } }
                    return { ...game, score1: game.score1 + (Math.random() > 0.9 ? 1 : 0), score2: game.score2 + (Math.random() > 0.9 ? 1 : 0), odds: newOdds, };
                })
            );
            setLiveBets(prevBets =>
                prevBets.map(bet => {
                    const newOptions = bet.options.map(option => ({
                        ...option,
                        odds: option.odds + (Math.random() - 0.5) * 5
                    }));
                    const newAllMarkets = bet.allMarkets.map(market => ({
                        ...market,
                        options: market.options.map(option => ({
                            ...option,
                            odds: option.odds + (Math.random() - 0.5) * 5
                        }))
                    }));
                    return { ...bet, options: newOptions, allMarkets: newAllMarkets };
                })
            );
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 max-w-lg mx-auto">Live Now</h2>
            {liveGames.map(game => (
                <LiveGameCard key={game.id} game={game} onClick={() => setViewingLiveMatch(game)} />
            ))}

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8 max-w-lg mx-auto">Live Betting</h2>
            {liveBets.map(bet => <LiveBettingCard key={bet.id} bet={bet} onClick={onBettingCardClick} />)}

            {viewingLiveMatch && <LiveMatchScreen match={viewingLiveMatch} onClose={() => setViewingLiveMatch(null)} />}
        </div>
    );
};

// Story Component
const Story = ({ story, onClick, usersData }) => {
    const user = usersData[story.userId];
    if (!user) return null;

    return (
        <div className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer" onClick={onClick}>
            <div className={`p-0.5 rounded-full ${story.viewed ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500'}`}>
                <div className="bg-white dark:bg-black p-0.5 rounded-full">
                    <img src={user.avatar} alt={user.user} className="w-16 h-16 rounded-full" />
                </div>
            </div>
            <p className="text-xs text-center text-gray-700 dark:text-gray-300 w-20 truncate">{user.user}</p>
        </div>
    );
};

// StoriesTray Component
const StoriesTray = ({ stories, onStoryClick, onUserClick, usersData }) => (
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 py-3 px-2">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2 -mb-2 no-scrollbar">
            {stories.map((story, index) => (
                <Story key={story.id} story={story} onClick={() => onStoryClick(index)} onUserClick={onUserClick} usersData={usersData} />
            ))}
        </div>
    </div>
);

// SportsFeed Component
const SportsFeed = ({ onStoryClick, onUserClick, onFollowToggle, isFollowingUser, showAlert, usersData }) => (
    <div className="w-full bg-gray-50 dark:bg-black">
        <div className="max-w-lg mx-auto">
            <StoriesTray stories={mockStories} onStoryClick={onStoryClick} onUserClick={onUserClick} usersData={usersData} />
        </div>
        <div className="pt-6">
            {mockPosts.map(post => <PostCard key={post.id} post={post} onUserClick={onUserClick} onFollowToggle={onFollowToggle} isFollowingUser={isFollowingUser} showAlert={showAlert} usersData={usersData} />)}
        </div>
    </div>
);

// MessageItem Component
const MessageItem = ({ msg, onUserClick, usersData }) => {
    const user = usersData[msg.userId];
    if (!user) return null;

    return (
        <div className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer" onClick={() => onUserClick(user.id)}>
            <img src={user.avatar} alt={user.user} className="w-12 h-12 rounded-full mr-4" />
            <div className="flex-grow overflow-hidden">
                <div className="flex justify-between">
                    <div className="font-bold text-gray-800 dark:text-gray-200 flex items-center">{user.user} <VerifiedBadge tier={user.verificationTier} /></div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 ml-2">{msg.time}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{msg.message}</p>
            </div>
            <PlatformIcon platform={msg.platform} className="w-5 h-5 ml-3 flex-shrink-0" />
        </div>
    );
};

// Messaging Component
const Messaging = ({ onUserClick, usersData }) => {
    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full text-gray-800 dark:text-gray-200">
            <div className="max-w-lg mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Sports Chat</h2>
                    <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Plus size={24} />
                    </button>
                </div>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="space-y-2">
                    {mockMessages.map(msg => <MessageItem key={msg.id} msg={msg} onUserClick={onUserClick} usersData={usersData} />)}
                </div>
            </div>
        </div>
    );
};

// LoginPage Component
const LoginPage = ({ onLogin, showAlert }) => {
    const [loginType, setLoginType] = useState('email');
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (forgotPasswordMode) {
            showAlert(`Reset password link sent to: ${email || mobile}`, 'info');
            setForgotPasswordMode(false);
        } else if (isSignUp) {
            showAlert(`Sign Up successful for: ${email || mobile || 'Social Account'}`, 'success');
            onLogin();
        } else {
            showAlert(`Login successful for: ${email || mobile || 'Social/PIN Account'}`, 'success');
            onLogin();
        }
    };

    const renderFormFields = () => {
        if (forgotPasswordMode) {
            return (
                <>
                    <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors">Reset Password</button>
                    <button type="button" onClick={() => setForgotPasswordMode(false)} className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-300 transition-colors mt-2">Back to Login</button>
                </>
            );
        }

        switch (loginType) {
            case 'email':
                return (
                    <>
                        <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </>
                );
            case 'mobile':
                return (
                    <>
                        <input type="tel" placeholder="Mobile Number" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <input type="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </>
                );
            case 'pin':
                return (
                    <>
                        <input type="text" placeholder="Enter PIN" className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" maxLength="4" value={pin} onChange={(e) => setPin(e.target.value)} />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    {forgotPasswordMode ? 'Reset Password' : (isSignUp ? 'Sign Up' : 'Login')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderFormFields()}

                    {!forgotPasswordMode && (
                        <>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors">
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </button>
                        </>
                    )}
                </form>

                {!forgotPasswordMode && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Or {isSignUp ? 'sign up' : 'login'} with:</p>
                        <div className="flex justify-center space-x-4 mb-4">
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-blue-600"><Facebook size={24} /></button>
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-red-600"><MailOpen size={24} /></button>
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-gray-500" onClick={() => setLoginType('pin')}><KeyRound size={24} /></button>
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-blue-400" onClick={() => setLoginType('mobile')}><Phone size={24} /></button>
                        </div>
                        <button onClick={() => setLoginType('email')} className="text-blue-500 hover:underline text-sm">
                            {loginType === 'email' ? 'Use another method' : 'Use Email'}
                        </button>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {isSignUp ? "Already have an account? " : "Don't have an account? "}
                            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:underline font-semibold">
                                {isSignUp ? 'Login' : 'Sign Up'}
                            </button>
                        </p>
                        {!isSignUp && (
                            <button type="button" onClick={() => setForgotPasswordMode(true)} className="text-blue-500 hover:underline text-sm mt-2">
                                Forgot Password?
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


// LiveMatchScreen Component
const LiveMatchScreen = ({ match, onClose }) => {
    if (!match) return null;

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl h-full max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <h2 className="text-lg font-bold">{match.team1} vs {match.team2} - LIVE</h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-white"><X size={24} /></button>
                </div>
                <div className="flex-1 flex items-center justify-center bg-black">
                    <Video size={64} className="text-gray-600" />
                    <p className="text-white ml-4">Live Stream Placeholder</p>
                </div>
                <div className="p-4 bg-gray-800 text-white flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold">{match.score1}</p>
                        <p className="text-sm">{match.team1}</p>
                    </div>
                    <div className="text-red-500 font-bold text-lg flex items-center">{match.time}</div>
                    <div>
                        <p className="text-2xl font-bold">{match.score2}</p>
                        <p className="text-sm">{match.team2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// LiveBettingModal Component
const LiveBettingModal = ({ bet, onClose, showAlert }) => {
    if (!bet) return null;
    const [selectedOption, setSelectedOption] = useState(null);
    const [betAmount, setBetAmount] = useState('');

    const handlePlaceBet = () => {
        if (!selectedOption || betAmount <= 0) {
            showAlert('Please select an option and enter a valid bet amount.', 'error');
            return;
        }
        showAlert(`Bet placed: TSh ${betAmount} on ${selectedOption.name || selectedOption.player} (${formatOdds(selectedOption.odds)}) for ${bet.match}`, 'success');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Live Betting: {bet.match}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><X size={24} /></button>
                </div>
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Market: <span className="font-semibold text-purple-600">{bet.market}</span></p>

                    {bet.allMarkets.map((market, index) => (
                        <div key={index} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                            <h3 className="font-bold text-md mb-2">{market.name}</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {market.options.map((option, optIndex) => (
                                    <button
                                        key={optIndex}
                                        onClick={() => setSelectedOption(option)}
                                        className={`p-3 rounded-md border text-sm flex flex-col items-center justify-center transition-all ${selectedOption?.name === option.name && selectedOption?.player === option.player ? 'bg-purple-600 text-white border-purple-700' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        <span className="font-bold">{option.name || option.player}</span>
                                        <span className="text-xs">{formatOdds(option.odds)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="mt-4">
                        <label htmlFor="bet-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bet Amount (TSh)</label>
                        <input
                            type="number"
                            id="bet-amount"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            placeholder="e.g., 10000"
                            className="w-full p-3 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handlePlaceBet}
                        className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedOption || betAmount <= 0}
                    >
                        Place Bet
                    </button>
                </div>
            </div>
        </div>
    );
};


// OnlineShop Components
const ShopProductCard = ({ product, onProductClick, isOffer = false }) => {
    let priceDisplay;
    if (product.type === 'membership') {
        priceDisplay = 'Various Tiers';
    } else if (product.offerPrice !== undefined && product.offerPrice !== null) {
        priceDisplay = `TSh ${product.offerPrice.toLocaleString()}`;
    } else if (product.price !== undefined && product.price !== null) {
        if (typeof product.price === 'object' && product.price.Regular !== undefined && product.price.Regular !== null) {
            priceDisplay = `From TSh ${product.price.Regular.toLocaleString()}`;
        } else if (typeof product.price === 'number') {
            priceDisplay = `TSh ${product.price.toLocaleString()}`;
        } else {
            priceDisplay = 'Price N/A';
        }
    } else {
        priceDisplay = 'Price N/A';
    }
    const offerPriceDisplay = `TSh ${product.offerPrice?.toLocaleString()}`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col text-center transition-transform hover:scale-105 cursor-pointer relative" onClick={() => onProductClick(product)}>
            {isOffer && <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">PROMOTION!</span>}
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4 rounded-md" />
            <h4 className="font-bold text-md flex-grow text-gray-800 dark:text-gray-200">{product.name}</h4>
            {isOffer && product.originalPrice && <p className="text-sm text-gray-500 line-through">TSh {product.originalPrice.toLocaleString()}</p>}
            <p className="text-lg font-semibold text-blue-600 my-2">{isOffer ? offerPriceDisplay : priceDisplay}</p>
            <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700 font-semibold w-full">View Details</button>
        </div>
    );
};

const ShopModal = ({ item, onClose, onAddToCart }) => {
    if (!item) return null;

    const [details, setDetails] = useState({
        color: item.colors ? item.colors[0] : null,
        size: item.sizes ? item.sizes[0] : null,
        ticketType: item.type === 'ticket' ? 'Regular' : null,
        membershipTier: item.membershipTiers ? item.membershipTiers[0] : null,
    });

    const handleDetailChange = (type, value) => {
        setDetails(prev => ({ ...prev, [type]: value }));
    };

    const handleAddToCart = () => {
        onAddToCart(item, details);
        onClose();
    };

    const getPrice = () => {
        if (item.type === 'ticket') return item.price[details.ticketType];
        if (item.type === 'membership') return details.membershipTier.price;
        return item.price || item.offerPrice;
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400"><X size={24} /></button>
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{item.name}</h3>
                    <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-md mb-4" />
                    
                    {item.type === 'merchandise' && (<>
                        <div className="mb-4"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color:</label><select onChange={(e) => handleDetailChange('color', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">{item.colors.map(color => <option key={color} value={color}>{color}</option>)}</select></div>
                        <div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size:</label><select onChange={(e) => handleDetailChange('size', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">{item.sizes.map(size => <option key={size} value={size}>{size}</option>)}</select></div>
                    </>)}

                    {item.type === 'ticket' && (<div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ticket Type:</label><select onChange={(e) => handleDetailChange('ticketType', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1"><option value="Regular">Regular - TSh {item.price.Regular.toLocaleString()}</option><option value="VIP">VIP - TSh {item.price.VIP.toLocaleString()}</option></select></div>)}
                    
                    {item.type === 'membership' && (<div className="mb-6"><label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Membership Tier:</label><select onChange={(e) => handleDetailChange('membershipTier', item.membershipTiers.find(t => t.name === e.target.value))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">{item.membershipTiers.map(tier => <option key={tier.name} value={tier.name}>{tier.name} ({tier.duration}) - TSh {tier.price.toLocaleString()}</option>)}</select></div>)}

                    <button onClick={handleAddToCart} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 w-full">Add to Cart (TSh {getPrice().toLocaleString()})</button>
                </div>
            </div>
        </div>
    );
};

const OnlineShop = ({ showAlert, onPaymentSuccess }) => {
    const [activeTab, setActiveTab] = useState('merchandise');
    const [cart, setCart] = useState([]);
    const [view, setView] = useState('shop');
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const getTeamName = (id) => shopTeams.find(t => t.id === id)?.name || 'Unknown Team';

    useEffect(() => {
        const savedCart = localStorage.getItem('sportSphereCart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('sportSphereCart', JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = (item, details) => {
        let price, uniqueId, name;
        if (item.type === 'ticket') {
            price = item.price[details.ticketType];
            name = `${item.name} (${details.ticketType})`;
            uniqueId = `${item.id}-${details.ticketType}`;
        } else if (item.type === 'membership') {
            price = details.membershipTier.price;
            name = `${item.name} Membership (${details.membershipTier.name})`;
            uniqueId = `${item.id}-${details.membershipTier.name}`;
        } else if (item.type === 'azam_hardware' || item.type === 'azam_subscription') {
            price = item.price;
            name = item.name;
            uniqueId = item.id;
        } else {
            price = item.price || item.offerPrice;
            name = item.name;
            uniqueId = `${item.id}-${details.color}-${details.size}`;
        }
        
        const existingItem = cart.find(cartItem => cartItem.uniqueId === uniqueId);
        if (existingItem) {
            setCart(cart.map(cartItem => cartItem.uniqueId === uniqueId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
        } else {
            setCart([...cart, { ...item, ...details, price, name, quantity: 1, uniqueId }]);
        }
        showAlert(`${name} added to cart!`, 'success');
    };
    
    const updateCartQuantity = (uniqueId, change) => {
        setCart(currentCart => {
            const itemToUpdate = currentCart.find(item => item.uniqueId === uniqueId);
            if (itemToUpdate.quantity + change <= 0) return currentCart.filter(item => item.uniqueId !== uniqueId);
            return currentCart.map(item => item.uniqueId === uniqueId ? { ...item, quantity: item.quantity + change } : item);
        });
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const renderShopContent = () => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        switch (activeTab) {
            case 'merchandise':
            case 'ticket':
                const products = shopProducts.filter(p => p.type === activeTab && p.name.toLowerCase().includes(lowerSearchTerm));
                return products.map(p => <ShopProductCard key={p.id} product={p} onProductClick={setSelectedItem} />);
            case 'membership':
                const teams = shopTeams.filter(t => t.name.toLowerCase().includes(lowerSearchTerm));
                return teams.map(team => <ShopProductCard key={team.id} product={{...team, type:'membership', membershipTiers: team.membershipTiers}} onProductClick={(item) => setSelectedItem(item)} />);
            case 'azamtv':
                const azamItems = [...azamTvData.hardware.map(h => ({...h, type: 'azam_hardware'})), ...azamTvData.subscriptions.map(s => ({...s, type: 'azam_subscription', image: 'https://placehold.co/400x400/00aef0/ffffff?text=Subscription'}))];
                return azamItems.filter(p => p.name.toLowerCase().includes(lowerSearchTerm)).map(p => <ShopProductCard key={p.id} product={p} onProductClick={setSelectedItem} />);
            case 'offers':
                return bestOffers.filter(p => p.name.toLowerCase().includes(lowerSearchTerm)).map(p => <ShopProductCard key={p.id} product={{...p, type: 'offer'}} onProductClick={setSelectedItem} isOffer={true} />);
            default:
                return <p>No items found.</p>;
        }
    };

    const ShopTabView = () => (
        <>
            <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Online Shop</h2><button onClick={() => setView('cart')} className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><ShoppingCart size={24} />{cart.length > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}</button></div>
            <div className="mb-6">
                <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-md p-1 flex-wrap">
                    {['merchandise', 'membership', 'ticket', 'azamtv', 'offers'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 p-2 rounded-md font-semibold text-sm capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>{tab.replace('azamtv', 'AzamTV')}</button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{renderShopContent()}</div>
        </>
    );

    const CartView = () => (
        <>
            <div className="flex items-center mb-6"><button onClick={() => setView('shop')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4"><ArrowLeft size={24} /></button><h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Your Cart</h2></div>
            {cart.length === 0 ? <p className="text-center text-gray-500">Your cart is empty.</p> : (
                <div>
                    {cart.map(item => (<div key={item.uniqueId} className="flex items-center justify-between py-4 border-b dark:border-gray-700"><div className="flex items-center gap-4"><img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-md" /><div><p className="font-bold text-gray-800 dark:text-gray-200">{item.name}</p><p className="text-sm text-gray-500">TSh {item.price.toLocaleString()}</p></div></div><div className="flex items-center gap-4"><div className="flex items-center border rounded-md dark:border-gray-600"><button onClick={() => updateCartQuantity(item.uniqueId, -1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">-</button><span className="px-4">{item.quantity}</span><button onClick={() => updateCartQuantity(item.uniqueId, 1)} className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">+</button></div></div></div>))}
                    <div className="mt-6 text-right"><p className="text-xl font-bold">Total: <span className="text-blue-600">TSh {cartTotal.toLocaleString()}</span></p><button onClick={() => setShowPaymentModal(true)} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg mt-4 hover:bg-blue-700">Proceed to Checkout</button></div>
                </div>
            )}
        </>
    );

    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full text-gray-800 dark:text-gray-200">
            <div className="max-w-6xl mx-auto">
                {view === 'shop' ? <ShopTabView /> : <CartView />}
            </div>
            {selectedItem && <ShopModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={handleAddToCart} />}
            {showPaymentModal && (
                <PaymentModal
                    cartItems={cart}
                    totalAmount={cartTotal}
                    onClose={() => setShowPaymentModal(false)}
                    onPaymentSuccess={(order) => {
                        onPaymentSuccess(order);
                        setCart([]);
                        setShowPaymentModal(false);
                        setView('shop');
                    }}
                    showAlert={showAlert}
                />
            )}
        </div>
    );
};

// PaymentModal Component
const PaymentModal = ({ cartItems, totalAmount, onClose, onPaymentSuccess, showAlert }) => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
    const [mobileMoneyProvider, setMobileMoneyProvider] = useState('M-Pesa');
    const [shippingOption, setShippingOption] = useState('standard');
    const [addInsurance, setAddInsurance] = useState(false);

    const shippingCosts = {
        standard: 5000,
        express: 15000,
    };
    const insuranceCost = 2000;

    const currentShippingCost = shippingCosts[shippingOption];
    const currentInsuranceCost = addInsurance ? insuranceCost : 0;
    const finalTotal = totalAmount + currentShippingCost + currentInsuranceCost;

    const handlePayment = () => {
        console.log("Processing payment...");
        console.log("Method:", paymentMethod);
        if (paymentMethod === 'card') {
            console.log("Card Details:", cardDetails);
            if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
                showAlert('Please fill in all card details.', 'error');
                return;
            }
        } else {
            console.log("Mobile Money:", mobileMoneyNumber, mobileMoneyProvider);
            if (!mobileMoneyNumber || !mobileMoneyProvider) {
                showAlert('Please enter mobile money number and select a provider.', 'error');
                return;
            }
        }

        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            const trackingNumber = `TRACK-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;
            const orderDate = new Date().toISOString();

            const order = {
                id: orderId,
                date: orderDate,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    details: { color: item.color, size: item.size, ticketType: item.ticketType, membershipTier: item.membershipTier?.name }
                })),
                total: finalTotal,
                paymentMethod: paymentMethod === 'card' ? 'Credit Card' : mobileMoneyProvider,
                shipmentStatus: 'Processing',
                trackingNumber: trackingNumber,
                shippingOption: shippingOption,
                insuranceOption: addInsurance ? 'Yes' : 'No',
            };
            onPaymentSuccess(order);
            showAlert('Payment successful! Your order has been placed.', 'success');
        } else {
            showAlert('Payment failed. Please try again.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Complete Your Purchase</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="flex justify-around mb-4">
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            Credit Card
                        </button>
                        <button
                            onClick={() => setPaymentMethod('mobile_money')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${paymentMethod === 'mobile_money' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            Mobile Money
                        </button>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            <input type="text" placeholder="Cardholder Name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            <div className="flex space-x-4">
                                <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                                <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'mobile_money' && (
                        <div className="space-y-4">
                            <select value={mobileMoneyProvider} onChange={(e) => setMobileMoneyProvider(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200">
                                <option value="M-Pesa">M-Pesa</option>
                                <option value="Tigo Pesa">Tigo Pesa</option>
                                <option value="Airtel Money">Airtel Money</option>
                            </select>
                            <input type="tel" placeholder="Mobile Money Number" value={mobileMoneyNumber} onChange={(e) => setMobileMoneyNumber(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                        </div>
                    )}

                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Shipping Options:</h3>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" value="standard" checked={shippingOption === 'standard'} onChange={() => setShippingOption('standard')} className="form-radio text-blue-600" />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Standard Shipping (TSh {shippingCosts.standard.toLocaleString()})</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" value="express" checked={shippingOption === 'express'} onChange={() => setShippingOption('express')} className="form-radio text-blue-600" />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Express Shipping (TSh {shippingCosts.express.toLocaleString()})</span>
                            </label>
                        </div>
                        <label className="flex items-center mt-2">
                            <input type="checkbox" checked={addInsurance} onChange={() => setAddInsurance(!addInsurance)} className="form-checkbox text-blue-600" />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Add Shipping Insurance (TSh {insuranceCost.toLocaleString()})</span>
                        </label>
                    </div>

                    <div className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Total: TSh {finalTotal.toLocaleString()}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handlePayment}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};


// OrdersPage Component
const OrdersPage = ({ purchaseHistory }) => {
    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full text-gray-800 dark:text-gray-200">
            <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">My Orders</h2>
                {purchaseHistory.length === 0 ? (
                    <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {purchaseHistory.map(order => (
                            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        order.shipmentStatus === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                                        order.shipmentStatus === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' :
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                                    }`}>
                                        {order.shipmentStatus}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Payment: {order.paymentMethod}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Shipping: {order.shippingOption === 'standard' ? 'Standard' : 'Express'} (TSh {order.shippingOption === 'standard' ? 5000 : 15000})</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Insurance: {order.insuranceOption} (TSh {order.insuranceOption === 'Yes' ? 2000 : 0})</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total: <span className="font-bold">TSh {order.total.toLocaleString()}</span></p>
                                {order.trackingNumber && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tracking: <span className="font-semibold text-blue-500">{order.trackingNumber}</span></p>
                                )}
                                <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Items:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                        {order.items.map((item, index) => (
                                            <li key={index}>{item.name} (x{item.quantity}) - TSh {item.price.toLocaleString()}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};


export default function App() {
    const [activeTab, setActiveTab] = useState('Feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [storyViewerState, setStoryViewerState] = useState({ isOpen: false, activeIndex: null });
    const [viewingProfile, setViewingProfile] = useState(null);
    const [editingProfile, setEditingProfile] = useState(null);
    const [usersData, setUsersData] = useState(allUsersById);
    const [viewingGameStats, setViewingGameStats] = useState(null);
    const [viewingLiveBetting, setViewingLiveBetting] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(new Set());
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const [messageBox, setMessageBox] = useState({ show: false, message: '', type: '' });

    const showAlert = (message, type = 'info') => {
        setMessageBox({ show: true, message, type });
    };

    const closeAlert = () => {
        setMessageBox({ show: false, message: '', type: '' });
    };

    const handleUserClick = (userId) => { setViewingProfile(usersData[userId]); };
    const handleCloseProfile = () => { setViewingProfile(null); };

    const handleEditProfile = (user) => { setEditingProfile(user); };
    const handleCloseEditProfile = () => { setEditingProfile(null); };
    const handleSaveProfile = (updatedData) => {
        const updatedUser = { ...usersData[updatedData.id], ...updatedData };
        const newUsersData = { ...usersData, [updatedData.id]: updatedUser };
        setUsersData(newUsersData);
        setViewingProfile(updatedUser);
    };

    const handleStoryClick = (index) => { setStoryViewerState({ isOpen: true, activeIndex: index }); };
    const handleCloseStoryViewer = () => { setStoryViewerState({ isOpen: false, activeIndex: null }); };
    const handleNextStory = useCallback(() => { setStoryViewerState(prevState => { if (prevState.activeIndex === null || prevState.activeIndex >= mockStories.length - 1) { return { isOpen: false, activeIndex: null }; } return { ...prevState, activeIndex: prevState.activeIndex + 1 }; }); }, [mockStories.length]);
    const handlePrevStory = () => { setStoryViewerState(prevState => { if (prevState.activeIndex === null || prevState.activeIndex <= 0) { return { ...prevState, activeIndex: 0 }; } return { ...prevState, activeIndex: prevState.activeIndex - 1 }; }); };

    const handleGameClick = (game) => { setViewingGameStats(game); };
    const handleCloseGameStats = () => { setViewingGameStats(null); };

    const handleBettingCardClick = (bet) => { setViewingLiveBetting(bet); };
    const handleCloseLiveBetting = () => { setViewingLiveBetting(null); };

    const handleFollowToggle = (userId) => {
        setFollowedUsers(prev => {
            const newFollowed = new Set(prev);
            if (newFollowed.has(userId)) {
                newFollowed.delete(userId);
            } else {
                newFollowed.add(userId);
            }
            return newFollowed;
        });
    };

    const isFollowingUser = (userId) => followedUsers.has(userId);

    const handlePaymentSuccess = (order) => {
        setPurchaseHistory(prevHistory => [...prevHistory, order]);
        showAlert('Order placed successfully!', 'success');
    };

    const renderContent = () => {
        if (viewingProfile) {
            return <ProfilePage user={viewingProfile} onClose={handleCloseProfile} onUserClick={handleUserClick} onEditProfile={handleEditProfile} onFollowToggle={handleFollowToggle} isFollowingUser={isFollowingUser} usersData={usersData} />;
        }
        switch (activeTab) {
            case 'Feed': return <SportsFeed onStoryClick={handleStoryClick} onUserClick={handleUserClick} onFollowToggle={handleFollowToggle} isFollowingUser={isFollowingUser} showAlert={showAlert} usersData={usersData} />;
            case 'Highlights': return <HighlightsHub onUserClick={handleUserClick} usersData={usersData} />;
            case 'Live': return <LiveTab onGameClick={handleGameClick} onBettingCardClick={handleBettingCardClick} />;
            case 'ProZone': return <ProZone usersData={usersData} />;
            case 'Messaging': return <Messaging onUserClick={handleUserClick} usersData={usersData} />;
            case 'OnlineShop': return <OnlineShop showAlert={showAlert} onPaymentSuccess={handlePaymentSuccess} />;
            case 'Orders': return <OrdersPage purchaseHistory={purchaseHistory} />;
            default: return <HighlightsHub onUserClick={handleUserClick} usersData={usersData} />;
        }
    };

    const NavItem = ({ icon, label, tabName }) => (
        <button onClick={() => setActiveTab(tabName)} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === tabName ? 'bg-gray-200 dark:bg-gray-700 font-bold' : 'text-gray-600 dark:text-gray-300'}` + (tabName === 'OnlineShop' || tabName === 'Orders' ? ' hidden md:flex' : '') + ` hover:bg-gray-200 dark:hover:bg-gray-700`}>
            {React.cloneElement(icon, { strokeWidth: activeTab === tabName ? 2.5 : 2 })}
            {isSidebarOpen && <span className="ml-4 font-semibold">{label}</span>}
        </button>
    );

    return (
        <>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>{`
                @keyframes progress { from { width: 0%; } to { width: 100%; } }
                .animate-progress { animation: progress linear; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.3s ease-out; }
                @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
                .animate-marquee { animation: marquee 8s linear infinite; }
            `}</style>
            
            {messageBox.show && <MessageBox message={messageBox.message} type={messageBox.type} onClose={closeAlert} />}

            {!isLoggedIn ? (
                <LoginPage onLogin={() => setIsLoggedIn(true)} showAlert={showAlert} />
            ) : (
                <div className="bg-white dark:bg-black min-h-screen flex text-gray-800 dark:text-gray-200 font-sans">
                    {storyViewerState.isOpen && (<StoryViewer stories={mockStories} activeIndex={storyViewerState.activeIndex} onClose={handleCloseStoryViewer} onNext={handleNextStory} onPrev={handlePrevStory} onUserClick={handleUserClick} usersData={usersData} />)}
                    {editingProfile && <EditProfileModal user={editingProfile} onClose={handleCloseEditProfile} onSave={handleSaveProfile} showAlert={showAlert} />}
                    {viewingGameStats && <MatchStatsModal game={viewingGameStats} onClose={handleCloseGameStats} showAlert={showAlert} />}
                    {viewingLiveBetting && <LiveBettingModal bet={viewingLiveBetting} onClose={() => setViewingLiveBetting(null)} showAlert={showAlert} />}
                    {showNewPostModal && <NewPostModal onClose={() => setShowNewPostModal(false)} showAlert={showAlert} usersData={usersData} />}

                    <aside className={`bg-white dark:bg-black transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800`}>
                        <div className={`flex items-center p-4 h-16 border-b border-gray-200 dark:border-gray-800 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>{isSidebarOpen ? <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1> : <Trophy className="text-pink-500" size={28}/>}</div>
                        <nav className="flex-grow p-4 space-y-2">
                            <NavItem icon={<Shield size={28} />} label="Feed" tabName="Feed" />
                            <NavItem icon={<Video size={28} />} label="Highlights" tabName="Highlights" />
                            <NavItem icon={<Radio size={28} />} label="Live" tabName="Live" />
                            <NavItem icon={<Briefcase size={28} />} label="Pro Zone" tabName="ProZone" />
                            <NavItem icon={<Mail size={28} />} label="Messages" tabName="Messaging" />
                            <NavItem icon={<ShoppingCart size={28} />} label="Online Shop" tabName="OnlineShop" />
                            <NavItem icon={<Award size={28} />} label="Orders" tabName="Orders" />
                        </nav>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"><Menu size={28}/>{isSidebarOpen && <span className="ml-4 font-semibold">Menu</span>}</button></div>
                    </aside>
                    <main className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-black">
                        <header className="bg-white dark:bg-black h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 z-20 flex-shrink-0 md:hidden"><h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1><div className="flex items-center space-x-4"><button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Bell size={24} /></button><button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Mail size={24} /></button></div></header>
                        <div className="flex-1 overflow-y-auto">{renderContent()}</div>

                        <button
                            className="fixed bottom-20 right-6 md:bottom-6 md:right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30"
                            onClick={() => setShowNewPostModal(true)}
                        >
                            <Plus size={28} />
                        </button>
                    </main>
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around p-2">
                        <button onClick={() => setActiveTab('Feed')} className={`p-2 rounded-full ${activeTab === 'Feed' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Shield size={28} strokeWidth={activeTab === 'Feed' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Highlights')} className={`p-2 rounded-full ${activeTab === 'Highlights' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Video size={28} strokeWidth={activeTab === 'Highlights' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Live')} className={`p-2 rounded-full ${activeTab === 'Live' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Radio size={28} strokeWidth={activeTab === 'Live' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('ProZone')} className={`p-2 rounded-full ${activeTab === 'ProZone' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Briefcase size={28} strokeWidth={activeTab === 'ProZone' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('OnlineShop')} className={`p-2 rounded-full ${activeTab === 'OnlineShop' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><ShoppingCart size={28} strokeWidth={activeTab === 'OnlineShop' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Orders')} className={`p-2 rounded-full ${activeTab === 'Orders' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Award size={28} strokeWidth={activeTab === 'Orders' ? 2.5: 2}/></button>
                        <button onClick={() => { handleUserClick('currentuser'); }} className={`p-2 rounded-full text-gray-500`}><img src={usersData['currentuser'].avatar} alt="User" className="w-7 h-7 rounded-full" /></button>
                    </nav>
                </div>
            )}

            <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-300 py-6 text-center border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
                        <a href="#" className="hover:underline">Contact Us</a>
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Follow Us</a>
                    </div>
                    <p className="text-sm">Developed by: David Mbazza</p>
                </div>
            </footer>
        </>
    );
}
