"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, FileText, Briefcase, Users, BadgeCheck } from "lucide-react";

export default function Category() {
  const [openCategory, setOpenCategory] = useState(null);

  // Category Data
  const categories = [
    {
      name: "Certificates",
      icon: <FileText size={18} />,
      subcategories: ["Internship Certificate", "Appreciation Certificate", "Workshop Completion"],
    },
    {
      name: "Employment",
      icon: <Briefcase size={18} />,
      subcategories: ["Offer Letter", "Appointment Letter", "Relieving Letter"],
    },
    {
      name: "HR Documents",
      icon: <Users size={18} />,
      subcategories: ["Exit Interview Form", "Warning Letter", "Performance Reports"],
    },
    {
      name: "Others",
      icon: <BadgeCheck size={18} />,
      subcategories: ["Virtual ID Card", "Contest Qualification Letter"],
    },
  ];

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <div className="w-1/5 h-screen p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="border-b pb-2">
            {/* Category Button */}
            <button
              className="flex items-center justify-between w-full text-left p-2 rounded-md transition-all duration-300 hover:bg-gray-100"
              onClick={() => toggleCategory(index)}
            >
              <span className="flex items-center gap-2">
                {category.icon} {category.name}
              </span>
              {openCategory === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {/* Subcategories (Now Fully Visible & Aligned) */}
            <motion.ul
              initial={false}
              animate={openCategory === index ? "open" : "closed"}
              variants={{
                open: { height: "auto", opacity: 1, display: "block" },
                closed: { height: 0, opacity: 0, display: "none" },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="pl-6 mt-1 border-l-2 border-gray-300"
            >
              {category.subcategories.map((sub, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={openCategory === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm hover:underline pl-2 py-1 flex items-center gap-2"
                >
                  🔹 <Link href={`/template/${sub}`}>{sub}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
