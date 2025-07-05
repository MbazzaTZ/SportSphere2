import React, { useState } from 'react';
import { MailOpen, Phone, KeyRound, Facebook } from 'lucide-react'; // Assuming necessary icons are used

/**
 * LoginPage Component
 * Provides a user authentication interface with options for login, signup,
 * and password reset using email, mobile number, social accounts, or a PIN.
 *
 * @param {object} props - The component props.
 * @param {function} props.onLogin - Callback function to call upon successful login/signup.
 * @param {function} props.showAlert - Function to display an alert message.
 */
const LoginPage = ({ onLogin, showAlert }) => {
    // State to manage the active login type ('email', 'mobile', 'social', 'pin')
    const [loginType, setLoginType] = useState('email');
    // State to toggle between login and signup modes
    const [isSignUp, setIsSignUp] = useState(false);
    // States for input fields
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    // State to toggle the "Forgot Password" mode
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

    /**
     * Handles the form submission for login, signup, or password reset.
     * Simulates the authentication logic and calls `onLogin` on success.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser form submission

        // Logic for Forgot Password mode
        if (forgotPasswordMode) {
            // Display an info alert indicating reset link sent
            showAlert(`Reset password link sent to: ${email || mobile}`, 'info');
            setForgotPasswordMode(false); // Exit forgot password mode
        }
        // Logic for Sign Up mode
        else if (isSignUp) {
            // Display a success alert for signup
            showAlert(`Sign Up successful for: ${email || mobile || 'Social Account'}`, 'success');
            onLogin(); // Simulate successful signup and login
        }
        // Logic for Login mode
        else {
            // Display a success alert for login
            showAlert(`Login successful for: ${email || mobile || 'Social/PIN Account'}`, 'success');
            onLogin(); // Simulate successful login
        }
    };

    /**
     * Renders the appropriate form fields based on the current `loginType` and `forgotPasswordMode`.
     * @returns {JSX.Element} - The JSX for the input fields.
     */
    const renderFormFields = () => {
        if (forgotPasswordMode) {
            return (
                <>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors">
                        Reset Password
                    </button>
                    <button
                        type="button"
                        onClick={() => setForgotPasswordMode(false)}
                        className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-300 transition-colors mt-2"
                    >
                        Back to Login
                    </button>
                </>
            );
        }

        switch (loginType) {
            case 'email':
                return (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>
                );
            case 'mobile':
                return (
                    <>
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </>
                );
            case 'pin':
                return (
                    <>
                        <input
                            type="text"
                            placeholder="Enter PIN"
                            className="w-full p-3 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
                            maxLength="4"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                        />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                {/* Title for Login/Sign Up/Reset Password */}
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    {forgotPasswordMode ? 'Reset Password' : (isSignUp ? 'Sign Up' : 'Login')}
                </h2>

                {/* Authentication Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderFormFields()} {/* Render dynamic form fields */}

                    {!forgotPasswordMode && ( // Only show login/signup button if not in forgot password mode
                        <>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors">
                                {isSignUp ? 'Sign Up' : 'Login'}
                            </button>
                        </>
                    )}
                </form>

                {!forgotPasswordMode && ( // Only show social/other login options if not in forgot password mode
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Or {isSignUp ? 'sign up' : 'login'} with:</p>
                        <div className="flex justify-center space-x-4 mb-4">
                            {/* Social/Other Login Buttons */}
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-blue-600">
                                <Facebook size={24} />
                            </button>
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-red-600">
                                <MailOpen size={24} /> {/* Gmail icon */}
                            </button>
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-gray-500" onClick={() => setLoginType('pin')}>
                                <KeyRound size={24} /> {/* PIN icon */}
                            </button>
                            <button className="p-3 rounded-full text-white flex items-center justify-center bg-blue-400" onClick={() => setLoginType('mobile')}>
                                <Phone size={24} /> {/* Mobile icon */}
                            </button>
                        </div>
                        {/* Toggle to use Email login */}
                        <button onClick={() => setLoginType('email')} className="text-blue-500 hover:underline text-sm">
                            {loginType === 'email' ? 'Use another method' : 'Use Email'}
                        </button>
                        {/* Toggle between Login and Sign Up */}
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {isSignUp ? "Already have an account? " : "Don't have an account? "}
                            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:underline font-semibold">
                                {isSignUp ? 'Login' : 'Sign Up'}
                            </button>
                        </p>
                        {/* Forgot Password link (only in login mode) */}
                        {!isSignUp && (
                            <button type="button" onClick={() => setForgotPasswordMode(true)} className="text-blue-500 hover:underline text-sm mt-2">
                                Forgot Password?
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
