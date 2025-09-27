import apiService from './apiService';
import { API_ENDPOINTS } from '../config/api';

class ProfileService {
  createProfile = async (profileData) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.PROFILES.CREATE, profileData, {
        includeAuth: true,
      });

      if (response.success) {
        return { success: true, data: response.data };
      }

      return { success: false, error: response.error, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  getMyProfile = async () => apiService.get(API_ENDPOINTS.PROFILES.ME);
  updateProfile = async (updates) => apiService.patch(API_ENDPOINTS.PROFILES.UPDATE, updates);
}

const profileService = new ProfileService();
export default profileService;


