// client/src/services/guideService.ts
import axios from 'axios';

const API_URL = '/api/guides';

export const getGuides = async (category?: string, search?: string) => {
  const response = await axios.get(API_URL, { params: { category, search } });
  return response.data;
};

export const getGuideById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createGuide = async (guide: { title: string; content: string; category: string }) => {
  const response = await axios.post(API_URL, guide);
  return response.data;
};

export const rateGuide = async (id: string, score: number) => {
  const response = await axios.post(`${API_URL}/${id}/rate`, { score });
  return response.data;
};