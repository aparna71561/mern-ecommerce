import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync, selectProductFetchStatus, selectProductTotalResults, selectProducts } from '../ProductSlice';
import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { toast } from 'react-toastify';
import { ITEMS_PER_PAGE } from '../../constants';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { banner1, banner2, banner3, banner4,loadingAnimation } from '../../../assets';
import { ProductCard } from './ProductCard';
import { ProductBanner } from './ProductBanner';

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];
const bannerImages=[banner1,banner3,banner2,banner4]

export const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const loggedInUser = useSelector(selectLoggedInUser);
  const productFetchStatus = useSelector(selectProductFetchStatus);

  const dispatch = useDispatch();
  

  // Define toggleFilters function
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleBrandFilters = (e) => {
    const filterSet = new Set(filters.brand || []);
    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }
    setFilters({ ...filters, brand: Array.from(filterSet) });
  };

  const handleCategoryFilters = (e) => {
    const filterSet = new Set(filters.category || []);
    if (e.target.checked) {
      filterSet.add(e.target.value);
    } else {
      filterSet.delete(e.target.value);
    }
    setFilters({ ...filters, category: Array.from(filterSet) });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  useEffect(() => {
    const finalFilters = { ...filters };
    finalFilters['pagination'] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters['sort'] = sort;

    if (!loggedInUser?.isAdmin) {
      finalFilters['user'] = true;
    }

    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, page, sort, dispatch, loggedInUser]);

  useEffect(() => {
    if (productFetchStatus === 'rejected') {
      toast.error("Error fetching products, please try again later");
    }
  }, [productFetchStatus]);

  if (productFetchStatus === 'pending') {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)] w-full">
        <Lottie animationData={loadingAnimation} className="w-64 h-64" />
      </div>
    );
  }

  return (
    <div className="relative">
    {/* Filters Sidebar */}
    <motion.div
      className={`fixed top-0 left-0 bg-white h-screen p-4 overflow-y-auto z-50 w-80 shadow-xl ${
        isFilterOpen ? 'block' : 'hidden'
      }`}
      initial={{ x: -500 }}
      animate={{ x: isFilterOpen ? 0 : -500 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      <div className="mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button onClick={toggleFilters} className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Brand Filters */}
        <div className="mt-4">
          <div className="border rounded-md">
            <div className="p-2 border-b flex justify-between items-center">
              <h3 className="font-medium">Brands</h3>
            </div>
            <div className="p-2 max-h-60 overflow-y-auto">
              {brands?.length > 0 ? (
                brands.map((brand) => (
                  <motion.div 
                    key={brand._id} 
                    className="w-fit"
                    whileHover={{ x: 5 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <label className="flex items-center space-x-2 ml-1">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-500"
                        value={brand._id}
                        onChange={handleBrandFilters}
                      />
                      <span>{brand.name}</span>
                    </label>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No brands available</p>
              )}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-4">
          <div className="border rounded-md">
            <div className="p-2 border-b flex justify-between items-center">
              <h3 className="font-medium">Categories</h3>
            </div>
            <div className="p-2 max-h-60 overflow-y-auto">
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <motion.div 
                    key={category._id} 
                    className="w-fit"
                    whileHover={{ x: 5 }} 
                    whileTap={{ scale: 0.9 }}
                  >
                    <label className="flex items-center space-x-2 ml-1">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-500"
                        value={category._id}
                        onChange={handleCategoryFilters}
                      />
                      <span>{category.name}</span>
                    </label>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No categories available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Main Content */}
    <div className="mb-12">
      {/* Filter Button for Mobile */}
      <button 
        onClick={toggleFilters}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg z-40 flex items-center lg:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="ml-2">Filters</span>
      </button>

      <div className="flex mt-10 sm:mt-2">
      <ProductBanner images={bannerImages}/>
      </div>
  
      <div className="space-y-8 mt-4 lg:mt-0 px-4">
     
        <div className="flex justify-between items-center">
       
          <button 
            onClick={toggleFilters}
            className="hidden lg:flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          <div className="w-48">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort</label>
            <select
              id="sort"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={sort ? JSON.stringify(sort) : ''}
              onChange={(e) => setSort(e.target.value ? JSON.parse(e.target.value) : null)}
            >
              <option value="">Default</option>
              {sortOptions.map((option) => (
                <option key={option.name} value={JSON.stringify(option)}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              id={product._id} 
              title={product.title} 
              thumbnail={product.thumbnail} 
              brand={product.brand?.name || 'Unknown Brand'} 
              price={product.price} 
            />
          ))}
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(totalResults / ITEMS_PER_PAGE) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  page === index + 1 ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(page * ITEMS_PER_PAGE, totalResults)} of{' '}
            {totalResults} results
          </p>
        </div>
      </div>
    </div>
  </div>
);
};