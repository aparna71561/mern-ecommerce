import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../user/UserSlice';
import { selectLoggedInUser } from '../auth/AuthSlice';
import { selectProductIsFilterOpen, toggleFilters } from '../products/ProductSlice';
import { FiShoppingCart, FiHeart, FiMenu, FiX, FiSettings } from 'react-icons/fi';

export const Navbar = ({ isProductList = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  // const cartItems = useSelector(selectCartItems);
  const loggedInUser = useSelector(selectLoggedInUser);
  // const wishlistItems = useSelector(selectWishlistItems);
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  const handleToggleFilters = () => dispatch(toggleFilters());

  const settings = [
    { name: 'Home', to: '/' },
    { name: 'Profile', to: loggedInUser?.isAdmin ? '/admin/profile' : '/profile' },
    { name: loggedInUser?.isAdmin ? 'Orders' : 'My Orders', to: loggedInUser?.isAdmin ? '/admin/orders' : '/orders' },
    { name: 'Logout', to: '/logout' },
  ];

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">Ecommerace</Link>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative" onClick={toggleUserMenu}>
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                {userInfo?.name?.charAt(0) || '?'}
              </div>
              <span>Hey, {userInfo?.name}</span>
            </button>
            {userMenuOpen && (
              <div className="absolute bg-white shadow-lg p-2 right-0 mt-2 rounded w-48">
                {loggedInUser?.isAdmin && (
                  <Link to="/admin/add-product" className="block p-2 hover:bg-gray-200">Add New Product</Link>
                )}
                {settings.map((setting) => (
                  <Link key={setting.to} to={setting.to} className="block p-2 hover:bg-gray-200">{setting.name}</Link>
                ))}
              </div>
            )}
          </div>

          {loggedInUser?.isAdmin && <span className="bg-blue-500 text-white px-3 py-1 rounded">Admin</span>}

          <div className="flex space-x-4">
            {/* {cartItems?.length > 0 && (
              <button onClick={() => navigate('/cart')} className="relative">
                <FiShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">{cartItems.length}</span>
              </button>
            )} */}

            <button onClick={() => navigate('/cart')} className="relative">
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full"></span>
            </button>

            {/* {!loggedInUser?.isAdmin && (
              <button onClick={() => navigate('/wishlist')} className="relative">
                <FiHeart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">{wishlistItems?.length}</span>
              </button>
            )} */}

            <button onClick={() => navigate('/wishlist')} className="relative">
              <FiHeart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full"></span>
            </button>

            {isProductList && (
              <button onClick={handleToggleFilters}>
                <FiSettings size={24} className={isProductFilterOpen ? 'text-black' : ''} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            {settings.map((setting) => (
              <Link key={setting.to} to={setting.to} className="block p-2 border-b">{setting.name}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};