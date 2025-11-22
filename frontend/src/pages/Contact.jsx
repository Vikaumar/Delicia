import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    contactMethod: "Email",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingTop: "114px",
        paddingBottom: "80px",
      }}
      aria-labelledby="partner-form-heading"
    >
      <h2  id="partner-form-heading" style={{ fontSize: "34px", fontWeight: "600",textAlign: "center",paddingBottom:"20px" }}>Send us a message</h2>

      {/* Row 1: Name + Email */}
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
            required
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
            required
          />
        </div>
      </div>

      {/* Row 2: Phone + Order */}
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
            Order Number <span style={{ color: "#777" }}>(optional)</span>
          </label>
          <input
            type="text"
            name="orderNumber"
            placeholder="#12345"
            value={formData.orderNumber}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>
      </div>

      {/* Preferred Contact */}
      <div>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
          Preferred Contact Method
        </label>
        <select
          name="contactMethod"
          value={formData.contactMethod}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        >
          <option>Email</option>
          <option>Phone</option>
          <option>WhatsApp</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "500" }}>
          Message *
        </label>
        <textarea
          name="message"
          placeholder="Tell us how we can help you..."
          value={formData.message}
          onChange={handleChange}
          style={{
            width: "100%",
            minHeight: "120px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        style={{
          backgroundColor: "#AB162C",
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "50px",
          fontWeight: "600",
          fontSize: "16px",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        Send Message
      </button>
    </form>
  );
}
