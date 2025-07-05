import React from 'react';

/**
 * ShopProductCard Component
 * Displays a single product or offer within the online shop.
 * It shows the product image, name, price, and a "View Details" button.
 * Can optionally display a "PROMOTION!" badge for offers.
 *
 * @param {object} props - The component props.
 * @param {object} props.product - The product object containing:
 * - id: Unique identifier.
 * - name: Product name.
 * - price: Regular price (can be number or object for tickets).
 * - offerPrice: (Optional) Discounted price for offers.
 * - originalPrice: (Optional) Original price for offers.
 * - image: URL of the product image.
 * - type: Type of product (e.g., 'merchandise', 'ticket', 'membership', 'azam_hardware', 'azam_subscription').
 * @param {function} props.onProductClick - Callback function when the card is clicked.
 * @param {boolean} [props.isOffer=false] - Flag to indicate if the card represents a special offer.
 */
const ShopProductCard = ({ product, onProductClick, isOffer = false }) => {
    // Determine the price display based on product type and offer status
    let priceDisplay;
    if (product.type === 'membership') {
        // For memberships, indicate various tiers
        priceDisplay = 'Various Tiers';
    } else if (isOffer && product.offerPrice !== undefined && product.offerPrice !== null) {
        // If it's an offer and offerPrice exists, use it
        priceDisplay = `TSh ${product.offerPrice.toLocaleString()}`;
    } else if (product.price !== undefined && product.price !== null) {
        // If price exists
        if (typeof product.price === 'object' && product.price.Regular !== undefined && product.price.Regular !== null) {
            // For tickets with Regular/VIP pricing
            priceDisplay = `From TSh ${product.price.Regular.toLocaleString()}`;
        } else if (typeof product.price === 'number') {
            // For standard numerical prices
            priceDisplay = `TSh ${product.price.toLocaleString()}`;
        } else {
            // Fallback for unexpected price structures
            priceDisplay = 'Price N/A';
        }
    } else {
        // Fallback if no price or offerPrice is defined
        priceDisplay = 'Price N/A';
    }

    // Specific display for offer price, used when `isOffer` is true
    const offerPriceDisplay = `TSh ${product.offerPrice?.toLocaleString()}`;

    return (
        <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col text-center transition-transform hover:scale-105 cursor-pointer relative"
            onClick={() => onProductClick(product)} // Call onProductClick with the entire product object
        >
            {/* "PROMOTION!" badge for offers */}
            {isOffer && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    PROMOTION!
                </span>
            )}
            {/* Product Image */}
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4 rounded-md" />
            {/* Product Name */}
            <h4 className="font-bold text-md flex-grow text-gray-800 dark:text-gray-200">{product.name}</h4>
            {/* Original Price (shown with strikethrough for offers) */}
            {isOffer && product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">TSh {product.originalPrice.toLocaleString()}</p>
            )}
            {/* Current Price Display */}
            <p className="text-lg font-semibold text-blue-600 my-2">
                {isOffer ? offerPriceDisplay : priceDisplay}
            </p>
            {/* View Details Button */}
            <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700 font-semibold w-full">
                View Details
            </button>
        </div>
    );
};

export default ShopProductCard;
