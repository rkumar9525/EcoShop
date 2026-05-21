import client from './client';
import { Product } from '../types';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response: Product[] = await client.get('/products');
    return response;
  },

  async getProductById(id: number): Promise<Product> {
    const response: Product = await client.get(`/products/${id}`);
    return response;
  },

  async getCategories(): Promise<string[]> {
    const response: string[] = await client.get('/products/categories');
    return response;
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response: Product[] = await client.get(
      `/products/category/${category}`,
    );
    return response;
  },
};