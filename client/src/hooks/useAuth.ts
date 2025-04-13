import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { setCredentials, logout, setLoading } from '../store/slices/authSlice';
import { showNotification } from '../store/slices/uiSlice';
import { auth } from '../services/api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const loadUser = async () => {
      if (token && !user) {
        try {
          const response = await auth.getProfile();
          dispatch(
            setCredentials({
              user: response.data,
              token,
            })
          );
        } catch (error) {
          dispatch(logout());
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    loadUser();
  }, [dispatch, token, user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login({ email, password });
      dispatch(
        setCredentials({
          user: response.data.user,
          token: response.data.token,
        })
      );
      dispatch(
        showNotification({
          message: 'Successfully logged in!',
          type: 'success',
        })
      );
      navigate('/');
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error.response?.data?.message || 'Login failed',
          type: 'error',
        })
      );
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await auth.register({ name, email, password });
      dispatch(
        setCredentials({
          user: response.data.user,
          token: response.data.token,
        })
      );
      dispatch(
        showNotification({
          message: 'Successfully registered!',
          type: 'success',
        })
      );
      navigate('/');
    } catch (error: any) {
      dispatch(
        showNotification({
          message: error.response?.data?.message || 'Registration failed',
          type: 'error',
        })
      );
    }
  };

  const logoutUser = () => {
    dispatch(logout());
    dispatch(
      showNotification({
        message: 'Successfully logged out!',
        type: 'info',
      })
    );
    navigate('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout: logoutUser,
  };
};

export default useAuth; 