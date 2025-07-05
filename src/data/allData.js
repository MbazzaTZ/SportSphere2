import React from 'react';
import { UserCheck, Shield, Star, Mic, Heart, Clipboard, Briefcase, BarChart3 } from 'lucide-react';

// Mock data for stories
export const mockStories = [
    { id: 1, userId: 'espn', imageUrl: 'https://placehold.co/1080x1920/333/FFF?text=BREAKING+NEWS', viewed: false },
    { id: 2, userId: 'kingjames', imageUrl: 'https://placehold.co/1080x1920/58187A/FFF?text=Game+Day', viewed: false },
    { id: 3, userId: 'manutd', imageUrl: 'https://placehold.co/1080x1920/FFE500/000?text=Match+Day+Live!', viewed: true },
    { id: 4, userId: 'nike', imageUrl: 'https://placehold.co/1080x1920/FFFFFF/000?text=Just+Do+It.', viewed: false },
    { id: 5, userId: 'cr7', imageUrl: 'https://placehold.co/1080x1920/006600/FFFFFF?text=Training+Session', viewed: false },
    { id: 6, userId: 'wojespn', imageUrl: 'https://placehold.co/1080x1920/1DA1F2/FFFFFF?text=Woj+Bomb+Update', viewed: false },
    { id: 7, userId: 'patmcafee', imageUrl: 'https://placehold.co/1080x1920/FFFF00/000000?text=For+The+Brand!', viewed: true },
    { id: 8, userId: 'ffguru', imageUrl: 'https://placehold.co/1080x1920/008000/FFFFFF?text=Fantasy+Tips', viewed: false },
    { id: 9, userId: 'espn', imageUrl: 'https://placehold.co/1080x1920/FF0000/FFFFFF?text=Exclusive+Interview', viewed: false },
    { id: 10, userId: 'kingjames', imageUrl: 'https://placehold.co/1080x1920/58187A/FFFFFF?text=Off-Season+Grind', viewed: false },
    { id: 11, userId: 'manutd', imageUrl: 'https://placehold.co/1080x1920/DA291C/FFFFFF?text=New+Kit+Launch', viewed: false },
    { id: 12, userId: 'nike', imageUrl: 'https://placehold.co/1080x1920/000000/FFFFFF?text=Innovation+Story', viewed: true },
    { id: 13, userId: 'cr7', imageUrl: 'https://placehold.co/1080x1920/006600/FFFFFF?text=Match+Highlights', viewed: false },
    { id: 14, userId: 'wojespn', imageUrl: 'https://placehold.co/1080x1920/1DA1F2/FFFFFF?text=Trade+Rumors', viewed: false },
    { id: 15, userId: 'patmcafee', imageUrl: 'https://placehold.co/1080x1920/FFFF00/000000?text=Podcast+Behind+Scenes', viewed: false },
];

