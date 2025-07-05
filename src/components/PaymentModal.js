import React, { useState } from 'react';
import { X } from 'lucide-react'; // Assuming X icon is used for close button

/**
 * PaymentModal Component
 * Provides a modal interface for users to complete their purchase,
 * allowing selection of payment methods (card or mobile money),
 * shipping options, and optional insurance.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.cartItems - An array of items in the shopping cart.
 * @param {number} props.totalAmount - The total amount of the cart items before shipping/insurance.
 * @param {function} props.onClose - Callback function to close the modal.
 * @param {function} props.onPaymentSuccess - Callback function to call upon successful payment,
 * passing the generated order details.
 * @param {function} props.showAlert - Function to display an alert message.
 */
const PaymentModal = ({ cartItems, totalAmount, onClose, onPaymentSuccess, showAlert }) => {
    // State to manage the selected payment method ('card' or 'mobile_money')
    const [paymentMethod, setPaymentMethod] = useState('card');
    // State for credit card details
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
    // State for mobile money details
    const [mobileMoneyNumber, setMobileMoneyNumber] = useState('');
    const [mobileMoneyProvider, setMobileMoneyProvider] = useState('M-Pesa'); // Default mobile money provider
    // State for shipping option ('standard' or 'express')
    const [shippingOption, setShippingOption] = useState('standard');
    // State for shipping insurance
    const [addInsurance, setAddInsurance] = useState(false);

    // Define fixed costs for shipping and insurance
    const shippingCosts = {
        standard: 5000,
        express: 15000,
    };
    const insuranceCost = 2000;

    // Calculate current shipping and insurance costs based on selections
    const currentShippingCost = shippingCosts[shippingOption];
    const currentInsuranceCost = addInsurance ? insuranceCost : 0;
    // Calculate the final total amount including items, shipping, and insurance
    const finalTotal = totalAmount + currentShippingCost + currentInsuranceCost;

    /**
     * Handles the payment process.
     * Simulates payment validation and success/failure, then calls `onPaymentSuccess` or `showAlert`.
     */
    const handlePayment = () => {
        // Simulate payment processing (logging to console)
        console.log("Processing payment...");
        console.log("Method:", paymentMethod);

        // Basic validation for card details
        if (paymentMethod === 'card') {
            console.log("Card Details:", cardDetails);
            if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
                showAlert('Please fill in all card details.', 'error');
                return;
            }
        }
        // Basic validation for mobile money details
        else {
            console.log("Mobile Money:", mobileMoneyNumber, mobileMoneyProvider);
            if (!mobileMoneyNumber || !mobileMoneyProvider) {
                showAlert('Please enter mobile money number and select a provider.', 'error');
                return;
            }
        }

        // Simulate success/failure of payment with a 90% success rate
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            // Generate a mock order ID and tracking number
            const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            const trackingNumber = `TRACK-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;
            const orderDate = new Date().toISOString();

            // Create the order object
            const order = {
                id: orderId,
                date: orderDate,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    // Include selected details for the item
                    details: { color: item.color, size: item.size, ticketType: item.ticketType, membershipTier: item.membershipTier?.name }
                })),
                total: finalTotal,
                paymentMethod: paymentMethod === 'card' ? 'Credit Card' : mobileMoneyProvider,
                shipmentStatus: 'Processing', // Initial status
                trackingNumber: trackingNumber,
                shippingOption: shippingOption,
                insuranceOption: addInsurance ? 'Yes' : 'No',
            };
            onPaymentSuccess(order); // Call the parent's success handler with the order
            showAlert('Payment successful! Your order has been placed.', 'success');
        } else {
            showAlert('Payment failed. Please try again.', 'error');
        }
    };

    return (
        // Fixed overlay for the modal, with a dark background and fade-in animation
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            {/* Modal content container with shadow and animation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all scale-100 opacity-100 animate-fade-in-up">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Complete Your Purchase</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                {/* Modal Body - Payment and Shipping Options */}
                <div className="p-6 space-y-5">
                    {/* Payment Method Selection */}
                    <div className="flex justify-around mb-4">
                        <button
                            onClick={() => setPaymentMethod('card')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            Credit Card
                        </button>
                        <button
                            onClick={() => setPaymentMethod('mobile_money')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${paymentMethod === 'mobile_money' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                        >
                            Mobile Money
                        </button>
                    </div>

                    {/* Credit Card Details (conditionally rendered) */}
                    {paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            <input type="text" placeholder="Cardholder Name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            <div className="flex space-x-4">
                                <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} className="w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                                <input type="text" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} className="w-1/2 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                            </div>
                        </div>
                    )}

                    {/* Mobile Money Details (conditionally rendered) */}
                    {paymentMethod === 'mobile_money' && (
                        <div className="space-y-4">
                            <select value={mobileMoneyProvider} onChange={(e) => setMobileMoneyProvider(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200">
                                <option value="M-Pesa">M-Pesa</option>
                                <option value="Tigo Pesa">Tigo Pesa</option>
                                <option value="Airtel Money">Airtel Money</option>
                            </select>
                            <input type="tel" placeholder="Mobile Money Number" value={mobileMoneyNumber} onChange={(e) => setMobileMoneyNumber(e.target.value)} className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200" />
                        </div>
                    )}

                    {/* Shipping Options */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Shipping Options:</h3>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" value="standard" checked={shippingOption === 'standard'} onChange={() => setShippingOption('standard')} className="form-radio text-blue-600" />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Standard Shipping (TSh {shippingCosts.standard.toLocaleString()})</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" value="express" checked={shippingOption === 'express'} onChange={() => setShippingOption('express')} className="form-radio text-blue-600" />
                                <span className="ml-2 text-gray-700 dark:text-gray-300">Express Shipping (TSh {shippingCosts.express.toLocaleString()})</span>
                            </label>
                        </div>
                        <label className="flex items-center mt-2">
                            <input type="checkbox" checked={addInsurance} onChange={() => setAddInsurance(!addInsurance)} className="form-checkbox text-blue-600" />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">Add Shipping Insurance (TSh {insuranceCost.toLocaleString()})</span>
                        </label>
                    </div>

                    {/* Final Total Display */}
                    <div className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Total: TSh {finalTotal.toLocaleString()}
                    </div>
                </div>
                {/* Modal Footer - Pay Now Button */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handlePayment}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
