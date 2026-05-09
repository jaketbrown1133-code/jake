"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

export default function QuoteForm() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", town: "", interest: "", message: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Quote request:", form);
    setSubmitted(true);
  };

  const inputStyle = {
    background: "#1e1e1e",
    border: "1px solid rgba(201,168,76,0.15)",
    color: "#f5f0e8",
    fontFamily: "var(--font-sans)",
    fontSize: "0.875rem",
    padding: "0.85rem 1rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "rgba(245,240,232,0.4)",
    fontFamily: "var(--font-sans)",
    marginBottom: "0.5rem",
  };

  return (
    <section
      id="quote"
      ref={ref}
      className="py-28 px-6 lg:px-10 relative overflow-hidden"
      style={{ background: "#111111" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
            >
              Free Consultation
            </span>
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
          </div>
          <h2
            className="text-6xl lg:text-7xl leading-tight mb-4"
            style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            Ready to go{" "}
            <em className="not-italic" style={{ color: "#c9a84c" }}>
              Undercover?
            </em>
          </h2>
          <p
            className="text-base leading-relaxed max-w-lg mx-auto"
            style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sans)" }}
          >
            We visit your property, design your pergola in 3D, and provide a full quote —
            completely free, no commitment required. Most installs happen within 6–8 weeks of signing.
          </p>
        </motion.div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="gold-border-spin p-1 rounded-none"
          >
            <div
              className="p-10"
              style={{ background: "#181818" }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                    style={{ border: "1px solid #c9a84c", background: "rgba(201,168,76,0.08)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                      <path d="M5 14 L11 20 L23 8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3
                    className="text-3xl mb-3"
                    style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)" }}
                  >
                    We&apos;ll be in touch.
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sans)" }}
                  >
                    Thank you, {form.name || "there"}. Expect a call or email within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Smith"
                        style={inputStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.15)"; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@email.com"
                        style={inputStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.15)"; }}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="(845) 555-0100"
                        style={inputStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.15)"; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Town / City *</label>
                      <input
                        type="text"
                        required
                        value={form.town}
                        onChange={set("town")}
                        placeholder="Rhinebeck, NY"
                        style={inputStyle}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                        onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "rgba(201,168,76,0.15)"; }}
                      />
                    </div>
                  </div>

                  {/* Interest */}
                  <div>
                    <label style={labelStyle}>What Are You Interested In?</label>
                    <select
                      value={form.interest}
                      onChange={set("interest")}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => { (e.target as HTMLSelectElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                      onBlur={(e) => { (e.target as HTMLSelectElement).style.borderColor = "rgba(201,168,76,0.15)"; }}
                    >
                      <option value="">Select one…</option>
                      <option value="residential">Residential Pergola</option>
                      <option value="commercial">Commercial / Restaurant</option>
                      <option value="both">Both / Not Sure Yet</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Tell Us About Your Space</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Describe your project — size, location, how you plan to use it, any questions…"
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                      onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = "rgba(201,168,76,0.15)"; }}
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full text-center" style={{ display: "block" }}>
                    Request My Free Consultation
                  </button>

                  <p
                    className="text-center text-xs mt-3"
                    style={{ color: "rgba(245,240,232,0.25)", fontFamily: "var(--font-sans)" }}
                  >
                    No commitment. We&apos;ll contact you within 1 business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
