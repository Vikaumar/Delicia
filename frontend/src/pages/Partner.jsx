// src/pages/Partner.jsx
import React, { useState } from "react";

function PartnerForm() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    cuisine: "",
    notes: "",
  });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.size > 5 * 1024 * 1024) {
      setStatus({ loading: false, ok: false, msg: "File too big (>5MB)." });
      return;
    }
    setFile(f);
    setStatus({ loading: false, ok: null, msg: "" });
  };

  const validate = () => {
    if (!form.businessName.trim()) return "Business name required.";
    if (!form.contactName.trim()) return "Contact name required.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      return "Valid email required.";
    if (!form.phone.trim()) return "Phone required.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ loading: false, ok: false, msg: err });

    setStatus({ loading: true, ok: null, msg: "" });
    try {
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (file) fd.append("file", file);

      const res = await fetch(`${API_URL}/api/partner`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Server error");
      }

      setStatus({
        loading: false,
        ok: true,
        msg: "Partner request received. We'll contact you soon.",
      });
      setForm({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        city: "",
        cuisine: "",
        notes: "",
      });
      setFile(null);
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        msg: err.message || "Submission failed",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingTop: "54px",
      }}
      aria-labelledby="partner-form-heading"
    >
      <h2
        id="partner-form-heading"
        style={{ fontSize: "44px", fontWeight: 600, textAlign: "center" }}
      >
        Partner with Delicia
      </h2>
      <p style={{ fontSize: "0.9rem", textAlign: "center", color: "#4B5563" }}>
        Fill this short form and we'll reach out shortly.
      </p>

      {/* Business name */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "#374151",
            paddingTop: "35px",
          }}
        >
          Business name *
        </label>
        <input
          name="businessName"
          value={form.businessName}
          onChange={onChange}
          required
          style={{
            marginTop: "4px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #D1D5DB",
            padding: "12px 16px",
          }}
        />
      </div>

      {/* Contact + Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Contact person *
          </label>
          <input
            name="contactName"
            value={form.contactName}
            onChange={onChange}
            required
            style={{
              marginTop: "4px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              padding: "12px 16px",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            style={{
              marginTop: "4px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              padding: "12px 16px",
            }}
          />
        </div>
      </div>

      {/* Phone + City */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            Phone *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            required
            style={{
              marginTop: "4px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              padding: "12px 16px",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "#374151",
            }}
          >
            City
          </label>
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            style={{
              marginTop: "4px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #D1D5DB",
              padding: "12px 16px",
            }}
          />
        </div>
      </div>

      {/* Cuisine */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          Cuisine
        </label>
        <input
          name="cuisine"
          value={form.cuisine}
          onChange={onChange}
          style={{
            marginTop: "4px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #D1D5DB",
            padding: "12px 16px",
          }}
        />
      </div>

      {/* File */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          Upload menu / deck (optional)
        </label>
        <div
          style={{
            marginTop: "4px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <input
            type="file"
            onChange={handleFile}
            accept=".pdf,.doc,.docx,image/*"
            style={{ fontSize: "0.9rem", color: "#AB162C", cursor: "pointer" }}
            aria-describedby="file-help"
          />
          {file && (
            <div style={{ fontSize: "0.9rem", color: "#374151" }}>
              <span
                style={{
                  display: "inline-block",
                  border: "1px solid #D1D5DB",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  color: "#1F2937",
                }}
              >
                {file.name}
              </span>
            </div>
          )}
        </div>
        <p
          id="file-help"
          style={{ marginTop: "4px", fontSize: "0.75rem", color: "#6B7280" }}
        >
          Max 5MB. PDF, DOC or images accepted.
        </p>
      </div>

      {/* Notes */}
      <div>
        <label
          style={{
            display: "block",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "#374151",
          }}
        >
          Note
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={5}
          style={{
            marginTop: "4px",
            width: "100%",
            borderRadius: "6px",
            border: "1px solid #D1D5DB",
            padding: "12px 16px",
          }}
        />
      </div>

      {/* Status */}
      {(status.ok !== null || status.loading) && (
        <p
          role="status"
          style={{
            fontSize: "0.9rem",
            color: status.ok ? "#059669" : "#DC2626",
          }}
        >
          {status.loading ? "Sending..." : status.msg}
        </p>
      )}

      {/* Submit */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <button
          type="submit"
          disabled={status.loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: status.loading ? "#AB162C" : "#AB162C",
            borderRadius: "50px",
            color: "white",
            fontWeight: 600,
            padding: "12px 24px",
            opacity: status.loading ? 0.6 : 1,
            cursor: status.loading ? "not-allowed" : "pointer",
          }}
        >
          {" "}
          {status.loading ? "Sending..." : "Request partnership"}{" "}
        </button>{" "}
      </div>
    </form>
  );
}

export default function Partner() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "48px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <PartnerForm />
      </div>
    </div>
  );
}
