import React from 'react';
import { UserCheck, Shield, Star, Mic, Heart, Clipboard, Briefcase, BarChart3 } from 'lucide-react';

// Define verification tiers and their properties
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

/**
 * VerifiedBadge Component
 * Displays a verification badge with an icon and a tooltip for different user tiers.
 *
 * @param {object} props - The component props.
 * @param {string} props.tier - The verification tier (e.g., 'player', 'team', 'sponsor').
 */
const VerifiedBadge = ({ tier }) => {
    // If no tier is provided or the tier is not found, return null (don't render anything)
    if (!tier || !verificationTiers[tier]) {
        return null;
    }

    // Destructure properties for the given tier
    const { label, icon, color } = verificationTiers[tier];

    return (
        // The main container for the badge, with relative positioning for the tooltip
        <span className="relative group inline-flex items-center align-middle">
            {/* The circular badge with background color and icon */}
            <span className={`w-5 h-5 rounded-full flex items-center justify-center ${color} ml-1.5`}>
                {icon}
            </span>
            {/* The tooltip that appears on hover */}
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
                {label}
            </span>
        </span>
    );
};

export default VerifiedBadge;
