import api from '../api/apiClient';

const blogService = {
    // Create Blog
    createBlog: async (blogData, authorId) => {
        try {
            const response = await api.post('/api/blogs', blogData, {
                params: { authorId }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get All Blogs
    getAllBlogs: async () => {
        try {
            const response = await api.get('/api/blogs/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get Blog By ID
    getBlogById: async (blogId) => {
        try {
            const response = await api.get(`/blogs/${blogId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get Blogs By Author
    getBlogsByAuthor: async (authorId) => {
        try {
            const response = await api.get(`/blogs/author/${authorId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get Categories with SubCategories
    getCategoriesWithSubCategories: async () => {
        try {
            const response = await api.get('/blogs/categories');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update Blog
    updateBlog: async (blogId, blogData, userId) => {
        try {
            const response = await api.put(`/blogs/${blogId}`, blogData, {
                headers: { userId: userId }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete Blog
    deleteBlog: async (blogId, userId) => {
        try {
            const response = await api.delete(`/blogs/${blogId}`, {
                headers: { userId: userId }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default blogService;