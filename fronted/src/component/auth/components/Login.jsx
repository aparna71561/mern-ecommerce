import { Box, CircularProgress, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation } from '../../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab';
import { selectLoggedInUser, loginAsync, selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus, selectIsAuthChecked } from '../AuthSlice'
import { toast } from 'react-toastify'
import { MotionConfig, motion } from 'framer-motion'

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  
  // Selectors
  const status = useSelector(selectLoginStatus)
  const error = useSelector(selectLoginError)
  const loggedInUser = useSelector(selectLoggedInUser)
  const isAuthChecked = useSelector(selectIsAuthChecked)
  
  // Media queries
  const is900 = useMediaQuery(theme.breakpoints.down(900))
  const is480 = useMediaQuery(theme.breakpoints.down(480))

  // Form handling
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthChecked && loggedInUser) {
      navigate("/", { replace: true })
    }
  }, [isAuthChecked, loggedInUser, navigate])

  // Show error toast if login fails
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Login failed")
      dispatch(clearLoginError())
    }
  }, [error, dispatch])

  // Handle login success
  useEffect(() => {
    if (status === 'fulfilled') {
      toast.success("Login successful")
      reset()
      dispatch(resetLoginStatus())
    }
  }, [status, reset, dispatch])

  const handleLogin = (data) => {
    dispatch(loginAsync({
      rollNo: data.rollNo,
      password: data.password
    }))
  }

  // Show loading while checking auth state
  if (!isAuthChecked) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
      </Box>
    )
  }

  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{ overflowY: "hidden" }}>
      {/* Left Panel - Animation */}
      {!is900 && (
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'}>
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      )}

      {/* Right Panel - Login Form */}
      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
        {/* Logo/Title */}
        <Stack textAlign="center" mb={4}>
          <Typography variant='h2' fontWeight={600}>Ecommerace</Typography>
          <Typography color={'GrayText'} variant='body2'>- Shop Anything</Typography>
        </Stack>

        {/* Login Form */}
        <Stack 
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLogin)}
          spacing={3}
          width={is480 ? "95vw" : '28rem'}
          px={2}
        >
          {/* Roll Number Field */}
          <motion.div whileHover={{ y: -3 }}>
            <TextField
              fullWidth
              label="Roll Number"
              variant="outlined"
              {...register("rollNo", {
                required: "Roll Number is required",
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: "Enter a valid roll number"
                }
              })}
              error={!!errors.rollNo}
              helperText={errors.rollNo?.message}
            />
          </motion.div>

          {/* Password Field */}
          <motion.div whileHover={{ y: -3 }}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </motion.div>

          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <LoadingButton
              fullWidth
              size="large"
              loading={status === 'pending'}
              type="submit"
              variant="contained"
              sx={{ height: 45, mt: 1 }}
            >
              Login
            </LoadingButton>
          </motion.div>

          {/* Links */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
              <motion.div>
                <Typography 
                  component={Link} 
                  to="/forgot-password"
                  color="text.secondary"
                  sx={{ textDecoration: 'none' }}
                >
                  Forgot password?
                </Typography>
              </motion.div>
              
              <motion.div>
                <Typography 
                  component={Link} 
                  to="/signup"
                  color="text.secondary"
                  sx={{ textDecoration: 'none' }}
                >
                  Don't have an account? <Box component="span" color="primary.main">Register</Box>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}