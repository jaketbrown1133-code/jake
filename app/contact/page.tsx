"use client";

import { useState, FormEvent } from "react";

const budgetRanges = [
  "Under $10,000",
  "$10,000 – $15,000",
  "$15,000 – $20,000",
  "$20,000 – $30,000",
  "$30,000+",
];

const spaceTypes = [
  "Backyard / Garden",
  "Rooftop / Terrace",
  "Pool Deck",
  "Patio / Deck",
  "Commercial / Restaurant",
  "Other",
];

const boroughs = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "The Bronx",
  "Staten Island",
  "Long Island",
  "Westchester",
  "Hamptons",
  "Other",
];

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  borough: string;
  spaceType: string;
  width: string;
  length: string;
  budget: string;
  features: string[];
  notes: string;
};

const FEATURES = [
  "Integrated LED Lighting",
  "Power Outlets in Columns",
  "Rain Sensors",
  "Wind Sensors",
  "Smart Home Integration",
  "Wall-Mounted Attachment",
  "Custom Color Finish",
  "Heaters",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    borough: "",
    spaceType: "",
    width: "",
    length: "",
    budget: "",
    features: [],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const toggleFeature = (feat: string) => {
    setForm((f) => ({
      ...f,
      features: f.features.includes(feat)
        ? f.features.filter((x) => x !== feat)
        : [...f.features, feat],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#050608" }}
      >
        <div className="text-center max-w-lg">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-8"
            style={{ background: "rgba(0,229,204,0.1)", border: "1px solid rgba(0,229,204,0.3)" }}
          >
            ✓
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            <span className="led-text">We&apos;ll be in touch.</span>
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you, {form.firstName}. A Pergola Tech Pros specialist will reach out within 24 hours to schedule your free consultation.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 rounded text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-all focus:ring-1";
  const inputStyle = {
    background: "#0d0e14",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#f0f0f5",
  };
  const inputFocusStyle = { ringColor: "#00e5cc" };

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,229,204,0.06) 0%, transparent 70%), #050608",
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#00e5cc" }}>
          Free Consultation
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-3 mb-4">
          Get Your <span className="led-text">Free Quote</span>
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Fill out the form below and we&apos;ll reach out within 24 hours to schedule your on-site consultation — completely free, no obligation.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 pb-24">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Personal info */}
          <fieldset
            className="rounded-xl p-6 space-y-5"
            style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              Contact Information
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">First Name *</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  placeholder="Jake"
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  placeholder="Brown"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="(555) 000-0000"
                  className={inputClass}
                  style={inputStyle}
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Location */}
          <fieldset
            className="rounded-xl p-6 space-y-5"
            style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              Property Location
            </legend>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Street Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="123 Main Street, Apt 4B"
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Borough / Area *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {boroughs.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => set("borough", b)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all"
                    style={{
                      background: form.borough === b ? "rgba(0,229,204,0.12)" : "rgba(255,255,255,0.03)",
                      border: form.borough === b
                        ? "1px solid rgba(0,229,204,0.4)"
                        : "1px solid rgba(255,255,255,0.07)",
                      color: form.borough === b ? "#00e5cc" : "#888",
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>

          {/* Space info */}
          <fieldset
            className="rounded-xl p-6 space-y-5"
            style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              Space Details
            </legend>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Space Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {spaceTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("spaceType", t)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all"
                    style={{
                      background: form.spaceType === t ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.03)",
                      border: form.spaceType === t
                        ? "1px solid rgba(168,85,247,0.4)"
                        : "1px solid rgba(255,255,255,0.07)",
                      color: form.spaceType === t ? "#a855f7" : "#888",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Approximate Width (ft)</label>
                <input
                  type="number"
                  value={form.width}
                  onChange={(e) => set("width", e.target.value)}
                  placeholder="14"
                  min="6"
                  max="100"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Approximate Length (ft)</label>
                <input
                  type="number"
                  value={form.length}
                  onChange={(e) => set("length", e.target.value)}
                  placeholder="18"
                  min="6"
                  max="100"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
          </fieldset>

          {/* Features */}
          <fieldset
            className="rounded-xl p-6 space-y-4"
            style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              Features You&apos;re Interested In
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FEATURES.map((feat) => {
                const sel = form.features.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all"
                    style={{
                      background: sel ? "rgba(59,130,246,0.12)" : "rgba(255,255,255,0.03)",
                      border: sel ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.07)",
                      color: sel ? "#3b82f6" : "#888",
                    }}
                  >
                    {sel ? "✓ " : ""}{feat}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Budget */}
          <fieldset
            className="rounded-xl p-6 space-y-4"
            style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              Budget Range
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {budgetRanges.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => set("budget", b)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-left transition-all"
                  style={{
                    background: form.budget === b ? "rgba(0,229,204,0.1)" : "rgba(255,255,255,0.03)",
                    border: form.budget === b
                      ? "1px solid rgba(0,229,204,0.35)"
                      : "1px solid rgba(255,255,255,0.07)",
                    color: form.budget === b ? "#00e5cc" : "#888",
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Notes */}
          <div
            className="rounded-xl p-6"
            style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Additional Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={4}
              placeholder="Tell us anything else — timeline, existing structures, design preferences..."
              className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none"
              style={{ ...inputStyle, lineHeight: "1.6" }}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-lg text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity shadow-xl"
          >
            Submit Quote Request →
          </button>

          <p className="text-center text-xs text-gray-600">
            No obligation. We&apos;ll follow up within 24 hours.
          </p>
        </form>
      </section>
    </>
  );
}
