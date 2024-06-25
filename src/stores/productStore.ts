import { defineStore } from 'pinia';
import axios from 'axios';

export interface Product {
  id: number;
  sku: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
  }),

  actions: {
    async fetchProducts() {
      const response = await axios.get('https://dummyjson.com/products');
      this.products = response.data.products.map((product: Product) => {
        return {
          ...product,
        };
      });
    },

    editProduct(id: number, product: Product) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products[index] = product;
      }
    },

    deleteProduct(id: number) {
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
