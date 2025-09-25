// // src/components/ui/Button.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// export default function Button({
//   children,
//   variant = "primary",
//   as = "button",
//   to,
//   className = "",
//   ...props
// }) {
//   const base =
//     "px-4 py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

//   const variants = {
//     primary: "bg-red-600 text-white hover:bg-red-700",
//     secondary: "bg-yellow-400 text-red-900 hover:bg-yellow-500",
//     outline:
//       "border border-yellow-400 text-white hover:bg-yellow-400 hover:text-red-900",
//     ghost: "text-gray-700 hover:bg-gray-100",
//   };

//   const styles = `${base} ${variants[variant] || ""} ${className}`;

//   if (as === "link" && to) {
//     return (
//       <Link to={to} className={styles} {...props}>
//         {children}
//       </Link>
//     );
//   }

//   return (
//     <button className={styles} {...props}>
//       {children}
//     </button>
//   );
// }

// src/components/ui/Button.jsx
import React from "react";

export default function Button({ children, variant = "primary", fullWidth, className = "", ...props }) {
  const base = "px-4 py-2 rounded font-medium transition";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      {...props} // ✅ Spread props last, no fullWidth leakage
      className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
