import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

/**
 * EditProfileModal Component
 * Provides a modal interface for users to edit their profile information,
 * including their bio, location, website, and simulated avatar/cover photo changes.
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object whose profile is being edited.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.onSave - Callback function to save the updated profile data.
 * @param {function} props.showAlert - Function to display an alert message.
 */
const EditProfileModal = ({ user, onClose, onSave, showAlert }) => {
    // State to hold the editable profile data, initialized with the current user's data
    const [editableUser, setEditableUser] = useState({
        id: user.id,
        user: user.user,
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        avatar: user.avatar, // Current avatar URL
        cover: user.cover,   // Current cover URL
        // Add other fields you might want to make editable
    });

    // Update editableUser if the user prop changes (e.g., if the modal is reused for a different user)
    useEffect(() => {
        setEditableUser({
            id: user.id,
            user: user.user,
            bio: user.bio || '',
            location: user.location || '',
            website: user.website || '',
            avatar: user.avatar,
            cover: user.cover,
        });
    }, [user]);

    /**
     * Handles changes to text input fields (bio, location, website, username).
     * @param {Event} e - The input change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableUser(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Handles the selection of a new avatar image file.
     * Simulates file upload by storing the file object (or its name).
     * @param {Event} e - The file input change event.
     */
    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Simulate displaying the new image immediately
            setEditableUser(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
        }
    };

    /**
     * Handles the selection of a new cover image file.
     * Simulates file upload by storing the file object (or its name).
     * @param {Event} e - The file input change event.
     */
    const handleCoverChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Simulate displaying the new image immediately
            setEditableUser(prev => ({ ...prev, cover: URL.createObjectURL(file) }));
        }
    };

    /**
     * Handles saving the edited profile data.
     * Calls the `onSave` prop with the updated user data and displays a success alert.
     */
    const handleSave = () => {
        // In a real application, you would upload newAvatarFile and newCoverFile
        // to a storage service (e.g., Firebase Storage) and get their URLs.
        // For this simulation, we're just passing the updated URLs from `editableUser`.

        onSave(editableUser); // Pass the updated user object to the parent
        showAlert('Profile updated successfully!', 'success');
        onClose(); // Close the modal
    };

    return (
        // Fixed overlay to cover the entire screen, with a dark background and animation
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            {/* Modal content container with shadow and animation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                {/* Modal Body - Edit Fields */}
                <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                    {/* Cover Photo Upload */}
                    <div className="relative h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={editableUser.cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                        <label htmlFor="cover-upload" className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                            <ImageIcon size={32} />
                            <span className="mt-2 text-sm">Change Cover Photo</span>
                            <input type="file" id="cover-upload" className="hidden" accept="image/*" onChange={handleCoverChange} />
                        </label>
                    </div>

                    {/* Avatar Upload */}
                    <div className="relative w-24 h-24 -mt-12 mx-auto rounded-full border-4 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                        <img src={editableUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity rounded-full">
                            <ImageIcon size={24} />
                            <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                        </label>
                    </div>

                    {/* Username Field */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="user" // Corresponds to 'user' in editableUser state
                            value={editableUser.user}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    {/* Bio Field */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows="3"
                            value={editableUser.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 resize-y"
                        ></textarea>
                    </div>

                    {/* Location Field */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={editableUser.location}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>

                    {/* Website Field */}
                    <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={editableUser.website}
                            onChange={handleChange}
                            placeholder="e.g., https://yourwebsite.com"
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                </div>
                {/* Modal Footer - Save Button */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;