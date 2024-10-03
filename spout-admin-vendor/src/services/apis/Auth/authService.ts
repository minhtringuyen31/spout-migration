import { toast } from "react-toastify";
import { AxiosError } from "axios";
import axiosInstance from "../axiosInstance";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    const errorData = (error as AxiosError)?.response?.data as {
      message?: string;
      non_field_errors?: string[];
    };
    const errorMessage = errorData.message || errorData.non_field_errors?.[0];
    toast.error(errorMessage);
    throw error;
  }
};
