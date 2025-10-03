import React from "react";

export default function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  textarea = false,
  required = false,
}) {
  return (
    <div className="relative w-full">
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      )}

      <label
        className={`absolute left-3 text-gray-400 text-base transition-all
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
          peer-focus:top-1.5 peer-focus:text-red-500 peer-focus:text-sm
          ${value ? "top-1.5 text-red-500 text-sm" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}
