import React from 'react';
import { X } from 'lucide-react'; // Assuming X icon is used for close button, if not, it can be removed.

/**
 * MessageBox Component
 * Displays a customizable alert message to the user.
 *
 * @param {object} props - The component props.
 * @param {string} props.message - The message to display in the box.
 * @param {'success' | 'error' | 'info'} props.type - The type of message, which determines its color.
 * @param {function} props.onClose - Function to call when the message box is closed.
 */
const MessageBox = ({ message, type, onClose }) => {
    let bgColor = '';
    let textColor = '';

    // Determine background and text color based on message type
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
        // Fixed overlay to cover the entire screen
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            {/* Message box container */}
            <div className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center space-y-4`}>
                {/* Message text */}
                <p className="text-lg font-semibold text-center">{message}</p>
                {/* Close button */}
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

export default MessageBox;
