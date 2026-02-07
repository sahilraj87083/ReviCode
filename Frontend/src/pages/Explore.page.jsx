import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Search, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Repeat, 
  MoreHorizontal, 
  ArrowLeft,
  Share2,
  X,
  Code2
} from "lucide-react";

// --- MOCK DATA ---
const GENERAL_POSTS = [
  {
    id: 1,
    user: { name: "sahilsingh", avatar: "https://ui-avatars.com/api/?name=Sahil+Singh&background=0D8ABC&color=fff" },
    type: "snippet",
    title: "Optimized DP Solution 🚀",
    code: `function fib(n) {
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return n ? b : a;
}`,
    likes: 1240,
    comments: 45,
    isLiked: true,
  },
  {
    id: 2,
    user: { name: "uzmakhan", avatar: "https://ui-avatars.com/api/?name=Uzma+Khan&background=10b981&color=fff" },
    type: "image",
    title: "Late night grind ☕️",
    content: "Just hit 2000 rating on LeetCode! Consistency is key.",
    likes: 856,
    comments: 22,
    isLiked: false,
  }
];

const FRIENDS_POSTS = [
  {
    id: 3,
    user: { name: "friend_dev", avatar: "https://ui-avatars.com/api/?name=Friend+Dev&background=f43f5e&color=fff" },
    type: "snippet",
    title: "Check out this one-liner",
    code: `const isEven = n => !(n & 1);`,
    likes: 50,
    comments: 5,
    isLiked: false,
  }
];

function Explore() {
  const [activeTab, setActiveTab] = useState("general"); // 'general' | 'friends'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Toggle Feed Source
  const posts = activeTab === "general" ? GENERAL_POSTS : FRIENDS_POSTS;

  // --- SEARCH ANIMATION ---
  useGSAP(() => {
    if (isSearchOpen) {
      gsap.to(searchContainerRef.current, {
        width: "100%",
        maxWidth: "300px",
        opacity: 1,
        paddingLeft: "12px",
        paddingRight: "12px",
        duration: 0.4,
        ease: "back.out(1.7)",
      });
      searchInputRef.current?.focus();
    } else {
      gsap.to(searchContainerRef.current, {
        width: "40px",
        paddingLeft: "0px",
        paddingRight: "0px",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isSearchOpen]);

  return (
    <div className="h-[100dvh] bg-slate-950 text-white overflow-hidden relative font-sans selection:bg-red-500/30">
      
      {/* --- TOP HEADER --- */}
      {/* FIX: Added 'top-14' for mobile to clear fixed header, 'md:top-4' for desktop */}
      <header className="absolute top-16 md:top-4 left-0 right-0 z-40 px-4 flex justify-center md:justify-end items-start pointer-events-none">
        
        {/* CENTER: TOGGLE */}
        {!isSearchOpen && (
            <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center bg-black/40 backdrop-blur-xl rounded-full p-1 border border-white/10 shadow-2xl z-50">
                <button 
                    onClick={() => setActiveTab("general")}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                        activeTab === "general" 
                        ? "bg-slate-800 text-white shadow-sm" 
                        : "text-slate-400 hover:text-white"
                    }`}
                >
                    General
                </button>
                <button 
                    onClick={() => setActiveTab("friends")}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                        activeTab === "friends" 
                        ? "bg-slate-800 text-white shadow-sm" 
                        : "text-slate-400 hover:text-white"
                    }`}
                >
                    Friends
                </button>
            </div>
        )}

        {/* RIGHT: SEARCH BAR */}
        <div className="pointer-events-auto ml-auto flex justify-end min-w-[40px] z-50">
            <div 
                ref={searchContainerRef}
                className={`h-10 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center overflow-hidden shadow-lg`}
                style={{ width: '40px' }} 
            >
                {isSearchOpen ? (
                    <div className="flex items-center w-full gap-2">
                         <input
                            ref={searchInputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search user..."
                            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-slate-500"
                        />
                        <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}>
                            <X size={16} className="text-slate-400 hover:text-white" />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white">
                        <Search size={20} />
                    </button>
                )}
            </div>
        </div>
      </header>

      {/* --- FEED (SNAP SCROLL) --- */}
      <div className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        {posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>

    </div>
  );
}

// --- INDIVIDUAL POST COMPONENT ---
function FeedPost({ post }) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const heartRef = useRef(null);

  const toggleLike = () => {
    if (!liked) {
      setLikesCount(p => p + 1);
      gsap.fromTo(heartRef.current, 
        { scale: 0.8 }, 
        { scale: 1.2, duration: 0.3, ease: "back.out(2.5)" }
      );
    } else {
      setLikesCount(p => p - 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="h-full w-full snap-start relative flex items-center justify-center bg-slate-950 border-b border-slate-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-950 to-black z-0 pointer-events-none"></div>

      {/* --- MAIN POST CARD --- */}
      <div className="relative z-10 w-full max-w-[500px] px-4">
        
        {/* Post Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* 1. Header: User Info */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-red-500 to-orange-500">
                        <img src={post.user.avatar} alt={post.user.name} className="w-full h-full rounded-full border-2 border-slate-900 object-cover" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm leading-tight">{post.user.name}</h3>
                        <p className="text-xs text-slate-400">Suggested for you</p>
                    </div>
                </div>
                <button className="text-slate-400 hover:text-white transition">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* 2. Content Body */}
            <div className="bg-black/20 min-h-[250px] flex flex-col justify-center relative">
                {/* Title Overlay */}
                 <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-slate-900/80 to-transparent z-10">
                    <p className="text-sm text-slate-200 font-medium">{post.title}</p>
                </div>

                {post.type === 'snippet' ? (
                    <div className="p-6 pt-12 overflow-x-auto w-full">
                        <pre className="font-mono text-xs md:text-sm text-blue-300 leading-relaxed">
                            <code>{post.code}</code>
                        </pre>
                    </div>
                ) : (
                    <div className="p-12 text-center flex items-center justify-center h-full">
                        <p className="text-xl text-slate-400 italic font-serif">"{post.content}"</p>
                    </div>
                )}
            </div>

            {/* 3. Footer: Actions (BOTTOM ROW) */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
                <div className="flex items-center justify-between">
                    
                    {/* Left Actions (Like, Comment, Share) */}
                    <div className="flex items-center gap-4">
                        <button onClick={toggleLike} className="group flex items-center gap-1.5">
                             <div ref={heartRef}>
                                <Heart size={26} className={`transition-colors ${liked ? "fill-red-500 text-red-500" : "text-slate-300 group-hover:text-red-500"}`} />
                             </div>
                             {likesCount > 0 && <span className="text-sm font-semibold text-slate-300">{likesCount}</span>}
                        </button>

                        <button className="group flex items-center gap-1.5">
                            <MessageCircle size={26} className="text-slate-300 group-hover:text-blue-400 transition-colors" />
                            {post.comments > 0 && <span className="text-sm font-semibold text-slate-300">{post.comments}</span>}
                        </button>

                        <button className="group">
                            <Repeat size={26} className="text-slate-300 group-hover:text-green-400 transition-colors" />
                        </button>
                    </div>

                    {/* Right Actions (Save) */}
                    <div>
                        <button className="group">
                             <Bookmark size={26} className="text-slate-300 group-hover:text-yellow-400 transition-colors" />
                        </button>
                    </div>

                </div>
                
                {/* Time / Likes text */}
                <div className="mt-2 pl-1">
                    <p className="text-[10px] text-slate-500 uppercase font-medium tracking-wide">
                        2 hours ago
                    </p>
                </div>
            </div>

        </div>
      </div>

    </div>
  );
}

export default Explore;