"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 rounded-lg shadow-md hover:shadow-xl transition"
          >
            Sign In
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
