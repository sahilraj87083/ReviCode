import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { logoutService } from "../../services/auth.services";
import { useUserContext } from "../../contexts/UserContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  X, 
  LayoutDashboard, 
  User, 
  BarChart2, 
  LogOut, 
  Bell, 
  Users, 
  Swords, // Challenge Icon
  ChevronRight
} from "lucide-react";

function MobileSidebar({ isOpen, onClose, user }) {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const { logout } = useUserContext();
  const navigate = useNavigate();

  useGSAP(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "block" });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: "power3.out" });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(overlayRef.current, { display: "none" }) });
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logoutService();
    } finally {
      logout();
      onClose();
      navigate("/explore");
    }
  };

  return createPortal(
    <>
      <div ref={overlayRef} onClick={onClose} className="fixed inset-0 bg-black/80 z-[9998] hidden opacity-0 md:hidden backdrop-blur-sm"></div>

      <div ref={sidebarRef} className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-slate-950 border-l border-white/10 z-[9999] transform translate-x-full shadow-2xl md:hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-white/5 bg-slate-900/50">
          <h2 className="text-lg font-bold text-white">Menu</h2>
          <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition">
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-6 flex flex-col items-center bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="relative">
              <img src={user?.avatar?.url} alt="avatar" className="w-20 h-20 rounded-full border-2 border-slate-700 p-1 object-cover" />
              <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-950"></div>
          </div>
          <h3 className="text-white font-bold text-xl mt-3">{user?.fullName}</h3>
          <p className="text-slate-400 text-sm">@{user?.username}</p>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
            <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4 mt-2">Account</p>
                
                <SidebarItem to="/user/dashboard" icon={LayoutDashboard} label="Dashboard" onClose={onClose} />
                <SidebarItem to={`user/profile/${user?.username}`} icon={User} label="My Profile" onClose={onClose} />
                <SidebarItem to="/public/leaderboard" icon={BarChart2} label="Leader Board" onClose={onClose} />
                
                {/* Notifications (Mobile Only) */}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                        <Bell size={20} />
                        <span className="font-medium">Notifications</span>
                    </div>
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                </div>
            </div>

            <div className="space-y-1 mt-6">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-4">Discover</p>
                
                <SidebarItem to="/community" icon={Users} label="Community" onClose={onClose} />
                
                {/* Challenges (Future) */}
                <div className="flex items-center justify-between px-4 py-3 text-slate-500 cursor-not-allowed opacity-70">
                    <div className="flex items-center gap-3">
                        <Swords size={20} />
                        <span className="font-medium">Challenges</span>
                    </div>
                    <span className="text-[10px] border border-slate-700 px-1.5 rounded">Soon</span>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-slate-900/30">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium">
                <LogOut size={20} />
                Sign Out
            </button>
        </div>

      </div>
    </>,
    document.body
  );
}

const SidebarItem = ({ to, icon: Icon, label, onClose }) => (
    <NavLink
        to={to}
        onClick={onClose}
        className={({ isActive }) => `
            flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
            ${isActive 
                ? "bg-red-600/10 text-red-500 border border-red-500/20 shadow-sm" 
                : "text-slate-300 hover:bg-slate-900 hover:text-white"
            }
        `}
    >
        <div className="flex items-center gap-3">
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </div>
        <ChevronRight size={16} className="opacity-50" />
    </NavLink>
);

export default MobileSidebar;