<template>
  <!-- Main container @sinichi007 -->
  <div>
    <!-- Product table component @sinichi007 -->
    <ProductTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Import ProductTable component from components folder @sinichi007
import ProductTable from './components/ProductTable.vue';
// Import useProductStore function from productStore @sinichi007
import { useProductStore } from './stores/productStore';

export default defineComponent({
  // Setup function to initialize the component @sinichi007
  setup() {
    // Create a product store instance @sinichi007
    const productStore = useProductStore();
    // Fetch products when the component is mounted @sinichi007
    productStore.fetchProducts();
  },
  // Register ProductTable component @sinichi007
  components: { ProductTable },
});
</script>
