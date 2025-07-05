import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * Utility function to format odds
 * @param {number} odds - The odds value.
 * @returns {string} - Formatted odds string (e.g., "+150", "-110").
 */
const formatOdds = (odds) => {
    return odds > 0 ? `+${odds.toFixed(0)}` : odds.toFixed(0);
};

/**
 * LiveBettingModal Component
 * Displays a detailed modal for live betting markets with multiple betting options
 * and the ability to place bets on various markets.
 *
 * @param {object} props - The component props.
 * @param {object} props.bet - The betting market object containing detailed market information.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.showAlert - Function to display an alert message.
 */
const LiveBettingModal = ({ bet, onClose, showAlert }) => {
    // If no bet object is provided, don't render the modal
    if (!bet) return null;

    // State to manage selected bets
    const [selectedBets, setSelectedBets] = useState([]);
    // State to manage bet amounts
    const [betAmounts, setBetAmounts] = useState({});

    /**
     * Handles adding or removing a bet selection
     * @param {object} market - The market object
     * @param {object} option - The betting option
     */
    const handleBetSelection = (market, option) => {
        const betId = `${market.name}-${option.name}`;
        const existingBetIndex = selectedBets.findIndex(b => b.id === betId);

        if (existingBetIndex >= 0) {
            // Remove bet if already selected
            setSelectedBets(selectedBets.filter(b => b.id !== betId));
            const newAmounts = { ...betAmounts };
            delete newAmounts[betId];
            setBetAmounts(newAmounts);
        } else {
            // Add new bet
            const newBet = {
                id: betId,
                market: market.name,
                option: option.name,
                odds: option.odds
            };
            setSelectedBets([...selectedBets, newBet]);
        }
    };

    /**
     * Handles updating bet amount
     * @param {string} betId - The bet ID
     * @param {number} amount - The bet amount
     */
    const handleAmountChange = (betId, amount) => {
        setBetAmounts({
            ...betAmounts,
            [betId]: amount
        });
    };

    /**
     * Handles placing all selected bets
     */
    const handlePlaceBets = () => {
        if (selectedBets.length === 0) {
            showAlert('Please select at least one bet.', 'error');
            return;
        }

        const totalAmount = selectedBets.reduce((sum, bet) => {
            return sum + (betAmounts[bet.id] || 0);
        }, 0);

        if (totalAmount === 0) {
            showAlert('Please enter bet amounts.', 'error');
            return;
        }

        // Simulate bet placement
        showAlert(`Bets placed successfully! Total: $${totalAmount}`, 'success');
        onClose();
    };

    return (
        // Fixed overlay to cover the entire screen
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            {/* Modal content container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{bet.match}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{bet.sport} - Live Betting</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body - Betting Markets */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {bet.allMarkets?.map((market, marketIndex) => (
                        <div key={marketIndex} className="mb-6">
                            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">{market.name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {market.options.map((option, optionIndex) => {
                                    const betId = `${market.name}-${option.name}`;
                                    const isSelected = selectedBets.some(b => b.id === betId);
                                    
                                    return (
                                        <button
                                            key={optionIndex}
                                            onClick={() => handleBetSelection(market, option)}
                                            className={`p-3 rounded-lg border-2 transition-colors ${
                                                isSelected 
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                                            }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-800 dark:text-gray-200">{option.name}</span>
                                                <span className="font-bold text-green-600 dark:text-green-400">{formatOdds(option.odds)}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Selected Bets Section */}
                {selectedBets.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                        <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Selected Bets</h3>
                        {selectedBets.map((bet) => (
                            <div key={bet.id} className="flex items-center justify-between mb-2 p-2 bg-white dark:bg-gray-800 rounded">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{bet.market}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{bet.option} ({formatOdds(bet.odds)})</p>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={betAmounts[bet.id] || ''}
                                    onChange={(e) => handleAmountChange(bet.id, parseFloat(e.target.value) || 0)}
                                    className="w-20 p-1 text-sm border rounded text-center"
                                    min="1"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePlaceBets}
                        disabled={selectedBets.length === 0}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                    >
                        Place Bets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveBettingModal;