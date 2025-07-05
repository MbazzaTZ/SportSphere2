import React from 'react';
import { Briefcase } from 'lucide-react'; // Assuming Briefcase icon is used

/**
 * ProContentCard Component
 * Displays a card for professional sports content, such as job postings or industry news.
 * It features an icon, title, team/company, location, type, and a view button.
 *
 * @param {object} props - The component props.
 * @param {object} props.item - The content item object, which can include:
 * - id: Unique identifier for the item.
 * - title: The main title of the content (e.g., job title, news headline).
 * - team: (Optional) The team associated with the content.
 * - company: (Optional) The company associated with the content.
 * - location: (Optional) The location relevant to the content.
 * - type: (Optional) The type of content (e.g., 'Job', 'News').
 */
const ProContentCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 p-4 flex items-start max-w-lg mx-auto border border-gray-200 dark:border-gray-700">
        {/* Icon container */}
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-4">
            <Briefcase className="text-gray-500" />
        </div>
        {/* Content details */}
        <div className="flex-grow">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">{item.title}</h3>
            {/* Display team or company name */}
            <p className="text-gray-800 dark:text-gray-200">{item.team || item.company}</p>
            {/* Display location and type if available */}
            {item.location && item.type && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.location} ({item.type})</p>
            )}
        </div>
        {/* View button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm">
            View
        </button>
    </div>
);

export default ProContentCard;
