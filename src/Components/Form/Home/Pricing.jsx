import React, { useEffect, useState } from "react";

import useAxios from "../../../hooks/useAxious";
import useAuth from "../../../hooks/useAuth";

const Pricing = () => {
  const {user} =  useAuth()
  const axiosInstance = useAxios()
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      axiosInstance.get(`/users/email/${user?.email}`).then((res) => {
        setCurrentUser(res.data);
      });
    }, [axiosInstance, user]);

  const handleCheckout = async () => {
    const paymentInfo = {
        fee: 15,
        userId: user._id,
        name: user.displayName,
        email: user.email
    }
    const res = await axiosInstance.post("/create-checkout-session",paymentInfo);
    console.log(res.data)
    window.location.href = res.data.url; // Stripe Checkout redirect
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-center text-4xl font-bold mb-6">Upgrade to Premium ⭐</h1>

      {/* Comparison Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Features</th>
              <th className="p-4">Free Plan</th>
              <th className="p-4">Premium Plan</th>
            </tr>
          </thead>

          <tbody>
            <tr><td className="p-4">Lessons you can access</td><td className="p-4">20</td><td className="p-4">Unlimited</td></tr>
            <tr><td className="p-4">Create premium lessons</td><td className="p-4">❌</td><td className="p-4">✔</td></tr>
            <tr><td className="p-4">Ad-Free Experience</td><td className="p-4">❌</td><td className="p-4">✔</td></tr>
            <tr><td className="p-4">Priority Listing</td><td className="p-4">❌</td><td className="p-4">✔</td></tr>
            <tr><td className="p-4">Faster Support</td><td className="p-4">❌</td><td className="p-4">✔</td></tr>
            <tr><td className="p-4">Lifetime Access</td><td className="p-4">❌</td><td className="p-4">✔</td></tr>
            <tr><td className="p-4">Special Premium Badge</td><td className="p-4">❌</td><td className="p-4">⭐</td></tr>
          </tbody>
        </table>
      </div>

      {/* Checkout Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-semibold"
        >
          Upgrade to Premium – ৳1500 (Lifetime)
        </button>
      </div>

    </div>
  );
};

export default Pricing;
