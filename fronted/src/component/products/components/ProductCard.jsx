import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StarIcon = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor"
    className="h-4 w-4"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
    />
  </svg>
);

const HeartIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    className="h-5 w-5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
    />
  </svg>
);

export const ProductCard = ({ 
  id, 
  title, 
  price, 
  thumbnail, 
  brand,
  rating = 4.5,
  discountPercentage = 0,
  showWishlist = true
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full max-w-xs"
      onClick={() => navigate(`/product-details/${id}`)}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          {discountPercentage}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      {showWishlist && (
        <button 
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <HeartIcon />
        </button>
      )}

      {/* Product Image */}
      <div className="w-full h-56 md:h-64 bg-gray-100 flex justify-center items-center p-4">
        <img 
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105" 
          src={thumbnail} 
          alt={title} 
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        
        {/* Rating */}
        <div className="flex items-center">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= Math.floor(rating)} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${(price / (1 - discountPercentage/100)).toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};