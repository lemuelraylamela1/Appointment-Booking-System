"use client";

import { useEffect, useState } from "react";
import { Stethoscope, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-md py-3">
      <div className="flex items-center justify-between px-6 lg:px-20">
        {/* LOGO */}

        <Link href="/" className="flex items-center gap-2 text-teal-700">
          <Stethoscope className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">HealthCare+</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-slate-700 font-medium">
          <a href="#" className="hover:text-teal-700 transition">
            Home
          </a>
          <a href="#" className="hover:text-teal-700 transition">
            Doctors
          </a>
          <a href="#" className="hover:text-teal-700 transition">
            About
          </a>
          <a href="#" className="hover:text-teal-700 transition">
            Contact
          </a>

          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium text-center">
            Book Appointment
          </Link>
        </div>

        {/* MOBILE ICON */}
        <button
          className="md:hidden text-slate-800"
          onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-6 space-y-4 text-slate-700 font-medium">
          <a href="#" className="block">
            Home
          </a>
          <a href="#" className="block">
            Doctors
          </a>
          <a href="#" className="block">
            About
          </a>
          <a href="#" className="block">
            Contact
          </a>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4">
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
