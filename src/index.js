import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Bell, Trophy, Menu, Shield, Users, ShoppingCart, Award, Plus } from 'lucide-react';

// Import Data
import { verificationTiers, allUsersById, mockStories, mockPosts, mockVideos, mockProContent, initialLiveGames, mockLiveBets } from './data/allData';

// Import Components
import MessageBox from './components/MessageBox';
import VerifiedBadge from './components/VerifiedBadge';
import PlatformIcon from './components/PlatformIcon';
import Comment from './components/Comment';
import CommentSection from './components/CommentSection';
import PostCard from './components/PostCard';
import VideoTypeBadge from './components/VideoTypeBadge';
import VideoCard from './components/VideoCard';
import HighlightsHub from './components/HighlightsHub';
import ProContentCard from './components/ProContentCard';
import ChannelMessageCard from './components/ChannelMessageCard';
import ProZone from './components/ProZone';
import LiveGameCard from './components/LiveGameCard';
import LiveBettingCard from './components/LiveBettingCard';
import MatchStatsModal from './components/MatchStatsModal';
import NewPostModal from './components/NewPostModal';
import LiveTab from './components/LiveTab';
import MessageItem from './components/MessageItem';
import Messaging from './components/Messaging';
import LoginPage from './components/LoginPage';
import LiveMatchScreen from './components/LiveMatchScreen';
import ShopProductCard from './components/ShopProductCard';
import ShopModal from './components/ShopModal';
import OnlineShop from './components/OnlineShop';
import PaymentModal from './components/PaymentModal';
import OrdersPage from './components/OrdersPage';
import ProfilePage from './components/ProfilePage';
import EditProfileModal from './components/EditProfileModal';
import StoryViewer from './components/StoryViewer';

