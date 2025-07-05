import React from 'react';
import VideoCard from './VideoCard';
import { mockVideos } from '../data/allData';

/**
 * HighlightsHub Component
 * The main container for the vertical video feed.
 * It renders a list of VideoCard components, allowing for a scrollable
 * experience similar to short-form video platforms.
 *
 * @param {object} props - The component props.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked within a VideoCard.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId, passed to VideoCard.
 */
const HighlightsHub = ({ onUserClick, usersData }) => (
    <div className="h-full w-full overflow-y-auto snap-y snap-mandatory">
        {mockVideos.map(video => (
            <VideoCard
                key={video.id}
                video={video}
                onUserClick={onUserClick}
                usersData={usersData}
            />
        ))}
    </div>
);

export default HighlightsHub;