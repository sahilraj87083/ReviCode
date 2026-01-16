import { NavLink } from "react-router-dom";
import logo from "../../assets/logo3.png";
import ProfileDropdown from "./HeaderDropDown";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  const isAuthenticated = true;

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          logoRef.current,
          {
            scale: 0.85,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          navRef.current.children,
          {
            y: -10,
            opacity: 0,
            stagger: 0.1,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.3"
        );
    },
    { scope: headerRef }
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50
      bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
      border-b border-slate-700/50 backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <NavLink
          to={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-3"
          ref={logoRef}
        >
          <img
            src={logo}
            alt="ReviClash Logo"
            className="h-12 w-auto object-contain"
          />
          <span className="text-xl font-bold tracking-wide text-slate-100">
            ReviClash
          </span>
        </NavLink>

        {/* NAV */}
        <nav ref={navRef} className="flex items-center gap-6 text-sm">
          {!isAuthenticated ? (
            <>
              <NavLink className="nav-link" to="/explore">
                Explore
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-red-600 hover:bg-red-500
                text-white rounded-md font-semibold transition"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
              <NavLink className="nav-link" to="/collections">Collections</NavLink>
              <NavLink className="nav-link" to="/contests">Contests</NavLink>
              <NavLink className="nav-link" to="/messages">Messages</NavLink>
              <ProfileDropdown user={{}} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
