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
 * LiveGameCard Component
 * Displays a summary card for a live sports game, including scores, time, and betting odds.
 * It is clickable to view more details about the game.
 *
 * @param {object} props - The component props.
 * @param {object} props.game - The game object containing:
 * - id: Unique identifier for the game.
 * - sport: The sport type (e.g., 'NBA', 'Soccer').
 * - team1: Name of the first team.
 * - team2: Name of the second team.
 * - score1: Score of the first team.
 * - score2: Score of the second team.
 * - time: Current game time/status (e.g., "4Q 2:12", "HT").
 * - odds: Betting odds for the game.
 * @param {function} props.onClick - Callback function to be called when the card is clicked.
 */
const LiveGameCard = ({ game, onClick }) => (
    <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4 max-w-lg mx-auto overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-500"
        onClick={onClick}
    >
        <div className="p-4">
            {/* Sport and Live Time */}
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{game.sport}</span>
                <span className="font-bold text-red-500 animate-pulse">{game.time}</span>
            </div>
            {/* Team 1 Score */}
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{game.team1}</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{game.score1}</span>
            </div>
            {/* Team 2 Score */}
            <div className="flex justify-between items-center mt-1">
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{game.team2}</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{game.score2}</span>
            </div>
        </div>
        {/* Betting Odds Section */}
        <div className="bg-gray-50 dark:bg-gray-900 p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-2 text-center">
                {/* Odds for Team 1 */}
                <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm">
                    <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.team1)}</span>
                    <span className="text-xs text-gray-500">{game.team1}</span>
                </button>
                {/* Odds for Draw (conditionally rendered for sports like soccer) */}
                {game.odds.draw && (
                    <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm">
                        <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.draw)}</span>
                        <span className="text-xs text-gray-500">Draw</span>
                    </button>
                )}
                {/* Odds for Team 2 */}
                <button
                    className={`bg-gray-200 dark:bg-gray-700 p-2 rounded-md hover:bg-green-200 dark:hover:bg-green-800 text-sm ${!game.odds.draw ? 'col-start-3' : ''}`}
                >
                    <span className="block font-bold text-gray-800 dark:text-gray-200">{formatOdds(game.odds.team2)}</span>
                    <span className="text-xs text-gray-500">{game.team2}</span>
                </button>
            </div>
        </div>
    </div>
);

export default LiveGameCard;