// Mock data for all users by ID
export const allUsersById = {
    'espn': { id: 'espn', user: 'ESPN', avatar: 'https://placehold.co/64x64/FF0000/FFFFFF?text=E', verificationTier: 'reporter', cover: 'https://placehold.co/1200x400/CCCCCC/FFFFFF?text=ESPN+Cover', bio: 'The Worldwide Leader in Sports.', joined: 'June 2009', location: 'Bristol, CT', website: 'espn.com', stats: { posts: '1.2M', followers: '45.1M', following: '512' } },
    'kingjames': { id: 'kingjames', user: 'LeBron James', avatar: 'https://placehold.co/64x64/FDB927/FFFFFF?text=LJ', verificationTier: 'player', cover: 'https://placehold.co/1200x400/58187A/FFFFFF?text=King+James', bio: 'Strive for Greatness👑 | Husband, Father, Philanthropist, Businessman', joined: 'July 2010', location: 'Akron, OH', website: 'lebronjames.com', stats: { posts: '2,541', followers: '158M', following: '389' } },
    'manutd': { id: 'manutd', user: 'Man Utd', avatar: 'https://placehold.co/64x64/DA291C/FFFFFF?text=MU', verificationTier: 'team', cover: 'https://placehold.co/1200x400/000000/FFFFFF?text=Old+Trafford', bio: 'Official account of Manchester United. 🔴 #MUFC', joined: 'April 2010', location: 'Manchester, UK', website: 'manutd.com', stats: { posts: '98.5K', followers: '72.3M', following: '102' } } ,
    'nike': { id: 'nike', user: 'Nike', avatar: 'https://placehold.co/64x64/000000/FFFFFF?text=N', verificationTier: 'sponsor', cover: 'https://placehold.co/1200x400/EEEEEE/000000?text=Swoosh', bio: 'Just Do It.', joined: 'May 2009', location: 'Beaverton, OR', website: 'nike.com', stats: { posts: '1,204', followers: '250M', following: '150' } },
    'cr7': { id: 'cr7', user: 'Cristiano Ronaldo', avatar: 'https://placehold.co/40x40/000000/FFFFFF?text=CR7', verificationTier: 'player', cover: 'https://placehold.co/1200x400/006600/FFFFFF?text=CR7', bio: 'Living the dream.', joined: 'May 2012', location: 'Riyadh, Saudi Arabia', website: 'cristianoronaldo.com', stats: { posts: '3,450', followers: '615M', following: '50' } },
    'wojespn': { id: 'wojespn', user: 'Adrian Wojnarowski', handle: '@wojespn', avatar: 'https://placehold.co/40x40/1DA1F2/FFFFFF?text=Woj', verificationTier: 'reporter', cover: 'https://placehold.co/1200x400/1DA1F2/FFFFFF?text=Woj+Bombs', bio: 'Senior NBA Insider, ESPN.', joined: 'August 2009', location: 'New York, NY', website: 'espn.com', stats: { posts: '150.2K', followers: '5.8M', following: '890' } },
    'patmcafee': { id: 'patmcafee', user: 'Pat McAfee', avatar: 'https://placehold.co/40x40/000000/FFFFFF?text=PM', verificationTier: 'analyst', cover: 'https://placehold.co/1200x400/FFFF00/000000?text=Brand+New', bio: 'Host of The Pat McAfee Show. For the Brand.', joined: 'October 2011', location: 'Indianapolis, IN', website: 'patmcafeeshow.com', stats: { posts: '25.1K', followers: '2.9M', following: '450' } },
    'ffguru': { id: 'ffguru', user: 'FantasyFootballGuru', avatar: 'https://placehold.co/40x40/1DA1F2/FFFFFF?text=FFG', verificationTier: 'analyst', cover: 'https://placehold.co/1200x400/008000/FFFFFF?text=Fantasy+Football', bio: 'Helping you win your fantasy league since 2010.', joined: 'August 2010', location: 'Remote', website: 'ffguru.com', stats: { posts: '15.2K', followers: '1.2M', following: '150' } },
    'currentuser': { id: 'currentuser', user: 'SportySphere User', avatar: 'https://placehold.co/32x32/22C55E/FFFFFF?text=S', verificationTier: 'fan', cover: 'https://placehold.co/1200x400/22C55E/FFFFFF?text=My+SportSphere+Cover', bio: 'Passionate sports fan and analyst.', joined: 'July 2025', location: 'Global', website: '', stats: { posts: '0', followers: '0', following: '0' } },
    // Adding more diverse users
    'serenaw': { id: 'serenaw', user: 'Serena Williams', avatar: 'https://placehold.co/64x64/008080/FFFFFF?text=SW', verificationTier: 'player', cover: 'https://placehold.co/1200x400/800080/FFFFFF?text=Tennis+Court', bio: 'Athlete, Entrepreneur, Mother.', joined: 'March 2011', location: 'Florida, USA', website: 'serenawilliams.com', stats: { posts: '1.1K', followers: '17.5M', following: '200' } },
    'f1official': { id: 'f1official', user: 'Formula 1', avatar: 'https://placehold.co/64x64/E10600/FFFFFF?text=F1', verificationTier: 'team', cover: 'https://placehold.co/1200x400/000000/FFFFFF?text=F1+Track', bio: 'The pinnacle of motorsport.', joined: 'January 2010', location: 'London, UK', website: 'formula1.com', stats: { posts: '200K', followers: '50M', following: '50' } },
    'adidas': { id: 'adidas', user: 'Adidas', avatar: 'https://placehold.co/64x64/000000/FFFFFF?text=A', verificationTier: 'sponsor', cover: 'https://placehold.co/1200x400/AAAAAA/000000?text=Adidas+Sport', bio: 'Impossible Is Nothing.', joined: 'February 2008', location: 'Herzogenaurach, Germany', website: 'adidas.com', stats: { posts: '1.5K', followers: '100M', following: '120' } },
    'bleacherreport': { id: 'bleacherreport', user: 'Bleacher Report', avatar: 'https://placehold.co/64x64/000000/FFFFFF?text=BR', verificationTier: 'reporter', cover: 'https://placehold.co/1200x400/333333/FFFFFF?text=Sports+News', bio: 'Your Team. Your News. Your Way.', joined: 'September 2007', location: 'New York, NY', website: 'bleacherreport.com', stats: { posts: '2.5M', followers: '20M', following: '1000' } },
    'usainbolt': { id: 'usainbolt', user: 'Usain Bolt', avatar: 'https://placehold.co/64x64/000000/FACC15?text=UB', verificationTier: 'player', cover: 'https://placehold.co/1200x400/008000/FFFFFF?text=Fastest+Man', bio: 'Living the dream. ⚡️', joined: 'April 2010', location: 'Kingston, Jamaica', website: 'usainbolt.com', stats: { posts: '800', followers: '10M', following: '150' } },
};

// Define verification tiers and their properties (needed for VerifiedBadge rendering within data file)
export const verificationTiers = {
    player: { label: 'Verified Player', icon: <UserCheck size={16} className="text-white" />, color: 'bg-blue-500' },
    team: { label: 'Official Team', icon: <Shield size={16} className="text-white" />, color: 'bg-red-600' },
    sponsor: { label: 'Official Sponsor', icon: <Star size={16} className="text-white" />, color: 'bg-yellow-500' },
    reporter: { label: 'Verified Reporter', icon: <Mic size={16} className="text-white" />, color: 'bg-purple-600' },
    fan: { label: 'Verified Fan', icon: <Heart size={16} className="text-white" />, color: 'bg-pink-500' },
    coach: { label: 'Verified Coach', icon: <Clipboard size={16} className="text-white" />, color: 'bg-green-600' },
    manager: { label: 'Team Manager', icon: <Briefcase size={16} className="text-white" />, color: 'bg-indigo-600' },
    analyst: { label: 'Sports Analyst', icon: <BarChart3 size={16} className="text-white" />, color: 'bg-teal-500' },
};

