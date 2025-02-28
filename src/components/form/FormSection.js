"use client";
export default function FormSection({ formData, handleChange }) {
  return (
    <div className="mb-6 w-full max-w-md p-4 border border-gray-300 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Fill Details</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter your name"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Enter company name"
        className="w-full p-2 mb-2 border rounded"
      />
    </div>
  );
}
