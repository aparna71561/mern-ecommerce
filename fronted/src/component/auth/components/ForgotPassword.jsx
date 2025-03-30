import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { clearForgotPasswordError, clearForgotPasswordSuccessMessage, forgotPasswordAsync, resetForgotPasswordStatus, selectForgotPasswordError, selectForgotPasswordStatus, selectForgotPasswordSuccessMessage } from '../AuthSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ForgotPassword = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const status = useSelector(selectForgotPasswordStatus);
    const error = useSelector(selectForgotPasswordError);
    const successMessage = useSelector(selectForgotPasswordSuccessMessage);

    useEffect(() => {
        if (error) {
            toast.error(error?.message);
        }
        return () => {
            dispatch(clearForgotPasswordError());
        };
    }, [error]);

    useEffect(() => {
        if (status === 'fullfilled') {
            toast.success(successMessage?.message);
        }
        return () => {
            dispatch(clearForgotPasswordSuccessMessage());
        };
    }, [status]);

    useEffect(() => {
        return () => {
            dispatch(resetForgotPasswordStatus());
        };
    }, []);

    const handleForgotPassword = async (data) => {
        dispatch(forgotPasswordAsync(data));
        reset();
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col gap-2 text-center">
                    <h2 className="text-xl font-semibold">{status === 'fullfilled' ? "Email has been sent!" : "Forgot Your Password?"}</h2>
                    <p className="text-gray-600">{status === 'fullfilled' ? "Please check your inbox and click on the received link to reset your password" : "Enter your registered email below to receive password reset link"}</p>
                </div>
                {status !== 'fullfilled' && (
                    <>
                        <motion.div whileHover={{ y: -2 }}>
                            <input 
                                type="email" 
                                {...register("email", { required: "Please enter an email", pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" } })} 
                                placeholder="Enter email" 
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
                            <button 
                                onClick={handleSubmit(handleForgotPassword)} 
                                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50" 
                                disabled={status === 'pending'}
                            >
                                {status === 'pending' ? "Sending..." : "Send Password Reset Link"}
                            </button>
                        </motion.div>
                    </>
                )}
                <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
                    <Link to='/login' className="text-blue-600 hover:underline text-sm">Go back to login</Link>
                </motion.div>
            </div>
        </div>
    );
};
