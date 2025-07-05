import React from 'react';

/**
 * OrdersPage Component
 * Displays a list of a user's past purchase orders, including order details,
 * items purchased, and shipment status.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.purchaseHistory - An array of order objects,
 * representing the user's past purchases. Each order object should contain:
 * - id: Unique order ID.
 * - date: Date of the order (ISO string).
 * - paymentMethod: How the payment was made (e.g., 'Credit Card', 'M-Pesa').
 * - shippingOption: The selected shipping method ('standard' or 'express').
 * - insuranceOption: Whether insurance was added ('Yes' or 'No').
 * - total: The total amount of the order.
 * - trackingNumber: (Optional) The tracking number for the shipment.
 * - shipmentStatus: Current status of the shipment (e.g., 'Processing', 'Shipped', 'Delivered').
 * - items: An array of item objects within the order.
 */
const OrdersPage = ({ purchaseHistory }) => {
    return (
        <div className="p-4 pt-6 bg-gray-50 dark:bg-black h-full text-gray-800 dark:text-gray-200">
            <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">My Orders</h2>
                {/* Conditionally render message if no orders exist */}
                {purchaseHistory.length === 0 ? (
                    <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
                ) : (
                    <div className="space-y-4">
                        {/* Map through purchase history and display each order */}
                        {purchaseHistory.map(order => (
                            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                                    {/* Shipment Status Badge */}
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        order.shipmentStatus === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' :
                                        order.shipmentStatus === 'Shipped' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200' :
                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                                    }`}>
                                        {order.shipmentStatus}
                                    </span>
                                </div>
                                {/* Order Details */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Payment: {order.paymentMethod}</p>
                                {/* Display shipping option and cost */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Shipping: {order.shippingOption === 'standard' ? 'Standard' : 'Express'} (TSh {order.shippingOption === 'standard' ? 5000 : 15000})</p>
                                {/* Display insurance option and cost */}
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Insurance: {order.insuranceOption} (TSh {order.insuranceOption === 'Yes' ? 2000 : 0})</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total: <span className="font-bold">TSh {order.total.toLocaleString()}</span></p>
                                {/* Tracking Number (if available) */}
                                {order.trackingNumber && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tracking: <span className="font-semibold text-blue-500">{order.trackingNumber}</span></p>
                                )}
                                {/* List of Purchased Items */}
                                <div className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Items:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                        {order.items.map((item, index) => (
                                            <li key={index}>{item.name} (x{item.quantity}) - TSh {item.price.toLocaleString()}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
