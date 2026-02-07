import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { logoutService } from "../../services/auth.services";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  LayoutDashboard, 
  LogOut, 
  Swords, // For Challenges
  ChevronDown ,
  BarChart2
} from "lucide-react";

function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useUserContext();

  const logOutHandler = async () => {
    try {
      await logoutService();
    } finally {
      logout();
      setOpen(false);
      navigate('/explore');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative nav-anim z-50" ref={dropdownRef}>
      {/* Trigger */}
      <button 
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        <div className="relative">
             <img
                src={user?.avatar?.url}
                alt="avatar"
                className={`w-9 h-9 rounded-full object-cover border-2 transition-all ${open ? "border-red-500" : "border-slate-700 group-hover:border-slate-500"}`}
            />
        </div>
        <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/50">
            <p className="text-sm text-white font-bold truncate">{user?.fullName}</p>
            <p className="text-xs text-slate-500 truncate">@{user?.username}</p>
          </div>

          <div className="py-1">
            {/* Moved Dashboard Here */}
            <DropdownItem 
                to="/user/dashboard" 
                icon={LayoutDashboard} 
                label="Dashboard" 
                onClick={() => setOpen(false)} 
            />
            <DropdownItem 
                to={`user/profile/${user.username}`} 
                icon={User} 
                label="My Profile" 
                onClick={() => setOpen(false)} 
            />
            
            <DropdownItem 
                to="/public/leaderboard" 
                icon={BarChart2} 
                label="Leader Board" 
                onClick={() => setOpen(false)} 
            />

            {/* Challenge (Future) */}
            <div className="group relative px-4 py-2 flex items-center gap-3 text-slate-500 cursor-not-allowed hover:bg-slate-800/50">
               <Swords size={16} />
               <span className="text-sm font-medium">Challenges</span>
               <span className="ml-auto text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">Soon</span>
            </div>
          </div>

          <div className="border-t border-slate-800 p-1">
            <button
                onClick={logOutHandler}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
            >
                <LogOut size={16} />
                Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const DropdownItem = ({ to, icon: Icon, label, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
    >
      <Icon size={16} />
      {label}
    </NavLink>
);

export default ProfileDropdown;