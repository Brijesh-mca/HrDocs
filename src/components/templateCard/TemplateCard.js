"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Save, Trash } from "lucide-react";

export default function TemplateCard({ template, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState({ ...template });

  // Handle input changes
  const handleChange = (e) => {
    setEditedTemplate({ ...editedTemplate, [e.target.name]: e.target.value });
  };

  // Save the edited template
  const handleSave = () => {
    onEdit(editedTemplate);
    setIsEditing(false);
  };

  return (
    <div className="border-4 rounded-xl p-5 shadow-lg transition bg-white w-full max-w-md hover:shadow-xl">
      {/* Image */}
      <div className="rounded-lg overflow-hidden">
        <Image
          src={template.image}
          alt={template.title}
          width={400}
          height={100}
          className="rounded-lg"
        />
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            name="title"
            value={editedTemplate.title}
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <textarea
            name="description"
            value={editedTemplate.description}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1 mt-2 hover:bg-green-600 transition"
          >
            <Save size={16} /> Save
          </button>
        </div>
      ) : (
        // Normal View Mode
        <>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{template.title}</h3>
          </div>
          <div className="flex justify-between">
            <p className="text-xs text-gray-600 mt-1">
              📅 Modified {template.modified}
            </p>
            <span className="text-sm text-gray-700 px-2 py-1 rounded">
              {template.category}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 justify-between items-center">
            <Link href={`/template/${template.id}`}>
            <button className="bg-blue-600 rounded-lg text-white font-bold text-sm px-4 py-2 hover:bg-blue-700 transition flex items-center gap-2">
            <i className="fa-solid fa-file-export"></i> Generate
              </button>
            </Link>
            <div className="flex gap-3">
              {/* Font Awesome Edit Icon */}
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg hover:bg-gray-200 transition"
              >
                <i className="fa-solid fa-pen-to-square text-blue-500 text-lg hover:text-blue-700"></i>
              </button>
              {/* Delete Button */}
              <button
                onClick={() => onDelete(template.id)}
                className="p-2 rounded-lg hover:bg-red-100 transition"
              >
                <i className="fa-solid fa-trash text-red-500 text-lg hover:text-red-700"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
