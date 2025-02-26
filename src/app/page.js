"use client";
import { useState, useEffect } from "react";
import Category from "@/components/Category";
import TemplateCard from "@/components/TemplateCard";

export default function Home() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // Fetch JSON data 
    fetch("/templates.json")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  // Delete function
  const handleDelete = (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  // Edit function
  const handleEdit = (updatedTemplate) => {
    setTemplates(
      templates.map((template) =>
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    );
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="flex gap-4">
        {/* Category Section (20%) */}
        <div className="text-black p-3 w-1/5 border-r-4 bg-slate-100">
          <Category />
        </div>

        {/* Main Container (80%) */}
        <div className="text-black text-center mx-auto p-6 w-auto">
          <div className="w-4/5 p-6 grid grid-cols-3 gap-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
