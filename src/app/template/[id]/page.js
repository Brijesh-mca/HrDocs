"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TemplateFormPage() {
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    date: "",
  });

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

  const handlePreview = () => {
    const query = new URLSearchParams(formData).toString();
    router.push(`/preview/${id}?${query}`);
  };

  if (!template) {
    return <p className="p-6 text-red-500">Loading template details...</p>;
  }

  return (
    <div className="p-6 flex flex-col items-center">
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
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
      </div>

      {/* Preview Button */}
      <button
        onClick={handlePreview}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Preview
      </button>
    </div>
  );
}
