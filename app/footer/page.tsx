"use client";

import { Stethoscope, Calendar, Phone, Menu } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="flex items-center gap-2 text-white mb-4">
          <Stethoscope className="w-6 h-6" />
          <span className="font-bold text-lg">HealthCare+</span>
        </div>
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-slate-300">
            We provide a hassle-free way to book appointments with trusted
            doctors. Your health is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-teal-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#services"
                className="hover:text-teal-400 transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                className="hover:text-teal-400 transition-colors">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-teal-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <p className="text-slate-300">
            123 Health Street, Manila, Philippines
          </p>
          <p className="text-slate-300">Phone: +63 912 345 6789</p>
          <p className="text-slate-300">Email: support@healthbooking.com</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} HealthBooking. All rights reserved.
      </div>
    </footer>
  );
}