// Mock data for posts
export const mockPosts = [
    { id: 2, platform: 'Instagram', userId: 'cr7', content: 'Another win! Great team effort. On to the next one. 🏆', likes: 4500000, comments: 88000, time: '2025-07-04T07:00:00Z', image: 'https://placehold.co/600x750/006600/FFFFFF?text=Siuuu!', commentsData: [{userId: 'currentuser', text: 'GOAT!!! 🐐', likes: 120, dislikes: 2}] },
    { id: 1, platform: 'Twitter', userId: 'wojespn', handle: '@wojespn', content: 'BREAKING: The Pelicans are finalizing a trade to send two future first-round picks to the Hornets for a rising star guard, sources tell ESPN.', likes: 98000, comments: 12300, time: '2025-07-04T08:50:00Z', commentsData: [] },
    { id: 7, platform: 'Instagram', userId: 'kingjames', content: 'Taco Tuesday 🌮🌮', likes: 2300000, comments: 54000, time: '2025-07-03T22:00:00Z', image: 'https://placehold.co/600x600/FDB927/000000?text=Tacos', commentsData: [] },
    { id: 8, platform: 'Twitter', userId: 'patmcafee', handle: '@patmcafee', content: 'FOR THE BRAND! What a game last night. #NFL', likes: 75000, comments: 5000, time: '2025-07-02T10:30:00Z', commentsData: [] },
    { id: 9, platform: 'Facebook', userId: 'manutd', content: 'Training hard for the upcoming season! #MUFC', likes: 150000, comments: 10000, time: '2025-06-20T15:00:00Z', image: 'https://placehold.co/600x400/DA291C/FFFFFF?text=Training', commentsData: [] },
    { id: 10, platform: 'Twitter', userId: 'serenaw', content: 'Back on court and feeling great! #TennisLife', likes: 15000, comments: 800, time: '2025-07-01T11:00:00Z', commentsData: [] },
    { id: 11, platform: 'Instagram', userId: 'f1official', content: 'Lights out and away we go! What a race weekend! 🏎️ #F1', likes: 1200000, comments: 25000, time: '2025-06-29T18:00:00Z', image: 'https://placehold.co/600x750/E10600/FFFFFF?text=F1+Race', commentsData: [] },
    { id: 12, platform: 'Facebook', userId: 'adidas', content: 'New collection dropping soon. Stay tuned! #Adidas', likes: 300000, comments: 15000, time: '2025-06-25T10:00:00Z', image: 'https://placehold.co/600x400/AAAAAA/000000?text=New+Drop', commentsData: [] },
    { id: 13, platform: 'Twitter', userId: 'bleacherreport', handle: '@bleacherreport', content: 'Breaking down the biggest upsets of the season. Read more on our app!', likes: 50000, comments: 3000, time: '2025-06-28T14:00:00Z', commentsData: [] },
    { id: 14, platform: 'Instagram', userId: 'usainbolt', content: 'Still got it! Enjoying retirement but the speed never leaves you. ⚡', likes: 900000, comments: 18000, time: '2025-07-03T09:00:00Z', image: 'https://placehold.co/600x750/008000/FFFFFF?text=Still+Fast', commentsData: [] },
];

