import React, { useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, UserCheck, Shield, Star, Mic, Heart, Clipboard, Briefcase, BarChart3 } from 'lucide-react';
import { mockStories, verificationTiers } from '../mockData'; // Import mockStories and verificationTiers from mockData.js

// VerifiedBadge Component (Copied for self-containment, ideally would be imported)
const VerifiedBadge = ({ tier }) => {
    // Use the imported verificationTiers
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


/**
 * StoryViewer Component
 * Displays stories in a full-screen viewer, similar to social media stories.
 * It includes navigation, a progress bar, and user information.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.stories - An array of story objects to display.
 * @param {number} props.activeIndex - The index of the currently active story.
 * @param {function} props.onClose - Callback function to close the story viewer.
 * @param {function} props.onNext - Callback function to move to the next story.
 * @param {function} props.onPrev - Callback function to move to the previous story.
 * @param {function} props.onUserClick - Callback function when a user's avatar/name is clicked.
 * @param {object} props.usersData - A dictionary of all user data, keyed by userId.
 */
const StoryViewer = ({ stories, activeIndex, onClose, onNext, onPrev, onUserClick, usersData }) => {
    // If no active story, or activeIndex is out of bounds, return null
    if (activeIndex === null || activeIndex < 0 || activeIndex >= stories.length) {
        return null;
    }

    const currentStory = stories[activeIndex];
    const user = usersData[currentStory.userId]; // Get user data for the current story's user

    // Ref for the progress bar element
    const progressBarRef = useRef(null);

    // Callback to handle automatic progression to the next story
    const autoAdvanceStory = useCallback(() => {
        // Mark the current story as viewed (simulated)
        if (currentStory) {
            currentStory.viewed = true;
        }
        onNext(); // Call the parent's onNext function
    }, [currentStory, onNext]);

    // useEffect for story auto-progression and progress bar animation
    useEffect(() => {
        // Set a timeout for automatic story progression
        const timer = setTimeout(autoAdvanceStory, 5000); // Each story lasts 5 seconds

        // Reset and animate the progress bar
        if (progressBarRef.current) {
            progressBarRef.current.style.animationDuration = '5s';
            progressBarRef.current.style.animationPlayState = 'running';
            // Trigger reflow to restart animation if already at 100%
            void progressBarRef.current.offsetWidth;
            progressBarRef.current.style.width = '100%';
        }

        // Cleanup function to clear the timer when the component unmounts or active story changes
        return () => {
            clearTimeout(timer);
            if (progressBarRef.current) {
                progressBarRef.current.style.animationPlayState = 'paused';
                progressBarRef.current.style.width = '0%';
            }
        };
    }, [activeIndex, autoAdvanceStory]); // Re-run effect when activeIndex changes

    // Handle keyboard navigation (left/right arrow keys)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                onNext();
            } else if (e.key === 'ArrowLeft') {
                onPrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev]);

    return (
        <div className="fixed inset-0 bg-black z-[90] flex items-center justify-center">
            {/* Story content area */}
            <div className="relative w-full h-full max-w-md max-h-screen overflow-hidden flex items-center justify-center">
                {/* Story Image */}
                <img
                    src={currentStory.imageUrl}
                    alt="Story"
                    className="w-full h-full object-contain"
                />

                {/* Top Overlay with Progress Bars and User Info */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                    {/* Progress bars for all stories */}
                    <div className="flex space-x-1 mb-3">
                        {stories.map((story, index) => (
                            <div key={story.id} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    ref={index === activeIndex ? progressBarRef : null}
                                    className={`h-full bg-white rounded-full ${index < activeIndex ? 'w-full' : ''} ${index === activeIndex ? 'animate-progress' : ''}`}
                                    style={{ animationPlayState: index === activeIndex ? 'running' : 'paused' }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    {/* User Info and Close Button */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onUserClick(user.id)}>
                            <img src={user.avatar} alt={user.user} className="w-8 h-8 rounded-full border-2 border-white" />
                            <span className="text-white font-semibold text-sm flex items-center">
                                {user.user}
                                <VerifiedBadge tier={user.verificationTier} />
                            </span>
                        </div>
                        <button onClick={onClose} className="text-white p-1 rounded-full bg-black/30 hover:bg-black/50">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation Buttons (Left/Right) */}
                <button
                    onClick={onPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-3 text-white bg-black/30 hover:bg-black/50 rounded-r-lg z-10"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={onNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-white bg-black/30 hover:bg-black/50 rounded-l-lg z-10"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default StoryViewer;
