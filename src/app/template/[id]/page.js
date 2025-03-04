"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function TemplatePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [template, setTemplate] = useState(""); // Store HTML template
  const [previewTemplate, setPreviewTemplate] = useState(""); // Store preview HTML

  // Load HTML template from public folder
  useEffect(() => {
    fetch("/offer.html")
      .then((res) => res.text())
      .then((html) => setTemplate(html))
      .catch((error) => console.error("Error loading template:", error));
  }, []);

  // Function to update preview when button is clicked
  const handlePreview = () => {
    const updatedTemplate = template
      .replace(/{{name}}/g, name || "Your Name")
      .replace(/{{date}}/g, date);

    setPreviewTemplate(updatedTemplate);
  };

  const handleDownload = async () => {
    if (!name) {
      alert("Please enter a name!");
      return;
    }

    window.open(
      `/api/convert-pdf?id=${id}&name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`,
      "_blank"
    );
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {/* ✅ LEFT: FORM */}
      <div style={{ width: "30%", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9" }}>
        <h2>Fill Details</h2>
        <label>
          Name:{" "}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "8px",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginTop: "5px",
            }}
          />
        </label>
        <button
          onClick={handlePreview}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Preview
        </button>
        <button
          onClick={handleDownload}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Download PDF
        </button>
      </div>

      {/* ✅ RIGHT: LIVE PREVIEW (Only Shows After Clicking "Preview") */}
      <div style={{ width: "70%", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff" }}>
        <h2>Live Preview</h2>
        {previewTemplate ? (
          <div
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              maxHeight: "500px",
              overflowY: "auto",
              background: "#f1f1f1",
            }}
            dangerouslySetInnerHTML={{ __html: previewTemplate }}
          />
        ) : (
          <p style={{ color: "gray" }}>Click "Preview" to see the template.</p>
        )}
      </div>
    </div>
  );
}
