"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg hover:bg-teal-100 transition bg-white">
      {/* Image */}
      <Image
        src={template.image}
        alt={template.title}
        width={400}
        height={200}
        className="rounded-md"
      />

      {/* Edit Mode */}
      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            name="title"
            value={editedTemplate.title}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
          <textarea
            name="description"
            value={editedTemplate.description}
            onChange={handleChange}
            className="border p-1 rounded w-full mt-2"
          />
          <button onClick={handleSave} className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg mt-2">
            ✅ Save
          </button>
        </div>
      ) : (
        // Normal View Mode
        <>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">{template.title}</h3>
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              {template.category}
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1">📅 Modified {template.modified}</p>

          {/* Buttons */}
          <div className="flex gap-2 mt-3 justify-between">
            <Link href={`/template/${template.id}`}>
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg">
                🔄 Generate
              </button>
            </Link>
            <button onClick={() => setIsEditing(true)} className="text-gray-500 text-sm">
              ✏️
            </button>
            <button onClick={() => onDelete(template.id)} className="text-gray-500 text-sm">
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}
