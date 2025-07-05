import React from 'react';

/**
 * ChannelMessageCard Component
 * Displays a single message within a WhatsApp-like channel interface.
 * It dynamically styles messages based on whether they are sent by the current user or others.
 *
 * @param {object} props - The component props.
 * @param {object} props.message - The message object containing:
 * - sender: The name of the message sender.
 * - message: The actual text content of the message.
 * - time: The timestamp of the message.
 * - avatar: The URL of the sender's avatar.
 * - isUserMessage: A boolean indicating if the message was sent by the current user.
 */
const ChannelMessageCard = ({ message }) => (
    <div className={`flex items-end mb-4 ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}>
        {/* Sender's avatar (only for non-user messages) */}
        {!message.isUserMessage && (
            <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />
        )}
        {/* Message bubble */}
        <div className={`p-3 rounded-xl shadow-md ${
            message.isUserMessage
                ? 'bg-green-500 text-white rounded-br-none' // Style for user's messages
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none' // Style for other users' messages
        } max-w-[80%]`}>
            {/* Sender's name (only for non-user messages) */}
            {!message.isUserMessage && (
                <p className="font-semibold text-sm mb-1">{message.sender}</p>
            )}
            {/* Message text content */}
            <p className="text-sm">{message.message}</p>
            {/* Message timestamp */}
            <p className="text-xs text-right mt-1 opacity-80">{message.time}</p>
        </div>
        {/* User's avatar (only for user messages) */}
        {message.isUserMessage && (
            <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full ml-2 flex-shrink-0" />
        )}
    </div>
);

export default ChannelMessageCard;
