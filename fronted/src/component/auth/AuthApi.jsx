import {axiosi} from '../../config/axios'

export const signup=async(cred)=>{
    try {
        const res=await axiosi.post("auth/signup",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const login = async (cred) => {
    try {
      const res = await axiosi.post("auth/login", cred);
      // Store minimal auth state if needed
      localStorage.setItem('authState', JSON.stringify({ 
        loggedIn: true,
        lastChecked: new Date().getTime() 
      }));
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

export const forgotPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/forgot-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/reset-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const checkAuth = async () => {
    try {
      const res = await axiosi.get("auth/check-auth");
      return res.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear any existing auth state
        localStorage.removeItem('authState');
      }
      throw error.response?.data || error.message;
    }
  };

  export const logout = async () => {
    try {
      const res = await axiosi.get("auth/logout");
      localStorage.removeItem('authState');
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };