import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { 
    clearResetPasswordError, 
    clearResetPasswordSuccessMessage, 
    resetPasswordAsync, 
    resetResetPasswordStatus, 
    selectResetPasswordError, 
    selectResetPasswordStatus, 
    selectResetPasswordSuccessMessage 
} from '../AuthSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ResetPassword = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const status = useSelector(selectResetPasswordStatus);
    const error = useSelector(selectResetPasswordError);
    const successMessage = useSelector(selectResetPasswordSuccessMessage);
    const { userId, passwordResetToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
        return () => {
            dispatch(clearResetPasswordError());
        };
    }, [error]);

    useEffect(() => {
        if (status === 'fullfilled') {
            toast.success(successMessage?.message);
            navigate("/login");
        }
        return () => {
            dispatch(clearResetPasswordSuccessMessage());
        };
    }, [status]);

    useEffect(() => {
        return () => {
            dispatch(resetResetPasswordStatus());
        };
    }, []);

    const handleResetPassword = async (data) => {
        const cred = { ...data, userId: userId, token: passwordResetToken };
        delete cred.confirmPassword;
        dispatch(resetPasswordAsync(cred));
        reset();
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <p className="text-gray-600 text-center">Please enter and confirm new password</p>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleResetPassword)}>
                    <div>
                        <motion.div whileHover={{ y: -2 }}>
                            <input 
                                type="password" 
                                className="w-full px-3 py-2 border rounded-md" 
                                placeholder="New Password"
                                {...register("password", {
                                    required: "Please enter a password",
                                    pattern: {
                                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                        message: "At least 8 characters, 1 uppercase, 1 lowercase, and 1 number",
                                    },
                                })}
                            />
                        </motion.div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                        <motion.div whileHover={{ y: -2 }}>
                            <input 
                                type="password" 
                                className="w-full px-3 py-2 border rounded-md" 
                                placeholder="Confirm New Password"
                                {...register("confirmPassword", {
                                    required: "Please confirm the password",
                                    validate: (value, formValues) => value === formValues.password || "Passwords don't match",
                                })}
                            />
                        </motion.div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>
                    <motion.button 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 1 }}
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        disabled={status === 'pending'}
                    >
                        {status === 'pending' ? "Resetting..." : "Reset Password"}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};
