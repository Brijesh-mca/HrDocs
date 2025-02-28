"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, Save } from "lucide-react";

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
    <div className="border rounded-xl p-5 shadow-lg hover:shadow-xl hover:bg-teal-50 transition bg-white w-full max-w-md">
      {/* Image */}
      {/* <div className="rounded-lg overflow-hidden">
        <Image
          src={template.image}
          alt={template.title}
          width={400}
          height={200}
          className="rounded-lg w-full"
        />
      </div> */}

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
            className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1 mt-2 hover:bg-green-600"
          >
            <Save size={16} /> Save
          </button>
        </div>
      ) : (
        // Normal View Mode
        <>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{template.title}</h3>
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              {template.category}
            </span>
          </div>

          <p className="text-xs text-gray-400 mt-1">📅 Modified {template.modified}</p>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 justify-between items-center">
            <Link href={`/template/${template.id}`}>
              <button className="bg-blue-600 text-white text-sm px-4 py-2  hover:bg-blue-800">
                🔄 Generate
              </button>
            </Link>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-600 text-sm flex items-center gap-1 p-2 hover:text-gray-800 "
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDelete(template.id)}
                className="text-red-500 text-sm flex items-center gap-1 p-2 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
