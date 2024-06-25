<template>
  <div>
    <ProductTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductTable from './components/ProductTable.vue';
import { useProductStore } from './stores/productStore';

export default defineComponent({
  setup() {
    const productStore = useProductStore();
    productStore.fetchProducts();
  },
  components: { ProductTable },
});
</script>