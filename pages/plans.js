import React from 'react';

export default function Plans() {
  const plans = [
    {
      title: 'Startup',
      price: '$10/month',
      features: ['Basic Support', '1 Project', '5 GB Storage'],
    },
    {
      title: 'SMB',
      price: '$30/month',
      features: ['Priority Support', '5 Projects', '50 GB Storage'],
    },
    {
      title: 'Mid-Market',
      price: '$60/month',
      features: ['24/7 Support', 'Unlimited Projects', '200 GB Storage'],
    },
    {
      title: 'Enterprise',
      price: 'Contact Us',
      features: ['Dedicated Support', 'Custom Solutions', 'Unlimited Storage'],
    },
  ];

  return (
    <div
    className="pt-32 min-h-screen flex flex-col justify-center items-center text-white px-4 py-10"
    style={{
      backgroundImage: "url(/bg-hero.png)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Choose Your Plan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow transform hover:-translate-y-2"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {plan.title}
            </h2>
            <p className="text-3xl font-extrabold text-[#000f26] mb-6 text-center">
              {plan.price}
            </p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="text-gray-600 flex items-center space-x-2"
                >
                  <span className="w-2.5 h-2.5 bg-[#000f26] rounded-full"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-[#000f26] text-white py-3 rounded-lg font-semibold hover:bg-[#3e5074] cursor-pointer transition-colors">
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}