"use client";
import { useState, useEffect } from "react";
import Category from "@/components/category/Category";
import TemplateCard from "@/components/templateCard/TemplateCard";
import { usePathname } from "next/navigation";

export default function SubCategory() {
  const [templates, setTemplates] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

   {/* Sidebar Toggle Button (Mobile Only) */}
   <button
        className="sm:hidden p-2 bg-blue-500 text-white rounded-md mb-4"
        onClick={() => setIsSidebarOpen(true)}
      >
<i className="fa-solid fa-bars"></i>
      </button>

      {/* Sidebar Overlay (For Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}


      <div className="flex gap-6">
         {/* Sidebar (Mobile & Desktop) */}
              <div
                className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg p-4 z-50 transition-transform transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:relative sm:translate-x-0 sm:block sm:w-1/5`}
              >
                {/* Close Button (Mobile Only) */}
                <button
                  className="sm:hidden text-red-500 font-bold mb-4"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Close
                </button>
         
             <Category />
             
              </div>


        {/* Main Container (Full Width) */}
        <div className="w-4/5">
          <h1 className="text-center text-lg font-bold mt-11">
            {subCategory} Templates
          </h1>

          {templates.length > 0 ? (
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
          ) : (
            <p className="text-center text-gray-500 mt-4">No templates found for {subCategory}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
