import api from '../api/apiClient';

const userService = {
    getUserById: async (id) => {
        try{
            const response = await api.get(`/account/${id}`);
            return{
                success: true,
                data: response.data.data || response.data,
                errorMessage: null
            }
        }catch(error){
            console.error('Fetch User Error:', error);
            throw error.response?.data || {
                success: false,
                data: null,
                errorMessage: error.response?.data?.message || error.message
            };
        }
    },

    getUserByEmail: async (email) => {
        try {
            const response = await api.get(`/account/email?email=${email}`);
            return{
                success: true,
                data: response.data.data || response.data,
                errorMessage: null
            }
        } catch (error) {
            console.error('Fetch User Error:', error);
            throw error.response?.data || {
                success: false,
                data: null,
                errorMessage: error.response?.data?.message || error.message 
            };
        }
    },

}
export default userService;