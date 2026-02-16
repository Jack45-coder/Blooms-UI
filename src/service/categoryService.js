import api from '../api/apiClient';

const categoryService = {
    // Create Category
    createCategory: async (categoryData) => {
        try {
            const response = await api.post('/categories', categoryData);
            return response.data;
        } catch (error) {
            console.error('Create category error:', error);
            throw error.response?.data ||{success: false,  errorMessage: error.message};
        }
    },

    // Get All Categories
    getAllCategories: async () => {
        try {
            const response = await api.get('/categories/all');
            console.log('Raw categories response:', response);
            
            if(response.data){
               if(response.data.success !== undefined){
                return response.data;
               }
               return {
                success: true,
                data: response.data,
                errorMessage: null
               };
            }
            return {
                success: false,
                data: [],
                errorMessage: 'No data received'
            };
        } catch (error) {
            console.error('Get categories error:', error);
            return {
                success: false,
                data: [],
                errorMessage: error.message
            };
        }
    },

    // Get Category By ID
    getCategoryById: async (id) => {
        try {
            const response = await api.get(`/categories/id/${id}`);
            return response.data;
        } catch (error) {
            console.error('Get category error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Update Category
    updateCategory: async (id, categoryData) => {
        try {
            const response = await api.put(`/categories/${id}`, categoryData);
            return response.data;
        } catch (error) {
            console.error('Update category error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Delete Category
    deleteCategory: async (id) => {
        try {
            const response = await api.delete(`/categories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete category error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    }
};

export default categoryService;