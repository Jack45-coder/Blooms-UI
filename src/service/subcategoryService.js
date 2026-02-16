import api from '../api/apiClient';

const subcategoryService = {
    // Create SubCategory
    createSubCategory: async (subCategoryData) => {
        try {
            const response = await api.post('/subcategories', subCategoryData);
            return response.data;
        } catch (error) {
            console.error('Create subcategory error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Get All SubCategories
    getAllSubCategories: async () => {
        try {
            const response = await api.get('/subcategories/all');
            console.log('Raw subcategories response:', response);
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
            console.error('Get subcategories error:', error);
            return {
                success: false,
                data: [],
                errorMessage: error.message
            };
        }
    },

    // Get SubCategory By Category ID
    getSubCategoriesByCategory: async (categoryId) => {
        try {
            const response = await api.get(`/subcategories/category/${categoryId}`);
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
            console.error('Get subcategories by category error:', error);
            return {
                success: false,
                data: [],
                errorMessage: error.message
            };
        }    
    },

    // Update SubCategory
    updateSubCategory: async (id, subCategoryData) => {
        try {
            const response = await api.put(`/subcategories/${id}`, subCategoryData);
            return response.data;
        } catch (error) {
            console.error('Update subcategory error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Delete SubCategory
    deleteSubCategory: async (id) => {
        try {
            const response = await api.delete(`/subcategories/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete subcategory error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    }
};

export default subcategoryService;