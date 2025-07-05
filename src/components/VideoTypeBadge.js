import React from 'react';
import { Star, Clipboard, Radio, Video } from 'lucide-react';

// Styles for different video types, including their label, icon, and color
const videoTypeStyles = {
    highlight: { label: 'Highlight', icon: <Star size={14} />, color: 'bg-yellow-500/80' },
    news: { label: 'News', icon: <Clipboard size={14} />, color: 'bg-blue-500/80' },
    live: { label: 'LIVE', icon: <Radio size={14} />, color: 'bg-red-600/80 animate-pulse' },
    reel: { label: 'Reel', icon: <Video size={14} />, color: 'bg-purple-600/80' },
};

/**
 * VideoTypeBadge Component
 * Displays a badge indicating the type of video (e.g., Highlight, News, LIVE, Reel).
 * It includes an icon and a colored background.
 *
 * @param {object} props - The component props.
 * @param {string} props.type - The type of video (e.g., 'highlight', 'news', 'live', 'reel').
 */
const VideoTypeBadge = ({ type }) => {
    // Get the style properties for the given video type
    const style = videoTypeStyles[type] || {};

    // If no label is defined for the type, don't render the badge
    if (!style.label) {
        return null;
    }

    return (
        // The badge container with absolute positioning, styling, and animation for 'live' type
        <div className={`absolute top-4 left-4 flex items-center space-x-2 text-white text-xs font-bold p-1.5 rounded-full backdrop-blur-md z-10 ${style.color}`}>
            {/* The icon associated with the video type */}
            {style.icon}
            {/* The label (text) for the video type */}
            <span>{style.label}</span>
        </div>
    );
};

export default VideoTypeBadge;
