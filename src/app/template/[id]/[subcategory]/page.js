"use client";
import { useState, useEffect } from "react";
import Category from "@/components/category/Category";
import TemplateCard from "@/components/templateCard/TemplateCard";

export default function SubCategory() {
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
         <h1 className="text-center fs-6 mt-11 fw-bolder">SubCategory Templates Loading</h1>
        </div>
      </div>
    </div>
  );
}
