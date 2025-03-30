import { useSelector } from "react-redux";
import { selectLoggedInUser, selectIsAuthChecked } from "../AuthSlice";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

export const Protected = ({ children = true }) => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);


  if (!isAuthChecked) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Redirect conditions
  if (!loggedInUser) {
    return <Navigate to="/login" replace={true} />;
  }


  return children;
};