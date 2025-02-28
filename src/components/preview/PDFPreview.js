"use client";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PreviewSection({ template, formData, previewRef }) {
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

  return (
    <div ref={previewRef} className="p-6 border border-gray-400 rounded-lg shadow-lg bg-white w-full max-w-lg text-center">
      <h1 className="text-2xl font-bold">{template.title}</h1>
      <p className="text-gray-600">{template.description}</p>
      <Image src={template.image} alt={template.title} width={400} height={250} className="rounded-lg mt-4" />
      <p className="text-gray-500 mt-2">Name: {formData.name || "Your Name"}</p>
      <p className="text-gray-500">Email: {formData.email || "your@email.com"}</p>
      <p className="text-gray-500">Company: {formData.company || "Your Company"}</p>
      <p className="text-sm text-gray-500 mt-2">Last modified: {template.modified}</p>

      {/* Download PDF Button inside Preview Section */}
      <button onClick={handleDownloadPDF} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Download PDF
      </button>
    </div>
  );
}
