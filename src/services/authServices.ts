import apiService from './apiServices';

export const loginAPI = (emailId: string, password: string) => {
  return apiService.post(`/auth/login`, { emailId, password });
};

export const signupAPI = (data: {
  firstName: string;
  lastName?: string;
  emailId: string;
  password: string;
}) => {
  return apiService.post(`/auth/signup`, data);
};
