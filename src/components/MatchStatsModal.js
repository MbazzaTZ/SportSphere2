import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

/**
 * MatchStatsModal Component
 * Displays a modal with detailed statistics for a live sports game,
 * including scores, team stats, and top performers.
 * Allows users to like, dislike, and share the stats.
 *
 * @param {object} props - The component props.
 * @param {object} props.game - The game object containing:
 * - team1: Name of the first team.
 * - team2: Name of the second team.
 * - score1: Score of the first team.
 * - score2: Score of the second team.
 * - time: Current game time/status (e.g., "4Q 2:12").
 * - stats: Detailed statistics for both teams and top performers.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.showAlert - Function to display an alert message.
 */
const MatchStatsModal = ({ game, onClose, showAlert }) => {
    // State for like and dislike status
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    // State to control the visibility of the "Link Copied!" confirmation
    const [showShareConfirmation, setShowShareConfirmation] = useState(false);

    // If no game object is provided, don't render the modal
    if (!game) return null;

    /**
     * Handles sharing the match statistics. Attempts to use Web Share API,
     * falls back to Clipboard API, and displays a confirmation message.
     */
    const handleShare = async () => {
        const shareData = {
            title: `${game.team1} vs ${game.team2}`, // Title for sharing
            text: `Check out the live stats for ${game.team1} vs ${game.team2}!`, // Text for sharing
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
        // Fixed overlay to cover the entire screen, closes modal on click outside content
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={onClose}>
            {/* Modal content container, prevents closing when clicking inside */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm m-4" onClick={e => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-md font-bold">{game.team1} vs {game.team2}</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                {/* Modal Body - Game Summary and Stats */}
                <div className="p-3">
                    {/* Game Score Summary */}
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
                    {/* Team Stats Section */}
                    <h3 className="font-bold text-sm mt-3 mb-1">Team Stats</h3>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-center text-xs">
                        <div className="font-bold text-gray-500 dark:text-gray-400">{game.team1}</div>
                        <div className="font-bold text-gray-500 dark:text-gray-400">Stat</div>
                        <div className="font-bold text-gray-500 dark:text-gray-400">{game.team2}</div>
                        {/* Map through team stats and display them */}
                        {Object.keys(game.stats.team1).map(key => (
                            <React.Fragment key={key}>
                                <div className="font-semibold">{game.stats.team1[key]}</div>
                                <div className="text-xs text-gray-500">{key}</div>
                                <div className="font-semibold">{game.stats.team2[key]}</div>
                            </React.Fragment>
                        ))}
                    </div>
                    {/* Top Performers Section */}
                    <h3 className="font-bold text-sm mt-3 mb-1">Top Performers</h3>
                    {game.stats.topPerformers.map((player, index) => (
                        <div key={index} className="flex justify-between items-center text-xs mb-1">
                            <span>{player.name}</span>
                            <span className="font-semibold text-xs">PTS: {player.pts} | REB: {player.reb} | AST: {player.ast}</span>
                        </div>
                    ))}
                </div>
                {/* Modal Footer - Action Buttons */}
                <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex justify-around items-center">
                    {/* Like button */}
                    <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full flex items-center space-x-1 transition-colors ${isLiked ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                        <ThumbsUp size={18} className={isLiked ? 'fill-current' : ''} /> <span className="text-xs">Like</span>
                    </button>
                    {/* Dislike button */}
                    <button onClick={() => setIsDisliked(!isDisliked)} className={`p-2 rounded-full flex items-center space-x-1 transition-colors ${isDisliked ? 'text-red-500' : 'hover:text-red-500'}`}>
                        <ThumbsDown size={18} className={isDisliked ? 'fill-current' : ''} /> <span className="text-xs">Dislike</span>
                    </button>
                    {/* Share button */}
                    <button onClick={handleShare} className="p-2 rounded-full flex items-center space-x-1 hover:text-green-500">
                        <Share2 size={18} /> <span className="text-xs">Share</span>
                    </button>
                </div>
                {/* Share confirmation message */}
                {showShareConfirmation && <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">Link Copied!</div>}
            </div>
        </div>
    );
};

export default MatchStatsModal;