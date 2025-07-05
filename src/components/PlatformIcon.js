import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

/**
 * PlatformIcon Component
 * Displays an icon corresponding to a given social media or content platform.
 *
 * @param {object} props - The component props.
 * @param {string} props.platform - The name of the platform (e.g., 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok').
 * @param {string} [props.className] - Optional CSS classes to apply to the icon.
 */
const PlatformIcon = ({ platform, className }) => {
    switch (platform) {
        case 'Facebook':
            return <Facebook className={`text-blue-600 ${className}`} />;
        case 'Twitter':
            return <Twitter className={`text-blue-400 ${className}`} />;
        case 'Instagram':
            return <Instagram className={`text-pink-500 ${className}`} />;
        case 'LinkedIn':
            return <Linkedin className={`text-blue-700 ${className}`} />;
        case 'TikTok':
            // TikTok icon is custom SVG as it's not directly available in Lucide React
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.86-6.33.36-1.72 1.46-3.2 3.02-4.17.02-3.48.01-6.97 0-10.45 1.53-.02 3.05-.02 4.57-.02.01 1.49.01 2.98 0 4.48z"></path>
                </svg>
            );
        default:
            return null; // Return null if the platform is not recognized
    }
};

export default PlatformIcon;
