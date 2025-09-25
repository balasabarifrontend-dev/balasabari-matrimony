// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function UpgradePage() {
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:8080/api/plans")
//       .then((res) => setPlans(res.data))
//       .catch((err) => console.error("Error fetching plans:", err));
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-8 text-red-700">
//         Upgrade Your Membership
//       </h1>

//       <div className="grid md:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className="border p-6 rounded-lg shadow-lg bg-white text-center hover:scale-105 transition"
//           >
//             <h2 className="text-2xl font-bold text-red-600">{plan.name}</h2>
//             <p className="mt-2 text-lg">{plan.price}</p>

//             <ul className="mt-4 space-y-2 text-gray-600">
//               {plan.features.split(",").map((f, idx) => (
//                 <li key={idx}>✔ {f}</li>
//               ))}
//             </ul>

//             <button className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
//               Choose {plan.name}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { mockPlans } from "../config/mockData";

export default function UpgradePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPlans(mockPlans);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-red-700">
        Upgrade Your Membership
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading plans...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border p-6 rounded-lg shadow-lg bg-white text-center hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold text-red-600">{plan.name}</h2>
              <p className="mt-2 text-lg">{plan.price}</p>

              <ul className="mt-4 space-y-2 text-gray-600">
                {plan.features.split(",").map((f, idx) => (
                  <li key={idx}>✔ {f}</li>
                ))}
              </ul>

              <button className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