// Mock data for videos
export const mockVideos = [
    { id: 1, platform: 'TikTok', userId: 'patmcafee', content: 'This league is absolutely WILD right now!', likes: 50000, comments: 2000, shares: 15000, videoUrl: 'https://placehold.co/338x600/111/fff?text=WILD', videoType: 'reel', sound: { name: 'Original Sound', author: 'patmcafee' } },
    { id: 2, platform: 'YouTube', userId: 'espn', content: 'NBA Finals Game 7 Highlights!', likes: 120000, comments: 5000, shares: 20000, videoUrl: 'https://placehold.co/600x338/FF0000/FFFFFF?text=NBA+Highlights', videoType: 'highlight', sound: { name: 'Epic Sport Rock', author: 'StockMusic' } },
    { id: 3, platform: 'Twitch', userId: 'ffguru', content: 'Live Draft Analysis Stream!', likes: 15000, comments: 1000, shares: 500, videoUrl: 'https://placehold.co/600x338/6441A5/FFFFFF?text=Live+Stream', videoType: 'live', sound: { name: 'Stadium Sounds', author: 'Old Trafford' } },
    { id: 4, platform: 'Instagram', userId: 'kingjames', content: 'Workout grind never stops. #StriveForGreatness', likes: 800000, comments: 15000, shares: 30000, videoUrl: 'https://placehold.co/600x600/FDB927/000000?text=Workout', videoType: 'reel', sound: { name: 'Pump Up Anthem', author: 'GymBeats' } },
    { id: 5, platform: 'SportSphere', userId: 'espn', content: 'Breaking News: Star Player Traded!', likes: 50000, comments: 2000, shares: 15000, videoUrl: 'https://placehold.co/600x338/333/FFF?text=NEWS+UPDATE', videoType: 'news', sound: { name: 'Urgent News Jingle', author: 'NewsRoom' } },
    { id: 6, platform: 'YouTube', userId: 'manutd', content: 'Top 10 Goals of the Season!', likes: 200000, comments: 8000, shares: 10000, videoUrl: 'https://placehold.co/600x338/DA291C/FFFFFF?text=Top+Goals', videoType: 'highlight', sound: { name: 'Football Anthem', author: 'GoalMusic' } },
    { id: 7, platform: 'TikTok', userId: 'cr7', content: 'Skills and Drills! ⚽', likes: 3000000, comments: 50000, shares: 100000, videoUrl: 'https://placehold.co/338x600/000000/FFFFFF?text=Skills', videoType: 'reel', sound: { name: 'Drill Beat', author: 'CR7Mix' } },
    { id: 8, platform: 'SportSphere', userId: 'nike', content: 'New Collection Launch Event!', likes: 100000, comments: 3000, shares: 5000, videoUrl: 'https://placehold.co/600x338/EEEEEE/000000?text=New+Launch', videoType: 'news', sound: { name: 'Fashion Show Music', author: 'RunwaySounds' } },
    { id: 9, platform: 'Twitch', userId: 'wojespn', content: 'NBA Trade Deadline Live Coverage!', likes: 40000, comments: 2500, shares: 1000, videoUrl: 'https://placehold.co/600x338/1DA1F2/FFFFFF?text=Trade+Deadline', videoType: 'live', sound: { name: 'Breaking News Loop', author: 'WojPod' } },
    { id: 10, platform: 'YouTube', userId: 'patmcafee', content: 'My take on the latest NFL drama!', likes: 90000, comments: 4000, shares: 8000, videoUrl: 'https://placehold.co/600x338/FFFF00/000000?text=NFL+Drama', videoType: 'highlight', sound: { name: 'Talk Show Intro', author: 'McAfeeAudio' } },
    { id: 11, platform: 'SportSphere', userId: 'kingjames', content: 'Exclusive behind-the-scenes from practice!', likes: 1.5e6, comments: 25000, shares: 50000, videoUrl: 'https://placehold.co/600x338/58187A/FFFFFF?text=Practice', videoType: 'reel', sound: { name: 'Training Montage', author: 'SportBeats' } },
    { id: 12, platform: 'YouTube', userId: 'manutd', content: 'Match Day Vlog: Victory at Old Trafford!', likes: 180000, comments: 7000, shares: 9000, videoUrl: 'https://placehold.co/600x338/DA291C/FFFFFF?text=Match+Vlog', videoType: 'news', sound: { name: 'Fan Chant', author: 'UnitedVoice' } },
    { id: 13, platform: 'TikTok', userId: 'ffguru', content: 'Fantasy Football Sleepers for 2025!', likes: 30000, comments: 1500, shares: 2000, videoUrl: 'https://placehold.co/338x600/1DA1F2/FFFFFF?text=Sleepers', videoType: 'reel', sound: { name: 'Fantasy Beat', author: 'GuruTunes' } },
    { id: 14, platform: 'SportSphere', userId: 'espn', content: 'Live Post-Game Analysis: Lakers vs Celtics', likes: 70000, comments: 3000, shares: 2000, videoUrl: 'https://placehold.co/600x338/FF0000/FFFFFF?text=PostGame', videoType: 'live', sound: { name: 'Commentary Mix', author: 'ESPNRadio' } },
    { id: 15, platform: 'YouTube', userId: 'cr7', content: 'My Journey: From Lisbon to Riyadh', likes: 5e6, comments: 100000, shares: 200000, videoUrl: 'https://placehold.co/600x338/006600/FFFFFF?text=Journey', videoType: 'highlight', sound: { name: 'Inspirational Score', author: 'CR7Films' } },
    { id: 16, platform: 'SportSphere', userId: 'patmcafee', content: 'Exclusive Interview with a Super Bowl MVP!', likes: 120000, comments: 6000, shares: 10000, videoUrl: 'https://placehold.co/600x338/FFFF00/000000?text=Interview', videoType: 'news', sound: { name: 'PodcastPro' } },
    { id: 17, platform: 'Instagram', userId: 'nike', content: 'Behind the Design: New Football Boots!', likes: 400000, comments: 15000, shares: 25000, videoUrl: 'https://placehold.co/600x600/EEEEEE/000000?text=Boots', videoType: 'reel', sound: { name: 'Design Reveal', author: 'NikeAudio' } },
    { id: 18, platform: 'Twitch', userId: 'espn', content: 'Fantasy Football Draft Day Live!', likes: 60000, comments: 4000, shares: 1500, videoUrl: 'https://placehold.co/600x338/FF0000/FFFFFF?text=Draft+Day', videoType: 'live', sound: { name: 'Breaking News Alert', author: 'WojSound' } },
    { id: 19, platform: 'YouTube', userId: 'kingjames', content: 'My Top 5 Dunks of All Time!', likes: 2.8e6, comments: 60000, shares: 120000, videoUrl: 'https://placehold.co/600x338/58187A/FFFFFF?text=Top+Dunks', videoType: 'highlight', sound: { name: 'Dunk Mix', author: 'KingJamesMix' } },
    { id: 20, platform: 'SportSphere', userId: 'manutd', content: 'Pre-Season Training Camp Update!', likes: 90000, comments: 3500, shares: 4000, videoUrl: 'https://placehold.co/600x338/DA291C/FFFFFF?text=Training+Update', videoType: 'news', sound: { name: 'Training Ground Vibes', author: 'MUFCAudio' } },
    { id: 21, platform: 'TikTok', userId: 'wojespn', content: 'Woj Bomb: Another blockbuster trade incoming!', likes: 180000, comments: 10000, shares: 5000, videoUrl: 'https://placehold.co/338x600/1DA1F2/FFFFFF?text=Woj+Bomb', videoType: 'reel', sound: { name: 'Breaking News Alert', author: 'WojSound' } },
    { id: 22, platform: 'YouTube', userId: 'ffguru', content: 'Week 1 Matchup Previews & Predictions!', likes: 45000, comments: 2000, shares: 1800, videoUrl: 'https://placehold.co/600x338/008000/FFFFFF?text=Previews', videoType: 'news', sound: { name: 'Prediction Jingle', author: 'FFGTunes' } },
    { id: 23, platform: 'SportSphere', userId: 'cr7', content: 'Training session with the squad!', likes: 2.1e6, comments: 40000, shares: 80000, videoUrl: 'https://placehold.co/600x338/006600/FFFFFF?text=Squad+Training', videoType: 'live', sound: { name: 'Training Ground Ambience', author: 'CR7Sounds' } },
    { id: 24, platform: 'Instagram', userId: 'espn', content: 'Behind the Scenes: College Football Gameday!', likes: 300000, comments: 10000, shares: 15000, videoUrl: 'https://placehold.co/600x600/FF0000/FFFFFF?text=Gameday', videoType: 'reel', sound: { name: 'Gameday Hype', author: 'ESPNBeats' } },
    { id: 25, platform: 'YouTube', userId: 'nike', content: 'Innovating for Athletes: The Future of Sportswear', likes: 70000, comments: 2500, shares: 3000, videoUrl: 'https://placehold.co/600x338/000000/FFFFFF?text=Innovation', videoType: 'highlight', sound: { name: 'Innovation Soundscape', author: 'NikeLabs' } },
    // Adding more video data
    { id: 26, platform: 'SportSphere', userId: 'serenaw', content: 'Serving up some aces today! 🎾 #Tennis', likes: 150000, comments: 5000, shares: 8000, videoUrl: 'https://placehold.co/600x338/008080/FFFFFF?text=Tennis+Serve', videoType: 'highlight', sound: { name: 'Court Sounds', author: 'TennisPro' } },
    { id: 27, platform: 'YouTube', userId: 'f1official', content: 'Onboard with the champ! Experience the speed. 🚀', likes: 500000, comments: 10000, shares: 20000, videoUrl: 'https://placehold.co/600x338/E10600/FFFFFF?text=F1+Onboard', videoType: 'highlight', sound: { name: 'Engine Roar', author: 'F1Audio' } },
    { id: 28, platform: 'TikTok', userId: 'adidas', content: 'Unboxing the new Predator boots!   #Football', likes: 250000, comments: 7000, shares: 12000, videoUrl: 'https://placehold.co/338x600/AAAAAA/000000?text=Unboxing', videoType: 'reel', sound: { name: 'Unbox Beat', author: 'AdidasSounds' } },
    { id: 29, platform: 'SportSphere', userId: 'bleacherreport', content: 'Top 10 NBA Plays of the Week!', likes: 180000, comments: 6000, shares: 9000, videoUrl: 'https://placehold.co/600x338/333333/FFFFFF?text=NBA+Plays', videoType: 'news', sound: { name: 'Highlight Reel', author: 'BRSounds' } },
    { id: 30, platform: 'YouTube', userId: 'usainbolt', content: 'My fastest 100m race ever! Relive the moment. 🥇', likes: 1000000, comments: 30000, shares: 50000, videoUrl: 'https://placehold.co/600x338/008000/FFFFFF?text=100m+Dash', videoType: 'highlight', sound: { name: 'Crowd Roar', author: 'OlympicSounds' } },
];

