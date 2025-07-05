import React, { useState } from 'react';
import { X } from 'lucide-react';

/**
 * ShopModal Component
 * Displays a modal for viewing product details and adding items to the cart.
 * It adapts its options based on the product type (merchandise, ticket, membership).
 *
 * @param {object} props - The component props.
 * @param {object} props.item - The product item object to display in the modal.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.onAddToCart - Callback function to add the selected item to the cart.
 */
const ShopModal = ({ item, onClose, onAddToCart }) => {
    // If no item is provided, don't render the modal
    if (!item) return null;

    // State to manage selected details (color, size, ticket type, membership tier)
    const [details, setDetails] = useState({
        color: item.colors ? item.colors[0] : null, // Default to first color if available
        size: item.sizes ? item.sizes[0] : null,     // Default to first size if available
        ticketType: item.type === 'ticket' ? 'Regular' : null, // Default ticket type
        membershipTier: item.membershipTiers ? item.membershipTiers[0] : null, // Default membership tier
    });

    /**
     * Handles changes to product details (e.g., selecting a different color, size, or tier).
     * @param {string} type - The type of detail being changed ('color', 'size', 'ticketType', 'membershipTier').
     * @param {*} value - The new value for the detail.
     */
    const handleDetailChange = (type, value) => {
        setDetails(prev => ({ ...prev, [type]: value }));
    };

    /**
     * Handles adding the selected item with its chosen details to the cart.
     * Calls the `onAddToCart` prop and then closes the modal.
     */
    const handleAddToCart = () => {
        onAddToCart(item, details); // Pass the item and selected details to the parent
        onClose(); // Close the modal after adding to cart
    };

    /**
     * Calculates and returns the price of the item based on its type and selected options.
     * @returns {number} The calculated price.
     */
    const getPrice = () => {
        if (item.type === 'ticket') {
            return item.price[details.ticketType]; // Get price based on selected ticket type
        }
        if (item.type === 'membership') {
            return details.membershipTier.price; // Get price from selected membership tier
        }
        return item.price || item.offerPrice; // For merchandise or offers, use direct price or offer price
    };

    return (
        // Fixed overlay to cover the entire screen, with a dark background
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            {/* Modal content container */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 relative">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400">
                    <X size={24} />
                </button>
                <div className="p-6">
                    {/* Product Name */}
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{item.name}</h3>
                    {/* Product Image */}
                    <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-md mb-4" />
                    
                    {/* Merchandise specific options (Color, Size) */}
                    {item.type === 'merchandise' && (
                        <>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Color:</label>
                                <select onChange={(e) => handleDetailChange('color', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">
                                    {item.colors.map(color => <option key={color} value={color}>{color}</option>)}
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size:</label>
                                <select onChange={(e) => handleDetailChange('size', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">
                                    {item.sizes.map(size => <option key={size} value={size}>{size}</option>)}
                                </select>
                            </div>
                        </>
                    )}

                    {/* Ticket specific options (Ticket Type) */}
                    {item.type === 'ticket' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ticket Type:</label>
                            <select onChange={(e) => handleDetailChange('ticketType', e.target.value)} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">
                                <option value="Regular">Regular - TSh {item.price.Regular.toLocaleString()}</option>
                                <option value="VIP">VIP - TSh {item.price.VIP.toLocaleString()}</option>
                            </select>
                        </div>
                    )}
                    
                    {/* Membership specific options (Membership Tier) */}
                    {item.type === 'membership' && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Membership Tier:</label>
                            <select onChange={(e) => handleDetailChange('membershipTier', item.membershipTiers.find(t => t.name === e.target.value))} className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 mt-1">
                                {item.membershipTiers.map(tier => <option key={tier.name} value={tier.name}>{tier.name} ({tier.duration}) - TSh {tier.price.toLocaleString()}</option>)}
                            </select>
                        </div>
                    )}

                    {/* Add to Cart button with dynamic price */}
                    <button onClick={handleAddToCart} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 w-full">
                        Add to Cart (TSh {getPrice().toLocaleString()})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopModal;
