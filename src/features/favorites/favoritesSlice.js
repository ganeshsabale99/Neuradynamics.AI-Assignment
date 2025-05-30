import { createSlice } from '@reduxjs/toolkit';

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem('favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getInitialFavorites(),
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.find(item => item.id === action.payload.id)) {
        state.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state));
      }
    },
    removeFromFavorites: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(newState));
      return newState;
    },
    clearAllFavorites: () => {
      localStorage.removeItem('favorites');
      return [];
    }
  }
});

export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;