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
        {/* Category Section (Fixed Width) */}
       
          <Category />
        

        {/* Main Container (Full Width) */}
        <div className="w-4/5 text-black text-center pt-10">
          <div className="p-6 grid grid-cols-3 md:grid-cols-4 gap-4">
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