export default function App() {
    const [activeTab, setActiveTab] = useState('Feed');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [storyViewerState, setStoryViewerState] = useState({ isOpen: false, activeIndex: null });
    const [viewingProfile, setViewingProfile] = useState(null);
    const [editingProfile, setEditingProfile] = useState(null);
    const [usersData, setUsersData] = useState(allUsersById);
    const [viewingGameStats, setViewingGameStats] = useState(null);
    const [viewingLiveBetting, setViewingLiveBetting] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(new Set());
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const [messageBox, setMessageBox] = useState({ show: false, message: '', type: '' });

    const showAlert = (message, type = 'info') => {
        setMessageBox({ show: true, message, type });
    };

    const closeAlert = () => {
        setMessageBox({ show: false, message: '', type: '' });
    };

    const handleUserClick = (userId) => { setViewingProfile(usersData[userId]); };
    const handleCloseProfile = () => { setViewingProfile(null); };

    const handleEditProfile = (user) => { setEditingProfile(user); };
    const handleCloseEditProfile = () => { setEditingProfile(null); };
    const handleSaveProfile = (updatedData) => {
        const updatedUser = { ...usersData[updatedData.id], ...updatedData };
        const newUsersData = { ...usersData, [updatedData.id]: updatedUser };
        setUsersData(newUsersData);
        setViewingProfile(updatedUser);
    };

    const handleStoryClick = (index) => { setStoryViewerState({ isOpen: true, activeIndex: index }); };
    const handleCloseStoryViewer = () => { setStoryViewerState({ isOpen: false, activeIndex: null }); };
    const handleNextStory = useCallback(() => { setStoryViewerState(prevState => { if (prevState.activeIndex === null || prevState.activeIndex >= mockStories.length - 1) { return { isOpen: false, activeIndex: null }; } return { ...prevState, activeIndex: prevState.activeIndex + 1 }; }); }, [mockStories.length]);
    const handlePrevStory = () => { setStoryViewerState(prevState => { if (prevState.activeIndex === null || prevState.activeIndex <= 0) { return { ...prevState, activeIndex: 0 }; } return { ...prevState, activeIndex: prevState.activeIndex - 1 }; }); };

    const handleGameClick = (game) => { setViewingGameStats(game); };
    const handleCloseGameStats = () => { setViewingGameStats(null); };

    const handleBettingCardClick = (bet) => { setViewingLiveBetting(bet); };
    const handleCloseLiveBetting = () => { setViewingLiveBetting(null); };

    const handleFollowToggle = (userId) => {
        setFollowedUsers(prev => {
            const newFollowed = new Set(prev);
            if (newFollowed.has(userId)) {
                newFollowed.delete(userId);
            } else {
                newFollowed.add(userId);
            }
            return newFollowed;
        });
    };

    const isFollowingUser = (userId) => followedUsers.has(userId);

    const handlePaymentSuccess = (order) => {
        setPurchaseHistory(prevHistory => [...prevHistory, order]);
        showAlert('Order placed successfully!', 'success');
    };

    const renderContent = () => {
        if (viewingProfile) {
            return <ProfilePage user={viewingProfile} onClose={handleCloseProfile} onUserClick={handleUserClick} onEditProfile={handleEditProfile} onFollowToggle={handleFollowToggle} isFollowingUser={isFollowingUser} usersData={usersData} />;
        }
        switch (activeTab) {
            case 'Feed': return <SportsFeed onStoryClick={handleStoryClick} onUserClick={handleUserClick} onFollowToggle={handleFollowToggle} isFollowingUser={isFollowingUser} showAlert={showAlert} usersData={usersData} />;
            case 'Highlights': return <HighlightsHub onUserClick={handleUserClick} usersData={usersData} />;
            case 'Live': return <LiveTab onGameClick={handleGameClick} onBettingCardClick={handleBettingCardClick} />;
            case 'ProZone': return <ProZone usersData={usersData} />;
            case 'Messaging': return <Messaging onUserClick={handleUserClick} usersData={usersData} />;
            case 'OnlineShop': return <OnlineShop showAlert={showAlert} onPaymentSuccess={handlePaymentSuccess} />;
            case 'Orders': return <OrdersPage purchaseHistory={purchaseHistory} />;
            default: return <HighlightsHub onUserClick={handleUserClick} usersData={usersData} />;
        }
    };

    const NavItem = ({ icon, label, tabName }) => (
        <button onClick={() => setActiveTab(tabName)} className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${activeTab === tabName ? 'bg-gray-200 dark:bg-gray-700 font-bold' : 'text-gray-600 dark:text-gray-300'}` + (tabName === 'OnlineShop' || tabName === 'Orders' ? ' hidden md:flex' : '') + ` hover:bg-gray-200 dark:hover:bg-gray-700`}>
            {React.cloneElement(icon, { strokeWidth: activeTab === tabName ? 2.5 : 2 })}
            {isSidebarOpen && <span className="ml-4 font-semibold">{label}</span>}
        </button>
    );

    return (
        <>
            {messageBox.show && <MessageBox message={messageBox.message} type={messageBox.type} onClose={closeAlert} />}

            {!isLoggedIn ? (
                <LoginPage onLogin={() => setIsLoggedIn(true)} showAlert={showAlert} />
            ) : (
                <div className="bg-white dark:bg-black min-h-screen flex text-gray-800 dark:text-gray-200 font-sans">
                    {storyViewerState.isOpen && (<StoryViewer stories={mockStories} activeIndex={storyViewerState.activeIndex} onClose={handleCloseStoryViewer} onNext={handleNextStory} onPrev={handlePrevStory} onUserClick={handleUserClick} usersData={usersData} />)}
                    {editingProfile && <EditProfileModal user={editingProfile} onClose={handleCloseEditProfile} onSave={handleSaveProfile} showAlert={showAlert} />}
                    {viewingGameStats && <MatchStatsModal game={viewingGameStats} onClose={handleCloseGameStats} showAlert={showAlert} />}
                    {viewingLiveBetting && <LiveBettingModal bet={viewingLiveBetting} onClose={() => setViewingLiveBetting(null)} showAlert={showAlert} />}
                    {showNewPostModal && <NewPostModal onClose={() => setShowNewPostModal(false)} showAlert={showAlert} usersData={usersData} />}

                    <aside className={`bg-white dark:bg-black transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col border-r border-gray-200 dark:border-gray-800`}>
                        <div className={`flex items-center p-4 h-16 border-b border-gray-200 dark:border-gray-800 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>{isSidebarOpen ? <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1> : <Trophy className="text-pink-500" size={28}/>}</div>
                        <nav className="flex-grow p-4 space-y-2">
                            <NavItem icon={<Shield size={28} />} label="Feed" tabName="Feed" />
                            <NavItem icon={<Video size={28} />} label="Highlights" tabName="Highlights" />
                            <NavItem icon={<Radio size={28} />} label="Live" tabName="Live" />
                            <NavItem icon={<Briefcase size={28} />} label="Pro Zone" tabName="ProZone" />
                            <NavItem icon={<Mail size={28} />} label="Messages" tabName="Messaging" />
                            <NavItem icon={<ShoppingCart size={28} />} label="Online Shop" tabName="OnlineShop" />
                            <NavItem icon={<Award size={28} />} label="Orders" tabName="Orders" />
                        </nav>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800"><button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="flex items-center w-full px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"><Menu size={28}/>{isSidebarOpen && <span className="ml-4 font-semibold">Menu</span>}</button></div>
                    </aside>
                    <main className="flex-1 flex flex-col h-screen bg-gray-50 dark:bg-black">
                        <header className="bg-white dark:bg-black h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 z-20 flex-shrink-0 md:hidden"><h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-orange-400">SportSphere</h1><div className="flex items-center space-x-4"><button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Bell size={24} /></button><button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Mail size={24} /></button></div></header>
                        <div className="flex-1 overflow-y-auto">{renderContent()}</div>

                        <button
                            className="fixed bottom-20 right-6 md:bottom-6 md:right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30"
                            onClick={() => setShowNewPostModal(true)}
                        >
                            <Plus size={28} />
                        </button>
                    </main>
                    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 flex justify-around p-2">
                        <button onClick={() => setActiveTab('Feed')} className={`p-2 rounded-full ${activeTab === 'Feed' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Shield size={28} strokeWidth={activeTab === 'Feed' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Highlights')} className={`p-2 rounded-full ${activeTab === 'Highlights' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Video size={28} strokeWidth={activeTab === 'Highlights' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Live')} className={`p-2 rounded-full ${activeTab === 'Live' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Radio size={28} strokeWidth={activeTab === 'Live' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('ProZone')} className={`p-2 rounded-full ${activeTab === 'ProZone' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Briefcase size={28} strokeWidth={activeTab === 'ProZone' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('OnlineShop')} className={`p-2 rounded-full ${activeTab === 'OnlineShop' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><ShoppingCart size={28} strokeWidth={activeTab === 'OnlineShop' ? 2.5: 2}/></button>
                        <button onClick={() => setActiveTab('Orders')} className={`p-2 rounded-full ${activeTab === 'Orders' ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}><Award size={28} strokeWidth={activeTab === 'Orders' ? 2.5: 2}/></button>
                        <button onClick={() => { handleUserClick('currentuser'); }} className={`p-2 rounded-full text-gray-500`}><img src={usersData['currentuser'].avatar} alt="User" className="w-7 h-7 rounded-full" /></button>
                    </nav>
                </div>
            )}

            <footer className="bg-white dark:bg-black text-gray-600 dark:text-gray-300 py-6 text-center border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-3">
                        <a href="#" className="hover:underline">Contact Us</a>
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Follow Us</a>
                    </div>
                    <p className="text-sm">Developed by: David Mbazza</p>
                </div>
            </footer>
        </>
    );
}
