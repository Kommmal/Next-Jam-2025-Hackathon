// ThankYouPage.tsx
import React from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-[70vh] flex flex-col justify-center items-center">
      <div className="bg-white p-8 shadow-lg rounded-lg text-center">
        <h1 className="text-3xl font-bold text-black mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-700 mb-6">Your order has been successfully placed. You will receive a confirmation email shortly.</p>
        <Link href="/" className="bg-black text-white py-2 px-6 rounded-md ">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Page;
