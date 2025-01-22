# Next-Jam-2025-Hackathon
# Shop.cs - E-commerce Marketplace Website

Shop.cs is a dynamic e-commerce marketplace website designed and developed as part of a hackathon project. It features a wide range of trendy clothing, including Korean style, Western clothes, and 'old money' fashion, aimed at providing users with a seamless shopping experience. The website is built using modern web technologies including **Next.js**, **Sanity CMS**, **Tailwind CSS**, and **Axios** for fetching and displaying data.

## Features

- **Product Listings**: Products are dynamically fetched from Sanity CMS and displayed in a grid format on the homepage and other product listing pages.
- **Product Detail Pages**: Each product has a dedicated detail page that includes all relevant information such as product description, price, and images. The URL is dynamically generated using slugs.
- **Add to Cart Functionality**: Users can add products to their shopping cart, and an alert will appear confirming the addition. The cart contents are displayed on a separate Cart page.
- **Mobile-Responsive Design**: The website adapts to various screen sizes using **Tailwind CSS** to ensure a responsive and smooth experience across devices.
- **Dynamic Routing**: Product detail pages are accessible via dynamic URLs using slugs, ensuring a clean URL structure and improved SEO.

## Tech Stack

- **Frontend**:
  - **Next.js**: React framework used for building the website with support for server-side rendering and static site generation.
  - **React**: The core JavaScript library for building interactive user interfaces.
  - **Tailwind CSS**: Utility-first CSS framework used for building custom designs and ensuring a responsive layout.
- **Backend**:
  - **Sanity CMS**: A headless CMS for managing and retrieving content such as product listings, descriptions, images, and other necessary data.
- **API**:
  - **Axios**: HTTP client used to make API requests to fetch product data from Sanity CMS.
- **State Management**:
  - Local state management using React's `useState` for handling the cart functionality.
  
## Installation Instructions

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/shop-cs.git
