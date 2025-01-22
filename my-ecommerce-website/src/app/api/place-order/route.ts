import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

interface Product {
  _id: string;
}

interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: string;
  total: number;
  products: Product[];
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();  // Parse incoming request data
    //console.log('Received Order Data:', data); 

    const { firstName, lastName, email, phone, address, city, zip, country, paymentMethod, total, products }: OrderData = data;

    // Check if products array is correctly passed
    if (!products || products.length === 0) {
      console.log('No products in order.');
    }

    const productReferences = products.map((product) => ({
      _type: 'reference',
      _ref: product._id,
    }));

    const order = await client.create({
      _type: 'order',
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zip,
      country,
      paymentMethod,
      total,
      products: productReferences,
      status: 'Pending',
    });

    console.log('Order created successfully:', order);  // Debugging line

    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error('Error creating order:', error);  // Log error to console
    return NextResponse.json({ success: false, message: 'Failed to create order' }, { status: 500 });
  }
}
