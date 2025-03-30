import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearSelectedProduct, fetchProductByIdAsync, resetProductUpdateStatus, selectProductUpdateStatus, selectSelectedProduct, updateProductByIdAsync } from '../../products/ProductSlice';
import { useForm } from 'react-hook-form';
import { selectCategories } from '../../categories/CategoriesSlice';
import { toast } from 'react-toastify';

export const ProductUpdate = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedProduct = useSelector(selectSelectedProduct);
    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const productUpdateStatus = useSelector(selectProductUpdateStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductByIdAsync(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (productUpdateStatus === 'fullfilled') {
            toast.success('Product Updated');
            navigate('/admin/dashboard');
        } else if (productUpdateStatus === 'rejected') {
            toast.error('Error updating product, please try again later');
        }
    }, [productUpdateStatus, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearSelectedProduct());
            dispatch(resetProductUpdateStatus());
        };
    }, [dispatch]);

    const handleProductUpdate = (data) => {
        const productUpdate = { ...data, _id: selectedProduct._id, images: [data?.image0, data?.image1, data?.image2, data?.image3] };
        delete productUpdate?.image0;
        delete productUpdate?.image1;
        delete productUpdate?.image2;
        delete productUpdate?.image3;

        dispatch(updateProductByIdAsync(productUpdate));
    };

    return (
        <div className="flex justify-center items-center p-4">
            {selectedProduct && (
                <form onSubmit={handleSubmit(handleProductUpdate)} className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-4">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input type="text" {...register("title", { required: 'Title is required', value: selectedProduct.title })} className="w-full border p-2 rounded" />
                    </div>
                    <div className="flex gap-4">
                        {/* <div className="w-1/2">
                            <label className="block text-gray-700">Brand</label>
                            <select {...register("brand", { required: 'Brand is required' })} defaultValue={selectedProduct.brand._id} className="w-full border p-2 rounded">
                                {brands.map((brand) => (
                                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                                ))}
                            </select>
                        </div> */}
                        <div className="w-1/2">
                            <label className="block text-gray-700">Category</label>
                            <select {...register("category", { required: 'Category is required' })} defaultValue={selectedProduct.category._id} className="w-full border p-2 rounded">
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea {...register("description", { required: 'Description is required', value: selectedProduct.description })} rows={4} className="w-full border p-2 rounded"></textarea>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">Price</label>
                            <input type="number" {...register("price", { required: 'Price is required', value: selectedProduct.price })} className="w-full border p-2 rounded" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700">Discount Percentage</label>
                            <input type="number" {...register("discountPercentage", { required: 'Discount percentage is required', value: selectedProduct.discountPercentage })} className="w-full border p-2 rounded" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Stock Quantity</label>
                        <input type="number" {...register("stockQuantity", { required: 'Stock Quantity is required', value: selectedProduct.stockQuantity })} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Thumbnail</label>
                        <input type="text" {...register("thumbnail", { required: 'Thumbnail is required', value: selectedProduct.thumbnail })} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700">Product Images</label>
                        <div className="space-y-2">
                            {selectedProduct.images.map((image, index) => (
                                <input key={index} type="text" {...register(`image${index}`, { required: 'Image is required', value: image })} className="w-full border p-2 rounded" />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
                        <Link to="/admin/dashboard" className="px-4 py-2 border border-red-600 text-red-600 rounded">Cancel</Link>
                    </div>
                </form>
            )}
        </div>
    );
};
