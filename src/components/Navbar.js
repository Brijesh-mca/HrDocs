"use client"; 
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const homeRef = useRef(null);
  const templatesRef = useRef(null);
  const adminRef = useRef(null);
  const signInRef = useRef(null);

  // Animate Navbar on page load
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Stagger animation for menu items
    gsap.fromTo(
      [homeRef.current, templatesRef.current, adminRef.current, signInRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  // Animate Mobile Menu
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      gsap.fromTo(
        [homeRef.current, templatesRef.current, adminRef.current, signInRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <nav ref={navRef} className="py-6 bg-white shadow-xl">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          HR Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link ref={homeRef} href="/" className="hover:text-gray-700 transition-transform duration-200 transform hover:scale-105">
          Dashboard
          </Link>
          <Link ref={templatesRef} href="/templates" className="hover:text-gray-700 transition-transform duration-200 transform hover:scale-105">
            Templates
          </Link>
          <Link ref={adminRef} href="/admin/templates" className="hover:text-gray-700 transition-transform duration-200 transform hover:scale-105">
          Genrate Documents
          </Link>
          <Link ref={signInRef} href="/signin" className="hover:text-gray-700 transition-transform duration-200 transform hover:scale-105">
          Settings
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link ref={homeRef} href="/" className="hover:text-gray-700 transition-transform duration-200 transform hover:scale-105">
         <User className="w-8 h-8 text-gray-600" />
          </Link>
          <span>User</span>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden focus:outline-none text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div ref={mobileMenuRef} className="md:hidden flex flex-col items-center py-4 bg-slate-400 rounded-lg shadow-md">
          <Link ref={homeRef} href="/" className="py-2 text-lg font-medium hover:text-gray-800 transition-transform duration-200 transform hover:scale-105" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link ref={templatesRef} href="/templates" className="py-2 text-lg font-medium hover:text-gray-800 transition-transform duration-200 transform hover:scale-105" onClick={() => setIsOpen(false)}>
            Templates
          </Link>
          <Link ref={adminRef} href="/admin/templates" className="py-2 text-lg font-medium hover:text-gray-800 transition-transform duration-200 transform hover:scale-105" onClick={() => setIsOpen(false)}>
            Admin
          </Link>
          <Link ref={signInRef} href="/signin" className="py-2 text-lg font-medium hover:text-gray-800 transition-transform duration-200 transform hover:scale-105" onClick={() => setIsOpen(false)}>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
