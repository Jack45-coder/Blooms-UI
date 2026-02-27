import api from '../api/apiClient';

const blogService = {
    // Create Blog
    createBlog: async (blogData) => {
        try {
            const response = await api.post('/blogs', blogData);
            return response.data;
        } catch (error) {
            console.error('Create blog error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Get All Blogs
    getAllBlogs: async () => {
        try {
            const response = await api.get('/blogs/all');
            if(response.data){
               if(response.data.success !== undefined){
                return response.data;
               }
               return{
                success: true,
                data: response.data,
                errorMessage: null
               };
            }
            return{
                success: false,
                data: [],
                errorMessage: "No data recived"
            };
        } catch (error) {
            console.error('Get all blogs error:', error);
            return {
                success: false,
                data: [],
                errorMessage: error.message
            };
        }
    },

    // Get Blog By ID
    getBlogById: async (blogId) => {
        try {
            const response = await api.get(`/blogs/${blogId}`);
            return response.data;
        } catch (error) {
            console.error('Get blog error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Get Blogs By Author
    getBlogsByAuthor: async (authorId) => {
        try {
            console.log('🔗 Calling /blogs/author/', authorId);
            const response = await api.get(`/blogs/author/${authorId}`);
            console.log('Raw blogs by author response:', response);
            
            if (response.data) {
                if (response.data.success !== undefined) {
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
            console.error('Get blogs by author error:', error);
            return {
                success: false,
                data: [],
                errorMessage: error.message
            };
        }
    },

    // Get Categories with SubCategories
    getCategoriesWithSubCategories: async () => {
        try {
            const response = await api.get('/blogs/categories');
            return response.data;
        } catch (error) {
            console.error('Get categories with subcategories error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Update Blog
    updateBlog: async (blogId, blogData, userId) => {
        try {
            const response = await api.put(`/blogs/${blogId}`, blogData, {
                headers: {'userId': userId}
            });
            return response.data;
        } catch (error) {
            console.error('Update blog error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    },

    // Delete Blog
    deleteBlog: async (blogId, userId) => {
        try {
            const response = await api.delete(`/blogs/${blogId}`,{
                headers: {
                'userId': userId 
            }
        });
            return response.data;
        } catch (error) {
            console.error('Delete blog error:', error);
            throw error.response?.data || { success: false, errorMessage: error.message };
        }
    }
};


export default blogService;