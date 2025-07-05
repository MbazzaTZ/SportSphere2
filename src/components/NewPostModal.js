import React, { useState } from 'react';
import { X, Image as ImageIcon, Video, Smile, MapPin, Users } from 'lucide-react';

/**
 * NewPostModal Component
 * Provides a modal interface for creating new posts with text content,
 * image attachments, and various post options.
 *
 * @param {object} props - The component props.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.showAlert - Function to display an alert message.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const NewPostModal = ({ onClose, showAlert, usersData }) => {
    // State for the post content text
    const [postContent, setPostContent] = useState('');
    // State for selected image file (simulated)
    const [selectedImage, setSelectedImage] = useState(null);
    // State for post privacy setting
    const [privacy, setPrivacy] = useState('public');

    // Get current user data
    const currentUser = usersData['currentuser'];

    /**
     * Handles the image file selection.
     * Simulates file upload by storing the file object.
     * @param {Event} e - The file input change event.
     */
    const handleImageSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
        }
    };

    /**
     * Handles posting the new content.
     * Simulates the post creation process and shows a success message.
     */
    const handlePost = () => {
        if (!postContent.trim() && !selectedImage) {
            showAlert('Please add some content to your post.', 'error');
            return;
        }

        // Simulate post creation
        console.log('Creating new post:', {
            content: postContent,
            image: selectedImage?.name || null,
            privacy: privacy,
            userId: 'currentuser'
        });

        showAlert('Post created successfully!', 'success');
        onClose();
    };

    return (
        // Fixed overlay to cover the entire screen, with a dark background
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            {/* Modal content container */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-100 opacity-100 animate-fade-in-up">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create Post</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4">
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                        <img src={currentUser.avatar} alt={currentUser.user} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                            <p className="font-bold text-gray-800 dark:text-gray-200">{currentUser.user}</p>
                            <select 
                                value={privacy} 
                                onChange={(e) => setPrivacy(e.target.value)}
                                className="text-sm text-gray-600 dark:text-gray-400 bg-transparent border-none focus:outline-none"
                            >
                                <option value="public">🌍 Public</option>
                                <option value="friends">👥 Friends</option>
                                <option value="private">🔒 Only me</option>
                            </select>
                        </div>
                    </div>

                    {/* Post Content Textarea */}
                    <textarea
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="What's happening in sports?"
                        className="w-full h-32 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-none"
                    />

                    {/* Selected Image Preview */}
                    {selectedImage && (
                        <div className="mt-3 relative">
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">📷 {selectedImage.name}</span>
                                <button 
                                    onClick={() => setSelectedImage(null)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Post Options */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            {/* Image Upload */}
                            <label htmlFor="image-upload" className="cursor-pointer text-gray-500 hover:text-blue-500 transition-colors">
                                <ImageIcon size={20} />
                                <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageSelect} />
                            </label>
                            {/* Video Upload (placeholder) */}
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Video size={20} />
                            </button>
                            {/* Emoji (placeholder) */}
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Smile size={20} />
                            </button>
                            {/* Location (placeholder) */}
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <MapPin size={20} />
                            </button>
                            {/* Tag People (placeholder) */}
                            <button className="text-gray-500 hover:text-blue-500 transition-colors">
                                <Users size={20} />
                            </button>
                        </div>
                        {/* Character Count */}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {postContent.length}/280
                        </span>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handlePost}
                        disabled={!postContent.trim() && !selectedImage}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-colors"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPostModal;