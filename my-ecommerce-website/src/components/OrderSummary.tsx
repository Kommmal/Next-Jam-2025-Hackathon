import React from 'react';
import { FaTag } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

// Define the prop types
interface OrderSummaryProps {
  calculateSubtotal: () => number;
  discount: number;
  deliveryFee: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ calculateSubtotal, discount, deliveryFee, total }) => {
  return (
    <div className="lg:w-[40%]">
      <div className="flex flex-col gap-5 px-5 py-5 w-full border-2 rounded-[20px]">
        <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>
        <div className="flex justify-between">
          <p>Subtotal:</p>
          <p>${calculateSubtotal()}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount (-20%):</p>
          <p>-${discount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Fee:</p>
          <p>${deliveryFee}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total:</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div className="flex gap-3">
          <button className="w-[70%] border text-gray-500 py-2 px-2 rounded-[40px] flex gap-2">
            <FaTag size={20} /> Add promo code
          </button>
          <button className="w-[30%] border-2 border-black bg-black text-white rounded-[20px] py-2">
            Apply
          </button>
        </div>
        <Link href="/Checkout">
          <button className="w-full border-2 border-black bg-black text-white rounded-[20px] flex justify-center py-2 gap-2">
            Go to Checkout <FiArrowRight size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
