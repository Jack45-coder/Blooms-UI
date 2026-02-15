import api from '../api/apiClient';

const categoryService = {
    // Create Category
    createCategory: async (categoryData) => {
        try {
            const response = await api.post('/categories', categoryData);
            return response.data.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get All Categories
    getAllCategories: async () => {
        try {
            const response = await api.get('/categories/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get Category By ID
    getCategoryById: async (id) => {
        try {
            const response = await api.get(`/categories/id/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update Category
    updateCategory: async (id, categoryData) => {
        try {
            const response = await api.put(`/categories/${id}`, categoryData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete Category
    deleteCategory: async (id) => {
        try {
            const response = await api.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default categoryService;