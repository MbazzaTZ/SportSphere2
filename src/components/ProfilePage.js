import React from 'react';
import { X, Calendar as CalendarIcon, Link as LinkIcon, MapPin, Twitter, Instagram, Facebook, Linkedin, Edit, Plus, UserCheck, Shield, Star, Mic, Heart, Clipboard, Briefcase, BarChart3 } from 'lucide-react';

// --- DATA (Copied from App.js for self-containment) ---
const verificationTiers = {
    player: { label: 'Verified Player', icon: <UserCheck size={16} className="text-white" />, color: 'bg-blue-500' },
    team: { label: 'Official Team', icon: <Shield size={16} className="text-white" />, color: 'bg-red-600' },
    sponsor: { label: 'Official Sponsor', icon: <Star size={16} className="text-white" />, color: 'bg-yellow-500' },
    reporter: { label: 'Verified Reporter', icon: <Mic size={16} className="text-white" />, color: 'bg-purple-600' },
    fan: { label: 'Verified Fan', icon: <Heart size={16} className="text-white" />, color: 'bg-pink-500' },
    coach: { label: 'Verified Coach', icon: <Clipboard size={16} className="text-white" />, color: 'bg-green-600' },
    manager: { label: 'Team Manager', icon: <Briefcase size={16} className="text-white" />, color: 'bg-indigo-600' },
    analyst: { label: 'Sports Analyst', icon: <BarChart3 size={16} className="text-white" />, color: 'bg-teal-500' },
};

// VerifiedBadge Component (Copied from App.js for self-containment)
const VerifiedBadge = ({ tier }) => {
    if (!tier || !verificationTiers[tier]) return null;
    const { label, icon, color } = verificationTiers[tier];
    return (
        <span className="relative group inline-flex items-center align-middle">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${color} ml-1.5`}>
                {icon}
            </span>
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
                {label}
            </span>
        </span>
    );
};

// Utility function to format numbers (e.g., 1.2M, 45.1M)
const formatStat = (num) => {
    if (typeof num !== 'number') return num; // Return as is if not a number
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
};


/**
 * ProfilePage Component
 * Displays a user's profile with their cover photo, avatar, bio, stats,
 * and social links. It also includes options to follow/unfollow and edit the profile.
 *
 * @param {object} props - The component props.
 * @param {object} props.user - The user object whose profile is to be displayed.
 * @param {function} props.onClose - Callback function to close the profile page.
 * @param {function} props.onUserClick - Callback function when another user's profile is clicked (e.g., from followers list).
 * @param {function} props.onEditProfile - Callback function to open the profile editing modal.
 * @param {function} props.onFollowToggle - Callback function to toggle follow status for a user.
 * @param {function} props.isFollowingUser - Function to check if a user is currently followed.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId, used for VerifiedBadge and general user info.
 */
const ProfilePage = ({ user, onClose, onUserClick, onEditProfile, onFollowToggle, isFollowingUser, usersData }) => {
    if (!user) return null; // Don't render if no user data is provided

    // Determine if the current profile belongs to the logged-in user (simulated as 'currentuser')
    const isCurrentUser = user.id === 'currentuser';

    return (
        <div className="fixed inset-0 bg-gray-50 dark:bg-black z-40 overflow-y-auto flex flex-col">
            {/* Header with back button and options */}
            <header className="bg-white dark:bg-black p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold">{user.user}</h2>
                <div className="flex items-center space-x-2">
                    {/* Edit Profile button (only for current user) */}
                    {isCurrentUser && (
                        <button
                            onClick={() => onEditProfile(user)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors"
                        >
                            <Edit size={16} className="inline-block mr-1" /> Edit Profile
                        </button>
                    )}
                    {/* Follow/Unfollow button (for other users) */}
                    {!isCurrentUser && onFollowToggle && (
                        <button
                            onClick={() => onFollowToggle(user.id)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                isFollowingUser(user.id)
                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                        >
                            {isFollowingUser(user.id) ? (
                                <> <X size={16} className="inline-block mr-1" /> Unfollow </>
                            ) : (
                                <> <Plus size={16} className="inline-block mr-1" /> Follow </>
                            )}
                        </button>
                    )}
                </div>
            </header>

            {/* Profile Content Area */}
            <div className="flex-1 max-w-lg mx-auto w-full bg-white dark:bg-black shadow-lg rounded-b-lg">
                {/* Cover Photo */}
                <div className="relative h-40 bg-gray-300 dark:bg-gray-700 overflow-hidden">
                    <img src={user.cover} alt="Cover" className="w-full h-full object-cover" />
                </div>

                {/* Avatar and Main Info */}
                <div className="p-4 -mt-16 relative z-10">
                    <img src={user.avatar} alt={user.user} className="w-32 h-32 rounded-full border-4 border-white dark:border-black shadow-lg" />
                    <div className="mt-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                            {user.user}
                            <VerifiedBadge tier={user.verificationTier} />
                        </h3>
                        {user.handle && <p className="text-gray-500 dark:text-gray-400 text-md">@{user.handle}</p>}
                        <p className="text-gray-700 dark:text-gray-300 mt-2">{user.bio}</p>
                    </div>
                </div>

                {/* Additional Info (Joined, Location, Website) */}
                <div className="px-4 py-2 text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    {user.joined && (
                        <p className="flex items-center"><CalendarIcon size={16} className="mr-2" /> Joined {user.joined}</p>
                    )}
                    {user.location && (
                        <p className="flex items-center"><MapPin size={16} className="mr-2" /> {user.location}</p>
                    )}
                    {user.website && (
                        <p className="flex items-center"><LinkIcon size={16} className="mr-2" /><a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{user.website}</a></p>
                    )}
                </div>

                {/* Stats (Posts, Followers, Following) */}
                <div className="px-4 py-3 flex justify-around border-t border-gray-200 dark:border-gray-700 mt-4">
                    <div className="text-center">
                        <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{formatStat(user.stats.posts)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{formatStat(user.stats.followers)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{formatStat(user.stats.following)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
                    </div>
                </div>

                {/* Social Media Links (if available) */}
                {user.socialLinks && (
                    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-center space-x-6">
                        {user.socialLinks.twitter && <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><Twitter size={24} className="text-blue-400 hover:text-blue-500" /></a>}
                        {user.socialLinks.instagram && <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={24} className="text-pink-500 hover:text-pink-600" /></a>}
                        {user.socialLinks.facebook && <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={24} className="text-blue-600 hover:text-blue-700" /></a>}
                        {user.socialLinks.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={24} className="text-blue-700 hover:text-blue-800" /></a>}
                    </div>
                )}

                {/* Placeholder for user's posts/content */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                    <p>User's recent posts and activity will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
