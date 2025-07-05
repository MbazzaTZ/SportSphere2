import React from 'react';
import { Search, Plus } from 'lucide-react';
import MessageItem from './MessageItem';
import { mockMessages } from '../mockData'; // Import mockMessages from mockData.js

/**
 * Messaging Component
 * Displays a list of recent messages, including a search bar and a button to compose new messages.
 * Each message in the list is rendered using the MessageItem component.
 *
 * @param {object} props - The component props.
 * @param {function} props.onUserClick - Callback function to be called when a user's avatar/name is clicked within a MessageItem.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId, passed to MessageItem.
 */
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
                    {mockMessages.map(msg => (
                        <MessageItem
                            key={msg.id}
                            msg={msg}
                            onUserClick={onUserClick}
                            usersData={usersData}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messaging;
