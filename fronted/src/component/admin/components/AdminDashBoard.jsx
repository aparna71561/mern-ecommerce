import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { selectBrands } from '../../brands/BrandSlice';
import { selectCategories } from '../../categories/CategoriesSlice';
import { ProductCard } from '../../products/components/ProductCard';
import { deleteProductByIdAsync, fetchProductsAsync, selectProductIsFilterOpen, selectProductTotalResults, selectProducts, toggleFilters, undeleteProductByIdAsync } from '../../products/ProductSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ITEMS_PER_PAGE } from '../../constants';

const sortOptions = [
    { name: "Price: low to high", sort: "price", order: "asc" },
    { name: "Price: high to low", sort: "price", order: "desc" },
];

export const AdminDashBoard = () => {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [page, setPage] = useState(1);
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const products = useSelector(selectProducts);
    const dispatch = useDispatch();
    const isProductFilterOpen = useSelector(selectProductIsFilterOpen);
    const totalResults = useSelector(selectProductTotalResults);

    useEffect(() => {
        setPage(1);
    }, [totalResults]);

    useEffect(() => {
        const finalFilters = { ...filters };
        finalFilters['pagination'] = { page: page, limit: ITEMS_PER_PAGE };
        finalFilters['sort'] = sort;
        dispatch(fetchProductsAsync(finalFilters));
    }, [filters, sort, page]);

    // const handleBrandFilters = (e) => {
    //     const filterSet = new Set(filters.brand || []);
    //     e.target.checked ? filterSet.add(e.target.value) : filterSet.delete(e.target.value);
    //     setFilters({ ...filters, brand: Array.from(filterSet) });
    // };

    const handleCategoryFilters = (e) => {
        const filterSet = new Set(filters.category || []);
        e.target.checked ? filterSet.add(e.target.value) : filterSet.delete(e.target.value);
        setFilters({ ...filters, category: Array.from(filterSet) });
    };

    const handleProductDelete = (productId) => dispatch(deleteProductByIdAsync(productId));
    const handleProductUnDelete = (productId) => dispatch(undeleteProductByIdAsync(productId));
    const handleFilterClose = () => dispatch(toggleFilters());

    return (
        <>
            <motion.div className="fixed bg-white h-screen p-4 overflow-y-scroll w-full md:w-96 z-50" variants={{ show: { left: 0 }, hide: { left: -500 } }} initial={'hide'} transition={{ ease: "easeInOut", duration: .7, type: "spring" }} animate={isProductFilterOpen ? "show" : "hide"}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">New Arrivals</h2>
                    <button onClick={handleFilterClose} className="text-red-500">✖</button>
                </div>
                <div className="space-y-2">
                    <h3 className="cursor-pointer">Totes</h3>
                    <h3 className="cursor-pointer">Backpacks</h3>
                    <h3 className="cursor-pointer">Travel Bags</h3>
                    <h3 className="cursor-pointer">Hip Bags</h3>
                    <h3 className="cursor-pointer">Laptop Sleeves</h3>
                </div>
                {/* <div className="mt-4">
                    <h3 className="font-semibold">Brands</h3>
                    {brands?.map((brand) => (
                        <label key={brand._id} className="flex items-center space-x-2">
                            <input type="checkbox" value={brand._id} onChange={handleBrandFilters} />
                            <span>{brand.name}</span>
                        </label>
                    ))}
                </div> */}
                <div className="mt-4">
                    <h3 className="font-semibold">Category</h3>
                    {categories?.map((category) => (
                        <label key={category._id} className="flex items-center space-x-2">
                            <input type="checkbox" value={category._id} onChange={handleCategoryFilters} />
                            <span>{category.name}</span>
                        </label>
                    ))}
                </div>
            </motion.div>
            <div className="space-y-5 mt-5 mb-12">
                <div className="flex justify-end space-x-5">
                    <select className="border p-2" onChange={(e) => setSort(e.target.value)} value={sort}>
                        <option value={null}>Reset</option>
                        {sortOptions.map((option) => (
                            <option key={option.name} value={option.sort}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    {products.map((product) => (
                        <div key={product._id} className={product.isDeleted ? "opacity-70" : ""}>
                            <ProductCard id={product._id} title={product.title} thumbnail={product.thumbnail} brand={product.brand.name} price={product.price} isAdminCard={true} />
                            <div className="flex justify-end space-x-2 mt-2">
                                <Link to={`/admin/product-update/${product._id}`} className="bg-blue-500 text-white px-4 py-1 rounded">Update</Link>
                                {product.isDeleted ? (
                                    <button onClick={() => handleProductUnDelete(product._id)} className="border border-red-500 text-red-500 px-4 py-1 rounded">Un-delete</button>
                                ) : (
                                    <button onClick={() => handleProductDelete(product._id)} className="border border-red-500 text-red-500 px-4 py-1 rounded">Delete</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <div className="flex space-x-2">
                        {[...Array(Math.ceil(totalResults / ITEMS_PER_PAGE)).keys()].map((num) => (
                            <button key={num + 1} onClick={() => setPage(num + 1)} className={`px-3 py-1 border ${page === num + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}>{num + 1}</button>
                        ))}
                    </div>
                    <p>Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, totalResults)} of {totalResults} results</p>
                </div>
            </div>
        </>
    );
};