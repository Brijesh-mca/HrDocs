"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TemplatePage() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    fetch("/templates.json")
      .then((res) => res.json())
      .then((data) => {
        const foundTemplate = data.find((item) => item.id === id);
        setTemplate(foundTemplate);
      });
  }, [id]);

  if (!template) {
    return <p className="p-6 text-red-500">Loading template details...</p>;
  }

  return (
    <div className="p-6 text-center flex flex-col justify-content-center align-content-center"  >
      <h1 className="text-2xl font-bold">{template.title}</h1>
      <p className="text-gray-600">{template.description}</p>
      <Image
        src={template.image}
        alt={template.title}
        width={400}
        height={250}
        className="rounded-lg mt-4 self-center"
      />
      <p className="text-sm text-gray-500 mt-2">Last modified: {template.modified}</p>
    </div>
  );
}
