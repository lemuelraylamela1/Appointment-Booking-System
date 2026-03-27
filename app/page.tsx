"use client";

import Link from "next/link";
import {
  ArrowRight,
  Stethoscope,
  Heart,
  UserCheck,
  Activity,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "General Consultation",
    description: "Regular check-ups and consultations for your overall health.",
    icon: <Stethoscope className="w-10 h-10 text-teal-600" />,
  },
  {
    title: "Pediatrics",
    description: "Specialized care for children and infants.",
    icon: <UserCheck className="w-10 h-10 text-teal-600" />,
  },
  {
    title: "Cardiology",
    description: "Heart health assessments and monitoring.",
    icon: <Heart className="w-10 h-10 text-teal-600" />,
  },
  {
    title: "Physiotherapy",
    description: "Physical therapy and rehabilitation services.",
    icon: <Activity className="w-10 h-10 text-teal-600" />,
  },
];

export default function Home() {
  // Smooth scroll handler
  const scrollToServices = () => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: "url('/assets/hero-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />

        <div className="relative z-10 w-full px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight drop-shadow-lg">
              Book Your Appointment <br />
              <span className="text-teal-700">Hassle-Free</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-lg text-slate-800">
              Quickly find and book the best doctors for your needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/book"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-teal-600/40 flex justify-center items-center gap-2 transform hover:-translate-y-1">
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Smooth scroll button */}
              <button
                onClick={scrollToServices}
                className="bg-white/80 hover:bg-white/90 text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md flex justify-center items-center hover:-translate-y-1 hover:shadow-lg">
                Explore Services
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mb-4">
            Our Services
          </h2>
          <p className="text-slate-600 mb-12">
            Choose from a variety of services to meet your health needs.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-teal-300/40 transition-all duration-300 flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-teal-700 py-20 relative overflow-hidden">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to prioritize your health?
          </h2>
          <p className="text-teal-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Booking an appointment takes less than 2 minutes. Get instant
            confirmation and a reference code for easy tracking.
          </p>
          <Link
            href="/book"
            className="inline-flex bg-white text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors items-center gap-2 shadow-xl">
            Book Your Visit Now
            <Calendar className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
