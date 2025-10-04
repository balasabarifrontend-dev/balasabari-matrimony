import React from "react";

export default function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  textarea = false,
  select = false,
  children, // for <select> options
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
      ) : select ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="peer w-full border rounded-lg px-3 pt-5 pb-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none pr-8"
        >
          {children}
        </select>
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

      {/* Floating Label */}
      <label
        className={`absolute left-3 text-gray-400 text-base transition-all
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
          peer-focus:top-1.5 peer-focus:text-red-500 peer-focus:text-sm
          ${value ? "top-1.5 text-red-500 text-sm" : ""}`}
      >
        {label}
      </label>

      {/* Down arrow for select */}
      {select && (
        <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          ▼
        </div>
      )}
    </div>
  );
}
