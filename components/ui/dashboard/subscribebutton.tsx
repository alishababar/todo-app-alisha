"use client";

import { handleCheckout } from "@/lib/actions/stripe-actions";

export default function SubscribeSection() {
  const handleSubscribe = async (plan: "pro" | "premium") => {
    try {
      const url = await handleCheckout(plan);
      window.location.href = url!;
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-2">Pro Plan</h2>
        <p className="text-gray-500 mb-4">
          Unlimited tasks & better productivity
        </p>

        <button
          onClick={() => handleSubscribe("pro")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          Upgrade to Pro
        </button>
      </div>

      <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
        <p className="text-gray-500 mb-4">
          All Pro features + advanced analytics
        </p>

        <button
          onClick={() => handleSubscribe("premium")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}
