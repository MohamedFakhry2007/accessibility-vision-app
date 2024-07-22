// client/src/services/colorContrastService.ts
import axios from 'axios';

const API_URL = '/api/colorschemes';

export const saveColorScheme = async (scheme: { name: string; backgroundColor: string; textColor: string }) => {
  const response = await axios.post(API_URL, scheme);
  return response.data;
};

export const getUserColorSchemes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};