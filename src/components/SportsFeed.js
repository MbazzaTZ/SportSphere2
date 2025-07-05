import React from 'react';
import PostCard from './PostCard';
import { mockPosts } from '../data/mockData';

/**
 * SportsFeed Component
 * Displays a scrollable feed of sports-related posts and stories.
 * Includes a stories section at the top and a list of posts below.
 *
 * @param {object} props - The component props.
 * @param {function} props.onStoryClick - Callback function when a story is clicked.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {function} props.onFollowToggle - Callback function to toggle follow status for a user.
 * @param {function} props.isFollowingUser - Function to check if a user is currently followed.
 * @param {function} props.showAlert - Function to display an alert message.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const SportsFeed = ({ onStoryClick, onUserClick, onFollowToggle, isFollowingUser, showAlert, usersData }) => {
    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full overflow-y-auto">
            {/* Stories Section */}
            <div className="mb-6 max-w-lg mx-auto">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">Stories</h3>
                <div className="flex space-x-3 overflow-x-auto pb-2">
                    {/* Add Your Story */}
                    <div className="flex-shrink-0 text-center cursor-pointer" onClick={() => showAlert('Story creation coming soon!', 'info')}>
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-1">
                            <span className="text-2xl">+</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Your Story</p>
                    </div>
                    {/* Mock Stories */}
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="flex-shrink-0 text-center cursor-pointer" onClick={() => onStoryClick(index - 1)}>
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full p-0.5">
                                <div className="w-full h-full bg-white dark:bg-black rounded-full flex items-center justify-center">
                                    <img src={`https://placehold.co/60x60/333/FFF?text=S${index}`} alt={`Story ${index}`} className="w-14 h-14 rounded-full object-cover" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Story {index}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
                {mockPosts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onUserClick={onUserClick}
                        onFollowToggle={onFollowToggle}
                        isFollowingUser={isFollowingUser}
                        showAlert={showAlert}
                        usersData={usersData}
                    />
                ))}
            </div>
        </div>
    );
};

export default SportsFeed;