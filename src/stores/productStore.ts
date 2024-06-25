// Import defineStore from Pinia @sinichi007
import { defineStore } from 'pinia';

// Import axios for making HTTP requests @sinichi007
import axios from 'axios';

// Define the Product interface @sinichi007
export interface Product {
  id: number;
  sku: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}

// Define the product store using Pinia @sinichi007
export const useProductStore = defineStore('productStore', {
  // State: initialize the products array @sinichi007
  state: () => ({
    products: [] as Product[],
  }),

  // Actions: functions that can be used to manipulate the state @sinichi007
  actions: {
    // Fetch products from the API @sinichi007
    async fetchProducts() {
      const response = await axios.get('https://dummyjson.com/products');
      this.products = response.data.products.map((product: Product) => {
        return {
          ...product,
        };
      });
    },

    // Edit a product by ID @sinichi007
    editProduct(id: number, product: Product) {
      const index = this.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.products[index] = product;
      }
    },

    // Delete a product by ID @sinichi007
    deleteProduct(id: number) {
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
