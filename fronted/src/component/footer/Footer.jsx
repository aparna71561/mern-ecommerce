import React from "react";
import { QRCodePng, appStorePng, googlePlayPng, facebookPng, instagramPng, twitterPng, linkedinPng } from "../../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-200 py-12 px-6 md:px-12">
      {/* Upper Section */}
      <div className="flex flex-wrap justify-around gap-10">
        {/* Subscribe Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Exclusive</h2>
          <h3 className="text-lg">Subscribe</h3>
          <p className="text-sm">Get 10% off your first order</p>
          <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
            <input type="email" placeholder="Enter your email" className="bg-transparent px-3 py-2 outline-none text-white flex-1" />
            <button className="bg-blue-500 px-3 py-2">Send</button>
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Support</h3>
          <p className="text-sm">11th Main Street, Dhaka, DH 1515, California.</p>
          <p className="text-sm">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        {/* Account Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Account</h3>
          <p className="text-sm cursor-pointer">My Account</p>
          <p className="text-sm cursor-pointer">Login / Register</p>
          <p className="text-sm cursor-pointer">Cart</p>
          <p className="text-sm cursor-pointer">Wishlist</p>
          <p className="text-sm cursor-pointer">Shop</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <p className="text-sm cursor-pointer">Privacy Policy</p>
          <p className="text-sm cursor-pointer">Terms Of Use</p>
          <p className="text-sm cursor-pointer">FAQ</p>
          <p className="text-sm cursor-pointer">Contact</p>
        </div>

        {/* App Download Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Download App</h3>
          <p className="text-sm text-gray-400">Save $3 with App New User Only</p>
          <div className="flex gap-3">
            <img src={QRCodePng} className="w-24 h-24 object-contain" alt="QR Code" />
            <div className="space-y-2">
              <img src={googlePlayPng} className="cursor-pointer" alt="Google Play" />
              <img src={appStorePng} className="cursor-pointer" alt="App Store" />
            </div>
          </div>
          {/* Social Media */}
          <div className="flex gap-4 mt-4">
            <motion.img whileHover={{ scale: 1.1 }} className="cursor-pointer" src={facebookPng} alt="Facebook" />
            <motion.img whileHover={{ scale: 1.1 }} className="cursor-pointer" src={twitterPng} alt="Twitter" />
            <motion.img whileHover={{ scale: 1.1 }} className="cursor-pointer" src={instagramPng} alt="Instagram" />
            <motion.img whileHover={{ scale: 1.1 }} className="cursor-pointer" src={linkedinPng} alt="LinkedIn" />
          </div>
        </div>
      </div>
      
      {/* Lower Section */}
      <div className="text-center mt-10 text-gray-500">
        <p>&copy; Mern Store {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </div>
  );
};
