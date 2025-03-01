"use client";
import { useState, useEffect } from "react";
import Category from "@/components/category/Category";
import TemplateCard from "@/components/templateCard/TemplateCard";
import { usePathname } from "next/navigation";

export default function SubCategory() {
  const [templates, setTemplates] = useState([]);
  const pathname = usePathname(); // Get current path
  const segments = pathname.split("/");
  const subCategory = decodeURIComponent(segments.pop()); // Get last part of URL

  useEffect(() => {
    // Fetch JSON data
    fetch("/templates.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter templates based on the subCategory from URL
        const filteredTemplates = data.filter(
          (template) => template.title.toLowerCase() === subCategory.toLowerCase()
        );
        setTemplates(filteredTemplates);
      });
  }, [subCategory]); // Run when subCategory changes

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
      <div className="flex gap-6">
        {/* Category Section */}
        <Category />

        {/* Main Container (Full Width) */}
        <div className="w-4/5">
          <h1 className="text-center text-lg font-bold mt-11">
            {subCategory} Templates
          </h1>

          {templates.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-4">No templates found for {subCategory}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
