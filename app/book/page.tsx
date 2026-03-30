"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Calendar as CalendarIcon,
  User,
  Clock,
  Activity,
  Heart,
  Brain,
  Stethoscope,
  Eye,
  Bone,
} from "lucide-react";

// Mock Data
const specialties = [
  { id: "s1", name: "Cardiology", icon: Heart },
  { id: "s2", name: "Neurology", icon: Brain },
  { id: "s3", name: "General Practice", icon: Stethoscope },
  { id: "s4", name: "Pediatrics", icon: Activity },
  { id: "s5", name: "Orthopedics", icon: Bone },
  { id: "s6", name: "Ophthalmology", icon: Eye },
];

const doctors = [
  {
    id: "d1",
    name: "Dr. Sarah Jenkins",
    specialty: "s1",
    img: "https://images.unsplash.com/photo-1592393532405-fb1f165c4a1f?w=200&h=200&fit=crop",
    rating: "4.9",
    experience: "15 Years",
  },
  {
    id: "d2",
    name: "Dr. Michael Chen",
    specialty: "s1",
    img: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?w=200&h=200&fit=crop",
    rating: "4.8",
    experience: "12 Years",
  },
  {
    id: "d3",
    name: "Dr. Emily Taylor",
    specialty: "s2",
    img: "https://images.unsplash.com/photo-1642980597814-d65443cf3f10?w=200&h=200&fit=crop",
    rating: "4.9",
    experience: "10 Years",
  },
  {
    id: "d4",
    name: "Dr. James Wilson",
    specialty: "s3",
    img: "https://images.unsplash.com/photo-1642975967602-653d378f3b5b?w=200&h=200&fit=crop",
    rating: "4.7",
    experience: "8 Years",
  },
];

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
];