// Mock data for professional content
export const mockProContent = [
    { id: 1, sender: 'SportSphere Admin', message: 'Welcome to the official Sports Industry Channel! Stay tuned for exclusive insights and updates.', time: '10:00 AM', avatar: 'https://placehold.co/32x32/007bff/FFFFFF?text=A' },
    { id: 2, sender: 'ESPN', message: 'BREAKING: Major new partnership announced between Global Sports Brands and Elite Athletes Agency. Details to follow!', time: '10:15 AM', avatar: 'https://placehold.co/32x32/FF0000/FFFFFF?text=E' },
    { id: 3, sender: 'Sky Sports', message: 'RUMOR: Star striker considering a move to a European giant. Talks are reportedly in advanced stages. #TransferTalk', time: '10:30 AM', avatar: 'https://placehold.co/32x32/00BCD4/FFFFFF?text=S' },
    { id: 4, sender: 'BBC Sport', message: 'Analysis: Fan engagement strategies for the next decade. Key takeaways: personalization and interactive experiences.', time: '11:00 AM', avatar: 'https://placehold.co/32x32/000000/FFFFFF?text=B' },
    { id: 5, sender: 'SuperSport', message: 'JUST IN: Coach fired after team\'s poor start to the season. Search for a replacement begins immediately.', time: '11:15 AM', avatar: 'https://placehold.co/32x32/00A86B/FFFFFF?text=S' },
    { id: 6, sender: 'SportSphere Admin', message: 'JOB ALERT: Head of Digital Marketing at Premier League club now open for applications. Link in bio!', time: '11:30 AM', avatar: 'https://placehold.co/32x32/007bff/FFFFFF?text=A' },
    { id: 7, sender: 'ESPN', message: 'RUMOR: Whispers of a new esports league forming with massive investment. Could this be the next big thing?', time: '11:45 AM', avatar: 'https://placehold.co/32x32/FF0000/FFFFFF?text=E' },
    { id: 8, sender: 'Sky Sports', message: 'Upcoming Webinar: "Monetizing Sports Content in the Digital Age" - July 15th. Register now!', time: '12:00 PM', avatar: 'https://placehold.co/32x32/00BCD4/FFFFFF?text=S' },
    { id: 9, sender: 'BBC Sport', message: 'Exclusive: Inside look at the new training facilities for the national team. State-of-the-art!', time: '12:30 PM', avatar: 'https://placehold.co/32x32/000000/FFFFFF?text=B' },
    { id: 10, sender: 'SuperSport', message: 'BREAKING: African Footballer of the Year announced! Congratulations to the deserving winner!', time: '12:45 PM', avatar: 'https://placehold.co/32x32/00A86B/FFFFFF?text=S' },
    // Adding more pro content
    { id: 11, sender: 'SportBusiness', message: 'REPORT: Global sports sponsorship market projected to grow by 8% in 2025. Key drivers: digital platforms and fan engagement.', time: '01:00 PM', avatar: 'https://placehold.co/32x32/556B2F/FFFFFF?text=SB' },
    { id: 12, sender: 'FIFA', message: 'REMINDER: Applications for the next World Cup host city bid close on August 30th. Submit your proposals!', time: '01:30 PM', avatar: 'https://placehold.co/32x32/005792/FFFFFF?text=F' },
    { id: 13, sender: 'NBA Media', message: 'INSIGHT: The impact of player-led media companies on traditional sports broadcasting. A new era is here.', time: '02:00 PM', avatar: 'https://placehold.co/32x32/800080/FFFFFF?text=N' },
    { id: 14, sender: 'Olympics', message: 'NEWS: New sustainability initiatives announced for the 2032 Olympic Games. Greener games ahead!', time: '02:15 PM', avatar: 'https://placehold.co/32x32/FFD700/000000?text=O' },
    { id: 15, sender: 'World Rugby', message: 'WEBINAR: "Maximizing Revenue Streams in Rugby" - August 10th. Featuring industry leaders.', time: '02:45 PM', avatar: 'https://placehold.co/32x32/8B0000/FFFFFF?text=WR' },
];

