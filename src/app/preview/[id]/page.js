"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TemplatePreviewPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const previewRef = useRef(null);
  const [template, setTemplate] = useState(null);

  // Extract user input from query parameters
  const formData = {
    name: searchParams.get("name") || "Your Name",
    email: searchParams.get("email") || "your@email.com",
    company: searchParams.get("company") || "Your Company",
    date: searchParams.get("date") || "Select a date",
  };

  useEffect(() => {
    fetch("/templates.json")
      .then((res) => res.json())
      .then((data) => {
        const foundTemplate = data.find((item) => item.id === id);
        setTemplate(foundTemplate);
      });
  }, [id]);

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
      <div
        ref={previewRef}
        className="p-6 border bg-blue-100 text-blue-900 border-gray-400 rounded-lg shadow-lg w-full max-w-lg text-center"
      >
        <h1 className="text-2xl font-bold">{template.title}</h1>
        <p className="text-gray-600">{template.description}</p>
        <Image
          src={template.image}
          alt={template.title}
          width={400}
          height={250}
          className="rounded-lg mt-4"
        />
        <p className="text-gray-500 mt-2">Name: {formData.name}</p>
        <p className="text-gray-500">Email: {formData.email}</p>
        <p className="text-gray-500">Company: {formData.company}</p>
        <p className="text-gray-500">Date: {formData.date}</p>
        <p className="text-sm text-gray-500 mt-2">Last modified: {template.modified}</p>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Download PDF
      </button>
    </div>
  );
}
