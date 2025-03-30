import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../../products/ProductSlice';
import { useForm } from 'react-hook-form';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const productAddStatus = useSelector(selectProductAddStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (productAddStatus === 'fullfilled') {
            reset();
            toast.success('New product added');
            navigate('/admin/dashboard');
        } else if (productAddStatus === 'rejected') {
            toast.error('Error adding product, please try again later');
        }
    }, [productAddStatus]);

    useEffect(() => {
        return () => {
            dispatch(resetProductAddStatus());
        };
    }, []);

    const handleAddProduct = (data) => {
        const newProduct = { ...data, images: [data.image0, data.image1, data.image2, data.image3] };
        delete newProduct.image0;
        delete newProduct.image1;
        delete newProduct.image2;
        delete newProduct.image3;

        dispatch(addProductAsync(newProduct));
    };

    return (
        <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSubmit(handleAddProduct)} className="w-full max-w-3xl space-y-6 bg-white p-6 shadow-lg rounded-lg">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input type="text" {...register('title', { required: 'Title is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Brand</label>
                        <select {...register('brand', { required: 'Brand is required' })} className="w-full p-2 border border-gray-300 rounded mt-1">
                            {brands.map((brand) => (
                                <option key={brand._id} value={brand._id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700">Category</label>
                        <select {...register('category', { required: 'Category is required' })} className="w-full p-2 border border-gray-300 rounded mt-1">
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Description</label>
                    <textarea {...register('description', { required: 'Description is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" rows={4}></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Price</label>
                        <input type="number" {...register('price', { required: 'Price is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Discount (%)</label>
                        <input type="number" {...register('discountPercentage', { required: 'Discount percentage is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Stock Quantity</label>
                    <input type="number" {...register('stockQuantity', { required: 'Stock Quantity is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div>
                    <label className="block text-gray-700">Thumbnail</label>
                    <input type="text" {...register('thumbnail', { required: 'Thumbnail is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                </div>

                <div>
                    <label className="block text-gray-700">Product Images</label>
                    <div className="space-y-2">
                        <input type="text" {...register('image0', { required: 'Image is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                        <input type="text" {...register('image1', { required: 'Image is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                        <input type="text" {...register('image2', { required: 'Image is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                        <input type="text" {...register('image3', { required: 'Image is required' })} className="w-full p-2 border border-gray-300 rounded mt-1" />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Product</button>
                    <Link to='/admin/dashboard' className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
