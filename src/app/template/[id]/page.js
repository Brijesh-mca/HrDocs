"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TemplatePage() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    date: "", // Added date field
  });
  const previewRef = useRef(null);

  useEffect(() => {
    fetch("/templates.json")
      .then((res) => res.json())
      .then((data) => {
        const foundTemplate = data.find((item) => item.id === id);
        setTemplate(foundTemplate);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDownloadPDF = () => {
    if (previewRef.current) {
      html2canvas(previewRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 180, 120);
        pdf.save("template.pdf");
      });
    }
  };

  if (!template) {
    return <p className="p-6 text-red-500">Loading template details...</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Form Section */}
      <div className="mb-6 w-full max-w-md p-4 border border-gray-300 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Fill Details</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full p-2 mb-2 border rounded"
        />
        {/* Date Input Field */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
      </div>

      {/* Preview Section */}
      <div ref={previewRef} className="p-6 border bg-blue-100 text-blue-900 border-gray-400 rounded-lg shadow-lg  w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold">{template.title}</h1>
        <p className="text-gray-600">{template.description}</p>
        {/* <Image src={template.image} alt={template.title} width={400} height={250} className="rounded-lg mt-4" /> */}
        <p className="text-gray-500 mt-2">Name: {formData.name || "Your Name"}</p>
        <p className="text-gray-500">Email: {formData.email || "your@email.com"}</p>
        <p className="text-gray-500">Company: {formData.company || "Your Company"}</p>
        {/* Display Date in Preview */}
        <p className="text-gray-500">Date: {formData.date || "Select a date"}</p>
        <p className="text-sm text-gray-500 mt-2">Last modified: {template.modified}</p>
      </div>

      {/* Download PDF Button */}
      <button onClick={handleDownloadPDF} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Download PDF
      </button>
    </div>
  );
}
