"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useCart } from '@/context/CartContext'; 
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, total, clearCart } = useCart(); 
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    paymentMethod: 'Credit Card', 
  });
  const [message, setMessage] = useState<string>('');
  const tax = 2.5;
  const deliveryFee = 15;
  const finalTotal = total + tax + deliveryFee;

  // Handle form data changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      total: finalTotal,
      products: cart.map((product) => ({
        _type: 'reference',
        _ref: product._id,
      })),
      status: 'Pending', 
    };

    try {
      // Make API call to place the order
       await axios.post('/api/place-order', orderData);
      setMessage('Order placed successfully!');
      clearCart(); 
      setTimeout(() => {
        router.push('/Thankyou'); 
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to place the order. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen z-1">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Checkout</h1>
          <Link href="/Cart">
            <button className="text-blue-500 hover:underline">Back to Cart</button>
          </Link>
        </div>
      </header>

      

      {/* Main Content */}
      <main className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <section className="lg:col-span-2 bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          {cart.map((product) => (
            <div key={product._id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-500">Size: {product.sizes}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">${product.price}</p>
                <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
              </div>
            </div>
          ))}
          {/* Total */}
          <div className="mt-6 text-right">
            <p className="text-sm text-gray-600">Subtotal: ${total}</p>
            <p className="text-sm text-gray-600">Tax: ${tax}</p>
            <p className="text-sm text-gray-600">Delivery Fee: ${deliveryFee}</p>
            <p className="text-lg font-bold">Total: ${finalTotal}</p>
          </div>
        </section>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded-lg space-y-6">
          <h2 className="text-3xl font-bold text-center">Checkout</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
          <select
            name="paymentMethod"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Place Order
          </button>
          {message && <p className="text-center text-green-500">{message}</p>}
        </form>
      </main>
      
    </div>
  );
};

export default CheckoutPage;