// Mock data for initial live games
export const initialLiveGames = [
    { id: 1, sport: 'NBA', team1: 'Lakers', team2: 'Celtics', score1: 88, score2: 85, time: "4Q 2:12", odds: { team1: -150, team2: +130, total: 210.5 }, stats: { team1: { 'FG%': '45.2', '3P%': '33.3', 'FT%': '78.9', 'Rebounds': 45, 'Assists': 22, 'Turnovers': 12 }, team2: { 'FG%': '42.1', '3P%': '30.1', 'FT%': '81.2', 'Rebounds': 48, 'Assists': 18, 'Turnovers': 15 }, topPerformers: [{name: 'LeBron James', pts: 32, reb: 8, ast: 9}, {name: 'Jayson Tatum', pts: 28, reb: 12, ast: 5}] } },
    { id: 2, sport: 'Soccer', team1: 'Man Utd', team2: 'Liverpool', score1: 1, score2: 0, time: "HT", odds: { team1: +120, draw: +250, team2: +200 }, stats: { team1: { 'Possession': '55%', 'Shots': 10, 'Shots on Target': 5, 'Corners': 3, 'Fouls': 7 }, team2: { 'Possession': '45%', 'Shots': 8, 'Shots on Target': 3, 'Corners': 5, 'Fouls': 5 }, topPerformers: [{name: 'Bruno Fernandes', goals: 1, assists: 0}, {name: 'Mohamed Salah', goals: 0, assists: 0}] } },
    // Adding more live games
    { id: 3, sport: 'Tennis', team1: 'Djokovic', team2: 'Alcaraz', score1: '6-4', score2: '3-6', time: "Set 3", odds: { team1: -180, team2: +150 }, stats: { team1: { 'Aces': 8, 'Double Faults': 3, 'Winners': 25, 'Unforced Errors': 18 }, team2: { 'Aces': 5, 'Double Faults': 2, 'Winners': 22, 'Unforced Errors': 20 }, topPerformers: [{name: 'Djokovic', score: '6-4, 3-6'}, {name: 'Alcaraz', score: '4-6, 6-3'}] } },
    { id: 4, sport: 'NFL', team1: 'Chiefs', team2: 'Bills', score1: 14, score2: 10, time: "2Q 8:30", odds: { team1: -200, team2: +170, total: 48.5 }, stats: { team1: { 'Passing Yds': 150, 'Rushing Yds': 60, 'Turnovers': 1, 'Sacks': 2 }, team2: { 'Passing Yds': 120, 'Rushing Yds': 75, 'Turnovers': 0, 'Sacks': 1 }, topPerformers: [{name: 'Patrick Mahomes', yds: 150, td: 1}, {name: 'Josh Allen', yds: 120, td: 0}] } },
    { id: 5, sport: 'MLB', team1: 'Dodgers', team2: 'Yankees', score1: 3, score2: 2, time: "7th Inn", odds: { team1: -130, team2: +110, total: 8.5 }, stats: { team1: { 'Hits': 7, 'Errors': 0, 'HR': 1, 'Strikeouts': 5 }, team2: { 'Hits': 6, 'Errors': 1, 'HR': 0, 'Strikeouts': 6 }, topPerformers: [{name: 'Mookie Betts', hr: 1, rbi: 2}, {name: 'Aaron Judge', hits: 2, rbi: 0}] } },
];

