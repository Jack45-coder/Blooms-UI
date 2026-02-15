import api from '../api/apiClient';

const subcategoryService = {
    // Create SubCategory
    createSubCategory: async (subCategoryData) => {
        try {
            const response = await api.post('/subcategories', subCategoryData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get All SubCategories
    getAllSubCategories: async () => {
        try {
            const response = await api.get('/subcategories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get SubCategory By Category ID
    getSubCategoriesByCategory: async (categoryId) => {
        try {
            const response = await api.get(`/subcategories/category/${categoryId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update SubCategory
    updateSubCategory: async (id, subCategoryData) => {
        try {
            const response = await api.put(`/subcategories/${id}`, subCategoryData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete SubCategory
    deleteSubCategory: async (id) => {
        try {
            const response = await api.delete(`/subcategories/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default subcategoryService;