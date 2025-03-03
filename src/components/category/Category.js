"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Category() {
  const [openCategory, setOpenCategory] = useState(null);

  // Category Data with Font Awesome Icons
  const categories = [
    {
      name: "All",
      icon: <i className="fa-solid fa-folder-open text-xl text-blue-500"></i>,
      subcategories: [
        "Internship Certificate",
        "Appreciation Certificate",
        "Workshop Completion",
        "Offer Letter",
        "Appointment Letter",
        "Relieving Letter",
        "Exit Interview Form",
        "Warning Letter",
        "Performance Reports",
      ],
    },
    {
      name: "Certificates",
      icon: <i className="fa-solid fa-file-alt text-xl text-blue-500"></i>,
      subcategories: [
        "Internship Certificate",
        "Appreciation Certificate",
        "Workshop Completion",
      ],
    },
    {
      name: "Employment",
      icon: <i className="fa-solid fa-briefcase text-xl text-green-500"></i>,
      subcategories: ["Offer Letter", "Appointment Letter", "Relieving Letter"],
    },
    {
      name: "HR Documents",
      icon: <i className="fa-solid fa-users text-xl text-purple-500"></i>,
      subcategories: [
        "Exit Interview Form",
        "Warning Letter",
        "Performance Reports",
      ],
    },
    {
      name: "Others",
      icon: <i className="fa-solid fa-id-badge text-xl text-orange-500"></i>,
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
              <span className="flex items-center gap-2 text-md font-semibold">
                {category.icon} <span className="whitespace-nowrap">{category.name}</span>
              </span>
              <i
                className={`fa-solid ${
                  openCategory === index ? "fa-chevron-up" : "fa-chevron-down"
                } text-gray-500`}
              ></i>
            </button>

            {/* Subcategories */}
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
                  animate={
                    openCategory === index
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -10 }
                  }
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 text-md font-semibold pl-2 py-1"
                >
                  <i className="fa-solid fa-circle-arrow-right text-lg text-blue-500"></i>
                  <span className="whitespace-nowrap">
                    <Link href={`/template/${category.name.toLowerCase()}/${sub.toLowerCase()}`}>
                      {sub}
                    </Link>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