// Mock data for live bets
export const mockLiveBets = [
    {
        id: 1,
        sport: 'NBA',
        match: 'Lakers vs Celtics',
        market: 'Next Point Scorer',
        options: [{ player: 'LeBron James', odds: -110.55 }, { player: 'Jayson Tatum', odds: +100.25 }],
        time: 'Live',
        allMarkets: [
            { name: 'Game Winner', type: 'moneyline', options: [{ name: 'Lakers', odds: -150 }, { name: 'Celtics', odds: +130 }] },
            { name: 'Total Points', type: 'over_under', options: [{ name: 'Over 210.5', odds: -110 }, { name: 'Under 210.5', odds: -110 }] },
            { name: 'Player Points (LeBron James)', type: 'player_prop', options: [{ name: 'Over 30.5', odds: -120 }, { name: 'Under 30.5', odds: +100 }] },
            { name: 'Next Field Goal', type: 'next_event', options: [{ name: 'Lakers', odds: -115 }, { name: 'Celtics', odds: -105 }] },
        ]
    },
    {
        id: 2,
        sport: 'Soccer',
        match: 'Man Utd vs Liverpool',
        market: 'Next Goal Scorer',
        options: [{ player: 'Marcus Rashford', odds: +250.75 }, { player: 'Darwin Nunez', odds: +300.10 }],
        time: 'Live',
        allMarkets: [
            { name: 'Match Result', type: 'moneyline', options: [{ name: 'Man Utd', odds: +120 }, { name: 'Draw', odds: +250 }, { name: 'Liverpool', odds: +200 }] },
            { name: 'Total Goals', type: 'over_under', options: [{ name: 'Over 2.5', odds: -130 }, { name: 'Under 2.5', odds: +110 }] },
            { name: 'Both Teams to Score', type: 'yes_no', options: [{ name: 'Yes', odds: -160 }, { name: 'No', odds: +140 }] },
            { name: 'Next Corner Kick', type: 'next_event', options: [{ name: 'Man Utd', odds: -110 }, { name: 'Liverpool', odds: -110 }] },
        ]
    },
    {
        id: 3,
        sport: 'Tennis',
        match: 'Djokovic vs Alcaraz',
        market: 'Set 3 Winner',
        options: [{ player: 'Djokovic', odds: -180.30 }, { player: 'Alcaraz', odds: +150.80 }],
        time: 'Live',
        allMarkets: [
            { name: 'Match Winner', type: 'moneyline', options: [{ name: 'Djokovic', odds: -200 }, { name: 'Alcaraz', odds: +170 }] },
            { name: 'Total Games in Set 3', type: 'over_under', options: [{ name: 'Over 9.5', odds: -110 }, { name: 'Under 9.5', odds: -110 }] },
            { name: 'Next Game Winner', type: 'player_prop', options: [{ name: 'Djokovic', odds: -140 }, { name: 'Alcaraz', odds: +120 }] },
        ]
    },
    // Adding more live bets
    {
        id: 4,
        sport: 'NFL',
        match: 'Chiefs vs Bills',
        market: 'Next Touchdown Scorer',
        options: [{ player: 'Travis Kelce', odds: +300 }, { player: 'Stefon Diggs', odds: +350 }],
        time: 'Live',
        allMarkets: [
            { name: 'Game Winner', type: 'moneyline', options: [{ name: 'Chiefs', odds: -200 }, { name: 'Bills', odds: +170 }] },
            { name: 'Total Points', type: 'over_under', options: [{ name: 'Over 48.5', odds: -110 }, { name: 'Under 48.5', odds: -110 }] },
        ]
    },
    {
        id: 5,
        sport: 'MLB',
        match: 'Dodgers vs Yankees',
        market: 'Next Home Run',
        options: [{ player: 'Mookie Betts', odds: +400 }, { player: 'Aaron Judge', odds: +380 }],
        time: 'Live',
        allMarkets: [
            { name: 'Game Winner', type: 'moneyline', options: [{ name: 'Dodgers', odds: -130 }, { name: 'Yankees', odds: +110 }] },
            { name: 'Total Runs', type: 'over_under', options: [{ name: 'Over 8.5', odds: -110 }, { name: 'Under 8.5', odds: -110 }] },
        ]
    },
];

