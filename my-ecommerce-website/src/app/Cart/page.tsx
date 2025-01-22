"use client";
import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";

const Page = () => {
  const {
    cart,
    removeFromCart,
    calculateSubtotal,
    discount,
    deliveryFee,
    total,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return cart.length > 0 ? (
    <div className="w-[90%] mx-auto flex flex-col gap-9 my-10">
      <h1 className="text-sm sm:text-lg">
        <Link href="/">Home</Link> / <Link href="/Cart">Cart</Link>
      </h1>
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold">YOUR CART</h1>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Cart Items */}
        <div className="lg:w-[60%] flex flex-col gap-6 border-2 px-5 py-3 rounded-lg">
          {cart.map((product) => (
            <div key={product._id}>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={124}
                  height={110}
                  loading="lazy"
                  className="w-full sm:w-[20%]"
                />
                <div className="w-full sm:w-[70%] flex flex-col gap-3">
                  <div className="flex justify-between">
                    <h1 className="text-lg sm:text-xl font-semibold">
                      {product.name}
                    </h1>
                    <FaTrash
                      size={20}
                      color="orange"
                      onClick={() => {
                        removeFromCart(product._id);
                      }}
                    />
                  </div>
                  <div>
                    <p>
                      Size: <span className="text-gray-500">{product.sizes}</span>
                    </p>
                    <p>
                      Color: <span className="text-gray-500">{product.colors}</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-xl sm:text-2xl font-bold">
                      ${product.price * product.quantity}
                    </h1>
                    <div className="flex text-gray-500">
                      <button
                        className="border-2 border-r-gray-300 bg-gray-200 rounded-l-[40px] px-3 py-1 sm:px-4 sm:py-2"
                        onClick={() => decreaseQuantity(product._id)}
                      >
                        -
                      </button>
                      <button className="border-2 bg-gray-200 px-3 py-1 sm:px-4 sm:py-2">
                        {product.quantity}
                      </button>
                      <button
                        className="border-2 bg-gray-200 border-l-gray-300 rounded-r-[40px] px-3 py-1 sm:px-4 sm:py-2"
                        onClick={() => increaseQuantity(product._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <OrderSummary
          calculateSubtotal={calculateSubtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </div>
  ) : (
    <div className="w-[90%] mx-auto flex text-center flex-col gap-9 my-10">
      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold">
        YOUR CART IS EMPTY
      </h1>
      <Link href="/">
        <button className=" border-2 sm:w-[90%] md:w-[70%] lg:w-[25%] border-black bg-black text-white rounded-[10px] py-2 mt-5">
          Go Back to Shopping
        </button>
      </Link>
    </div>
  );
};

export default Page;
