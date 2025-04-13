import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  };
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  notification: {
    show: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
      }>
    ) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideNotification: (state) => {
      state.notification = {
        ...state.notification,
        show: false,
      };
    },
  },
});

export const {
  toggleSidebar,
  toggleTheme,
  showNotification,
  hideNotification,
} = uiSlice.actions;
export default uiSlice.reducer; 