import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { hideNotification } from '../../store/slices/uiSlice';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification.show, dispatch]);

  if (!notification.show) return null;

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-success" />,
    error: <XCircleIcon className="h-6 w-6 text-error" />,
    warning: <ExclamationCircleIcon className="h-6 w-6 text-warning" />,
    info: <InformationCircleIcon className="h-6 w-6 text-info" />,
  };

  const classes = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  };

  return (
    <div className="toast toast-end z-50">
      <div className={`alert ${classes[notification.type]} shadow-lg`}>
        <div>
          {icons[notification.type]}
          <span>{notification.message}</span>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => dispatch(hideNotification())}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification; 