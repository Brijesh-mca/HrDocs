"use client";
import { useState, useEffect } from "react";
import Category from "@/components/category/Category";
import TemplateCard from "@/components/templateCard/TemplateCard";

export default function Template() {
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
    <div className="container mx-auto pt-5 px-4">
      <div className="flex gap-6 ">
        {/* Category Section */}
        
      
         <Category />
         
       

        {/* Main Container (Full Width) */}
        <div className="w-4/5">
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
