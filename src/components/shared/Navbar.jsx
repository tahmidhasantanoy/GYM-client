"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar bg-base-300 bg-[#000B58] text-white text-xl border-b fixed w-full top-0 z-50 px-5">
      {/* Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <ul className="menu dropdown-content mt-3 p-2 shadow-xl bg-base-100  rounded-box w-52">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <div className="navbar-end">
                <Link href="/login" className="btn btn-primary">
                  Login
                </Link>
              </div>
            </ul>
          )}
        </div>
        {/* <Link href="/" className="btn btn-ghost normal-case text-xl">
          Logo
        </Link> */}
      </div>

      {/* Horizontal Menu for Large Devices */}
      <div className="navbar-center visible  hidden lg:flex lg:justify-between items-center">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost normal-case text-xl">
            Logo
          </Link>
        </div>
        <div className="flex justify-evenly w-[450px]">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="navbar-end">
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>

      {/* End Button */}
      {/* <div className="navbar-end">
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
