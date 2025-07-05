import React, { useState } from 'react';
import { Send } from 'lucide-react';
import ChannelMessageCard from './ChannelMessageCard';
import { mockProContent } from '../mockData'; // Import mockProContent from mockData.js

/**
 * ProZone Component
 * Displays professional sports content in a WhatsApp channel-like format,
 * allowing users to view and send messages within the channel.
 *
 * @param {object} props - The component props.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId,
 * used to get the current user's avatar and name.
 */
const ProZone = ({ usersData }) => {
    // State to manage the messages displayed in the channel
    const [channelMessages, setChannelMessages] = useState(mockProContent);
    // State to manage the input field for new messages
    const [newMessage, setNewMessage] = useState('');

    /**
     * Handles sending a new message.
     * Appends the new message to the channelMessages state and clears the input.
     * @param {Event} e - The form submission event.
     */
    const handleSendMessage = (e) => {
        e.preventDefault();

        if (newMessage.trim() === '') {
            return;
        }
        
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
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 p-4 max-w-lg mx-auto w-full">
                Sports Industry Channel
            </h2>
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
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full disabled:opacity-50"
                    disabled={!newMessage.trim()}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default ProZone;
