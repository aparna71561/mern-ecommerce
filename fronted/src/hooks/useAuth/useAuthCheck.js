
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectIsAuthChecked, selectLoggedInUser } from '../../component/auth/AuthSlice'

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkAuthAsync());
    }
  }, [dispatch, isAuthChecked]);

  return { isAuthChecked, user };
};