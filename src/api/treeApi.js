import { api } from "./api";

export const fetchItems = async () => {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    throw error;
  }
};
