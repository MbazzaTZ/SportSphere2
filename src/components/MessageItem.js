import React from 'react';
import VerifiedBadge from './VerifiedBadge';
import PlatformIcon from './PlatformIcon';

/**
 * MessageItem Component
 * Displays a single message item in the messaging list, showing the sender's avatar,
 * name, platform, message preview, and timestamp.
 *
 * @param {object} props - The component props.
 * @param {object} props.msg - The message object containing:
 * - id: Unique identifier for the message.
 * - platform: The platform where the message originated (e.g., 'Twitter', 'Instagram').
 * - userId: The ID of the user who sent the message.
 * - message: The text content of the message.
 * - time: The timestamp or relative time string (e.g., '15m', '1h').
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const MessageItem = ({ msg, onUserClick, usersData }) => {
    // Lookup user data based on the message's userId
    const user = usersData[msg.userId];

    // If user data is not found, return null to prevent rendering an incomplete message item
    if (!user) return null;

    return (
        <div className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
            {/* User Avatar - clickable to view profile */}
            <img
                src={user.avatar}
                alt={user.user}
                className="w-12 h-12 rounded-full mr-3 cursor-pointer"
                onClick={() => onUserClick(user.id)}
            />
            <div className="flex-grow">
                {/* User Name and Platform Icon */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center cursor-pointer" onClick={() => onUserClick(user.id)}>
                        <p className="font-bold text-gray-800 dark:text-gray-200 flex items-center">
                            {user.user}
                            <VerifiedBadge tier={user.verificationTier} />
                        </p>
                        <PlatformIcon platform={msg.platform} className="w-4 h-4 ml-2" />
                    </div>
                    {/* Message timestamp */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                </div>
                {/* Message preview */}
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{msg.message}</p>
            </div>
        </div>
    );
};

export default MessageItem;