// Mock data for shop teams
export const shopTeams = [
    { id: 'yanga', name: 'Young Africans SC', logo: 'https://images.seeklogo.com/logo-png/49/1/young-africans-sc-logo-png_seeklogo-490860.png', membershipTiers: [{ name: 'Bronze', duration: '1 Month', price: 10000 }, { name: 'Silver', duration: '6 Months', price: 50000 }, { name: 'Gold', duration: '1 Year', price: 90000 }] },
    { id: 'simba', name: 'Simba SC', logo: 'https://simbasc.co.tz/storage/2019/01/simba.png', membershipTiers: [{ name: 'Fan', duration: '1 Month', price: 12000 }, { name: 'Pro', duration: '1 Year', price: 100000 }] },
    { id: 'azam', name: 'Azam FC', logo: 'https://img.sofascore.com/api/v1/team/212411/image', membershipTiers: [{ name: 'Standard', duration: '1 Year', price: 75000 }] },
    // Adding more teams
    { id: 'arsenal', name: 'Arsenal FC', logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg', membershipTiers: [{ name: 'Red', duration: '1 Month', price: 15000 }, { name: 'White', duration: '1 Year', price: 120000 }] },
    { id: 'barcelona', name: 'FC Barcelona', logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg', membershipTiers: [{ name: 'Culer', duration: '1 Month', price: 18000 }, { name: 'Soci', duration: '1 Year', price: 150000 }] },
];

// Mock data for shop matches
export const shopMatches = [
    { id: 1, date: '2025-07-28', time: '17:00', homeTeamId: 'yanga', awayTeamId: 'simba', status: 'Upcoming' },
    { id: 2, date: '2025-07-29', time: '19:00', homeTeamId: 'azam', awayTeamId: 'yanga', status: 'Upcoming' },
    // Adding more matches
    { id: 3, date: '2025-08-05', time: '20:00', homeTeamId: 'arsenal', awayTeamId: 'manutd', status: 'Upcoming' },
    { id: 4, date: '2025-08-10', time: '16:00', homeTeamId: 'barcelona', awayTeamId: 'realmadrid', status: 'Upcoming' }, // Assuming realmadrid user exists or will be added
];

// Helper function to get team name from ID
const getTeamName = (id) => shopTeams.find(t => t.id === id)?.name || 'Unknown Team';

// Mock data for shop products
export const shopProducts = [
    { id: 'yanga_jersey_home', name: 'Young Africans Home Jersey 23/24', price: 75000, image: 'https://placehold.co/400x400/16a34a/ffffff?text=Yanga+Jersey', type: 'merchandise', colors: ['Green', 'Yellow'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'simba_jersey_home', name: 'Simba SC Home Jersey 23/24', price: 75000, image: 'https://placehold.co/400x400/ef4444/ffffff?text=Simba+Jersey', type: 'merchandise', colors: ['Red', 'White'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'azam_jersey_home', name: 'Azam FC Home Jersey 23/24', price: 65000, image: 'https://placehold.co/400x400/3b82f6/ffffff?text=Azam+Jersey', type: 'merchandise', colors: ['Blue', 'White'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'taifa_stars_scarf', name: 'Taifa Stars Supporter Scarf', price: 25000, image: 'https://placehold.co/400x400/facc15/000000?text=Taifa+Scarf', type: 'merchandise', colors: ['Yellow', 'Green'], sizes: ['One Size'] },
    // Dynamically add tickets for upcoming matches
    ...shopMatches.filter(m => m.status === 'Upcoming').map(m => ({
        id: `ticket_${m.id}`, name: `Ticket: ${getTeamName(m.homeTeamId)} vs ${getTeamName(m.awayTeamId)}`,
        price: { 'VIP': 30000, 'Regular': 15000 }, image: `https://placehold.co/400x400/22c55e/ffffff?text=Ticket`, type: 'ticket'
    })),
    // Adding more merchandise
    { id: 'arsenal_jersey', name: 'Arsenal Home Jersey 24/25', price: 80000, image: 'https://placehold.co/400x400/EF0000/FFFFFF?text=Arsenal+Jersey', type: 'merchandise', colors: ['Red', 'White'], sizes: ['S', 'M', 'L', 'XL'] },
    { id: 'barcelona_scarf', name: 'FC Barcelona Scarf', price: 30000, image: 'https://placehold.co/400x400/004D98/FDB927?text=Barca+Scarf', type: 'merchandise', colors: ['Blue', 'Red'], sizes: ['One Size'] },
];

// Mock data for AzamTV products
export const azamTvData = {
    hardware: [
        { id: 'azam_kit', name: 'Full Decoder Kit', price: 150000, image: 'https://placehold.co/400x400/00aef0/ffffff?text=Azam+Kit', description: 'Complete kit including decoder, dish, LNB, and remote.' },
        { id: 'azam_decoder', name: 'Decoder Only', price: 95000, image: 'https://placehold.co/400x400/00aef0/ffffff?text=Decoder', description: 'High-definition digital satellite receiver.' },
    ],
    subscriptions: [
        { id: 'sub_basic_1m', name: 'Basic', duration: '1 Month', price: 20000 },
        { id: 'sub_premium_1y', name: 'Premium', duration: '1 Year', price: 500000 },
        // Adding more subscriptions
        { id: 'sub_sports_3m', name: 'Sports Pack', duration: '3 Months', price: 75000 },
        { id: 'sub_family_6m', name: 'Family Pack', duration: '6 Months', price: 180000 },
    ]
};

// Mock data for best offers
export const bestOffers = [
    { id: 'offer_jersey_bundle', name: 'Team Jersey + Scarf Bundle', originalPrice: 100000, offerPrice: 85000, image: 'https://placehold.co/400x400/16a34a/ffffff?text=Bundle', description: 'Get any team jersey and a Taifa Stars scarf together for a special price!' },
    { id: 'offer_azam_premium', name: 'AzamTV Premium 3-Month Offer', originalPrice: 135000, offerPrice: 100000, image: 'https://placehold.co/400x400/00aef0/ffffff?text=AzamTV+Offer', description: 'Enjoy 3 months of AzamTV Premium at a discounted rate!' },
    // Adding more offers
    { id: 'offer_ticket_bundle', name: 'Match Day VIP Bundle', originalPrice: 45000, offerPrice: 35000, image: 'https://placehold.co/400x400/22c55e/ffffff?text=VIP+Bundle', description: 'VIP Ticket + Match Program for any upcoming match!' },
    { id: 'offer_fan_starter', name: 'New Fan Starter Pack', originalPrice: 40000, offerPrice: 28000, image: 'https://placehold.co/400x400/FFD700/000000?text=Fan+Pack', description: 'Includes a mini-ball and team flag.' },
];

// Mock data for messages
export const mockMessages = [
    { id: 1, platform: 'Twitter', userId: 'ffguru', message: 'Who are you starting at FLEX this week?', time: '15m' },
    { id: 2, platform: 'Instagram', userId: 'kingjames', message: 'You ready for the game tonight?', time: '1h' },
    { id: 3, platform: 'Facebook', userId: 'manutd', message: 'Check out the new kit reveal!', time: '3h' },
    { id: 4, platform: 'Twitter', userId: 'wojespn', message: 'Got a big scoop for you, dropping soon.', time: '1d' },
    { id: 5, platform: 'TikTok', userId: 'patmcafee', message: 'HAHTAHT! What a play!', time: '2d' },
    // Adding more messages
    { id: 6, platform: 'SportSphere', userId: 'serenaw', message: 'Great practice today, feeling strong!', time: '5h' },
    { id: 7, platform: 'Twitter', userId: 'f1official', message: 'The next race is going to be epic! #F1', time: '1d' },
    { id: 8, platform: 'Instagram', userId: 'adidas', message: 'Just dropped new running shoes! Check them out.', time: '2h' },
    { id: 9, platform: 'Facebook', userId: 'bleacherreport', message: 'Poll: Who will win the championship this year?', time: '4h' },
    { id: 10, platform: 'SportSphere', userId: 'usainbolt', message: 'Still the fastest! 😉', time: '1w' },
];
 