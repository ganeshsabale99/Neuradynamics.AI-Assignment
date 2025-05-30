import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
});


const applyFilters = (products, searchTerm, selectedCategory, sortOrder) => {
  let filteredProducts = [...products];
  

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === selectedCategory
    );
  }
  
 
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  }
  

  if (sortOrder) {
    filteredProducts.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
  
  return filteredProducts;
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filteredItems: [],
    categories: [],
    status: 'idle',
    error: null,
    searchTerm: '',
    selectedCategory: '',
    sortOrder: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = applyFilters(
        state.items,
        action.payload,
        state.selectedCategory,
        state.sortOrder
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = applyFilters(
        state.items,
        state.searchTerm,
        action.payload,
        state.sortOrder
      );
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredItems = applyFilters(
        state.items,
        state.searchTerm,
        state.selectedCategory,
        action.payload
      );
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.sortOrder = null;
      state.filteredItems = [...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSearchTerm, setSelectedCategory, setSortOrder, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;