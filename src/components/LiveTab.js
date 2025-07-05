import React, { useState, useEffect } from 'react';
import LiveGameCard from './LiveGameCard';
import LiveBettingCard from './LiveBettingCard';
import LiveMatchScreen from './LiveMatchScreen';
import { initialLiveGames, mockLiveBets } from '../data/allData';

/**
 * LiveTab Component
 * Displays live sports games and live betting markets.
 * It simulates real-time updates for scores and odds.
 *
 * @param {object} props - The component props.
 * @param {function} props.onGameClick - Callback function when a live game card is clicked,
 * to view detailed match statistics.
 * @param {function} props.onBettingCardClick - Callback function when a live betting card is clicked,
 * to open a detailed betting modal.
 */
const LiveTab = ({ onGameClick, onBettingCardClick }) => {
    // State to manage the list of live games, initialized with mock data
    const [liveGames, setLiveGames] = useState(initialLiveGames);
    // State to manage the list of live betting markets, initialized with mock data
    const [liveBets, setLiveBets] = useState(mockLiveBets);
    // State to control which live match is currently being viewed in the full screen modal
    const [viewingLiveMatch, setViewingLiveMatch] = useState(null);

    // useEffect hook to simulate real-time updates for scores and odds
    useEffect(() => {
        const interval = setInterval(() => {
            // Update live game scores and odds randomly
            setLiveGames(prevGames =>
                prevGames.map(game => {
                    const newOdds = { ...game.odds };
                    // Randomly change odds for each market
                    for (const key in newOdds) {
                        if (typeof newOdds[key] === 'number') {
                            const change = (Math.random() - 0.5) * (key === 'total' ? 1 : 20);
                            newOdds[key] = Math.round(newOdds[key] + change);
                        }
                    }
                    // Randomly increment scores
                    return {
                        ...game,
                        score1: game.score1 + (Math.random() > 0.9 ? 1 : 0),
                        score2: game.score2 + (Math.random() > 0.9 ? 1 : 0),
                        odds: newOdds,
                    };
                })
            );

            // Simulate odds changes for live betting markets
            setLiveBets(prevBets =>
                prevBets.map(bet => {
                    // Update odds for direct options
                    const newOptions = bet.options.map(option => ({
                        ...option,
                        odds: option.odds + (Math.random() - 0.5) * 5
                    }));
                    // Also update odds in allMarkets for the modal, ensuring consistency
                    const newAllMarkets = bet.allMarkets.map(market => ({
                        ...market,
                        options: market.options.map(option => ({
                            ...option,
                            odds: option.odds + (Math.random() - 0.5) * 5
                        }))
                    }));
                    return { ...bet, options: newOptions, allMarkets: newAllMarkets };
                })
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 max-w-lg mx-auto">Live Now</h2>
            {liveGames.map(game => (
                <LiveGameCard
                    key={game.id}
                    game={game}
                    onClick={() => setViewingLiveMatch(game)}
                />
            ))}

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8 max-w-lg mx-auto">Live Betting</h2>
            {liveBets.map(bet => (
                <LiveBettingCard
                    key={bet.id}
                    bet={bet}
                    onClick={onBettingCardClick}
                />
            ))}

            {viewingLiveMatch && (
                <LiveMatchScreen
                    match={viewingLiveMatch}
                    onClose={() => setViewingLiveMatch(null)}
                />
            )}
        </div>
    );
};

export default LiveTab;