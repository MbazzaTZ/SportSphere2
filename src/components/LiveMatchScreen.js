import React from 'react';
import { X, Video } from 'lucide-react'; // Assuming X and Video icons are used

/**
 * LiveMatchScreen Component
 * Displays a full-screen modal for viewing a live sports match,
 * including a placeholder for a video stream, scores, and game time.
 *
 * @param {object} props - The component props.
 * @param {object} props.match - The match object containing:
 * - team1: Name of the first team.
 * - team2: Name of the second team.
 * - score1: Score of the first team.
 * - score2: Score of the second team.
 * - time: Current game time/status (e.g., "4Q 2:12").
 * @param {function} props.onClose - Callback function to close the modal.
 */
const LiveMatchScreen = ({ match, onClose }) => {
    // If no match object is provided, don't render the modal
    if (!match) return null;

    return (
        // Fixed overlay to cover the entire screen, with a dark background
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
            {/* Main container for the match screen */}
            <div className="w-full max-w-4xl h-full max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col">
                {/* Header with match title and close button */}
                <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                    <h2 className="text-lg font-bold">{match.team1} vs {match.team2} - LIVE</h2>
                    <button onClick={onClose} className="text-gray-300 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                {/* Live Video Stream Placeholder */}
                <div className="flex-1 flex items-center justify-center bg-black">
                    <Video size={64} className="text-gray-600" /> {/* Video icon as placeholder */}
                    <p className="text-white ml-4">Live Stream Placeholder</p>
                </div>
                {/* Score and Time Display */}
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

export default LiveMatchScreen;