// Generate next 14 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export default function Booking() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "",
    doctorId: "",
    date: null as Date | null,
    time: "",
    patientName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const updateForm = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const submitBooking = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const code = `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setReferenceCode(code);
      setIsSubmitting(false);
      setStep(5);
    }, 1500);
  };

  const renderStepIndicator = () => {
    const steps = ["Specialty", "Doctor", "Date & Time", "Details"];
    if (step === 5) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10 rounded-full"></div>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-600 -z-10 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

          {steps.map((label, i) => {
            const isCompleted = step > i + 1;
            const isCurrent = step === i + 1;
            return (
              <div
                key={label}
                className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                    isCompleted
                      ? "bg-teal-600 border-teal-600 text-white"
                      : isCurrent
                        ? "bg-white border-teal-600 text-teal-700 shadow-md"
                        : "bg-white border-slate-300 text-slate-400"
                  }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-semibold hidden md:block ${isCurrent ? "text-teal-700" : "text-slate-500"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Select a Specialty
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {specialties.map((spec) => {
          const isSelected = formData.specialty === spec.id;
          return (
            <button
              key={spec.id}
              onClick={() => updateForm("specialty", spec.id)}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 text-center ${
                isSelected
                  ? "border-teal-600 bg-teal-50 shadow-md shadow-teal-100"
                  : "border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50"
              }`}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                <spec.icon className="w-6 h-6" />
              </div>
              <span
                className={`font-semibold ${isSelected ? "text-teal-900" : "text-slate-700"}`}>
                {spec.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const filteredDoctors = formData.specialty
      ? doctors.filter((d) => d.specialty === formData.specialty)
      : doctors;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Choose a Doctor
        </h2>
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No doctors found
            </h3>
            <p className="text-slate-500">
              We couldn&apos;t find any specialists for this category. Please go
              back and try another.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredDoctors.map((doc) => {
              const isSelected = formData.doctorId === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => updateForm("doctorId", doc.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left ${
                    isSelected
                      ? "border-teal-600 bg-teal-50 shadow-md shadow-teal-100"
                      : "border-slate-200 bg-white hover:border-teal-300"
                  }`}>
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div>
                    <h3
                      className={`font-bold text-lg ${isSelected ? "text-teal-900" : "text-slate-900"}`}>
                      {doc.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">
                      {specialties.find((s) => s.id === doc.specialty)?.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" />{" "}
                        {doc.experience}
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {doc.rating}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderStep3 = () => {
    const dates = generateDates();
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-teal-600" /> Date
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar snap-x">
            {dates.map((date, i) => {
              const isSelected =
                formData.date?.toDateString() === date.toDateString();
              const dayName = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const dayNum = date.getDate();
              const monthName = date.toLocaleDateString("en-US", {
                month: "short",
              });

              return (
                <button
                  key={i}
                  onClick={() => updateForm("date", date)}
                  className={`snap-center shrink-0 w-20 h-24 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? "border-teal-600 bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                      : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50"
                  }`}>
                  <span
                    className={`text-xs font-semibold uppercase ${isSelected ? "text-teal-100" : "text-slate-500"}`}>
                    {dayName}
                  </span>
                  <span className="text-2xl font-bold">{dayNum}</span>
                  <span
                    className={`text-xs ${isSelected ? "text-teal-100" : "text-slate-500"}`}>
                    {monthName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {formData.date && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-teal-600" /> Time
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {timeSlots.map((time) => {
                const isSelected = formData.time === time;
                return (
                  <button
                    key={time}
                    onClick={() => updateForm("time", time)}
                    className={`py-3 px-2 rounded-xl border-2 font-semibold text-sm transition-all text-center ${
                      isSelected
                        ? "border-teal-600 bg-teal-50 text-teal-700 shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-slate-50"
                    }`}>
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Patient Details
      </h2>
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => updateForm("patientName", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateForm("phone", e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateForm("email", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            placeholder="jane@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Reason for Visit (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.reason}
            onChange={(e) => updateForm("reason", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
            placeholder="Briefly describe your symptoms or reason for appointment..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-12 max-w-lg mx-auto">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
        Booking Confirmed!
      </h2>
      <p className="text-slate-600 mb-8 text-lg">
        Thank you, {formData.patientName}. Your appointment with{" "}
        <strong>{doctors.find((d) => d.id === formData.doctorId)?.name}</strong>{" "}
        is scheduled for:
      </p>

      <div className="bg-white p-6 rounded-2xl border-2 border-teal-100 shadow-lg shadow-teal-50/50 mb-8 inline-block text-left w-full relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full -mr-4 -mt-4"></div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Date</p>
            <p className="font-bold text-slate-900">
              {formData.date?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Time</p>
            <p className="font-bold text-slate-900">{formData.time}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-slate-200">
          <p className="text-sm text-slate-500 font-medium mb-2 text-center">
            Your Reference Code
          </p>
          <div className="bg-slate-50 py-3 rounded-xl border border-slate-200 text-center">
            <span className="font-mono text-2xl font-bold tracking-widest text-teal-700">
              {referenceCode}
            </span>
          </div>
          <p className="text-xs text-center text-slate-400 mt-3">
            Please save this code for your records.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link
          href="/"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold transition-colors shadow-sm">
          Return to Home
        </Link>
        <button
          onClick={() => {
            setStep(1);
            setFormData({
              specialty: "",
              doctorId: "",
              date: null,
              time: "",
              patientName: "",
              email: "",
              phone: "",
              reason: "",
            });
          }}
          className="w-full bg-white text-slate-600 hover:bg-slate-50 py-4 rounded-xl font-bold transition-colors border border-slate-200">
          Book Another Appointment
        </button>
      </div>
    </div>
  );

  const canProceed = () => {
    if (step === 1) return formData.specialty !== "";
    if (step === 2) return formData.doctorId !== "";
    if (step === 3) return formData.date !== null && formData.time !== "";
    if (step === 4) return formData.patientName !== "" && formData.phone !== "";
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {step < 5 && (
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Book Appointment
            </h1>
            <p className="text-slate-600 text-lg">
              Fast, easy, and secure scheduling.
            </p>
          </div>
        )}

        <div className="bg-slate-50">
          {renderStepIndicator()}

          <div className="min-h-100">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </div>

          {step < 5 && (
            <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  step === 1
                    ? "opacity-50 cursor-not-allowed text-slate-400"
                    : "text-slate-600 hover:bg-slate-200 bg-slate-100"
                }`}>
                <ChevronLeft className="w-5 h-5" /> Back
              </button>

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
                    !canProceed()
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-teal-600/30"
                  }`}>
                  Next <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={submitBooking}
                  disabled={!canProceed() || isSubmitting}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-sm ${
                    !canProceed() || isSubmitting
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-teal-600/30"
                  }`}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Confirming...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Confirm Booking <CheckCircle2 className="w-5 h-5" />
                    </span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
