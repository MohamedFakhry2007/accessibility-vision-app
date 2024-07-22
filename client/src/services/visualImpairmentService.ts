// client/src/services/visualImpairmentService.ts
import axios from 'axios';

const API_URL = '/api/visual-impairments';

export const getVisualImpairments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addVisualImpairment = async (impairment: { name: string; description: string; cssFilters: string }) => {
  const response = await axios.post(API_URL, impairment);
  return response.data;
};