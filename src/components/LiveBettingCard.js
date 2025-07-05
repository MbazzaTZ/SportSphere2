import React from 'react';

/**
 * Utility function to format odds (copied from original App.js for self-containment)
 * @param {number} odds - The odds value.
 * @returns {string} - Formatted odds string (e.g., "+150", "-110").
 */
const formatOdds = (odds) => {
    return odds > 0 ? `+${odds.toFixed(0)}` : odds.toFixed(0);
};

/**
 * LiveBettingCard Component
 * Displays a card for a live betting market, showing the sport, match, market name,
 * and available betting options with their odds. It is clickable to open a betting modal.
 *
 * @param {object} props - The component props.
 * @param {object} props.bet - The betting market object containing:
 * - id: Unique identifier for the betting market.
 * - sport: The sport type (e.g., 'NBA', 'Soccer').
 * - match: The match name (e.g., 'Lakers vs Celtics').
 * - market: The specific betting market (e.g., 'Next Point Scorer').
 * - options: An array of betting options with player/name and odds.
 * - time: Current status (e.g., 'Live').
 * @param {function} props.onClick - Callback function to be called when the card is clicked,
 * typically to open a detailed betting modal.
 */
const LiveBettingCard = ({ bet, onClick }) => (
    <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-purple-500"
        onClick={() => onClick(bet)} // Pass the entire bet object to the onClick handler
    >
        <div className="p-4">
            {/* Sport and Match Name */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{bet.sport} - {bet.match}</span>
                {/* Live Betting Indicator */}
                <span className="font-bold text-purple-500">{bet.time} Betting</span>
            </div>
            {/* Market Name */}
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">{bet.market}</h3>
            {/* Betting Options */}
            <div className="grid grid-cols-2 gap-2 text-center">
                {bet.options.map((option, index) => (
                    <button
                        key={index} // Using index as key, consider unique IDs for options if available
                        className="bg-gray-200 dark:bg-gray-700 p-3 rounded-md hover:bg-purple-200 dark:hover:bg-purple-800 text-sm flex flex-col items-center justify-center"
                    >
                        {/* Option Odds */}
                        <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(option.odds)}</span>
                        {/* Option Player/Name */}
                        <span className="text-xs text-gray-500">{option.player}</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default LiveBettingCard;
