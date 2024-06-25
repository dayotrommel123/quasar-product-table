<template>
  <!-- Main container @sinichi007 -->
  <div>
    <!-- Search input @sinichi007 -->
    <q-input
      v-model="search"
      label="Search"
      class="q-mb-md"
      style="margin: 5px 200px; padding: 10px; border-radius: 5px"
    />

    <!-- Product table @sinichi007 -->
    <q-table :rows="filteredProducts" :columns="columns" row-key="id">
      <!-- Custom action column  @sinichi007 -->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn icon="edit" @click="openEditDialog(props.row)" />
          <q-btn
            icon="delete"
            color="negative"
            @click="confirmDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Edit dialog  @sinichi007-->
    <q-dialog v-model="isEditDialogOpen">
      <q-card
        style="width: 500px; max-width: 80vw; height: 550px; max-height: 80vh"
      >
        <q-card-section>
          <div class="text-h6">Edit Product</div>
        </q-card-section>

        <q-card-section>
          <!-- Product fields @sinichi007-->
          <q-input v-model="editedProduct.id" label="ID" />
          <q-input v-model="editedProduct.sku" label="SKU" />
          <q-input v-model="editedProduct.title" label="Title" />
          <q-input v-model="editedProduct.description" label="Description" />
          <q-input v-model="editedProduct.category" label="Category" />
          <q-input v-model="editedProduct.price" label="Price" type="number" />
          <q-input
            v-model="editedProduct.rating"
            label="Rating"
            type="number"
          />
        </q-card-section>

        <q-card-actions align="right">
          <!-- Cancel button -->
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <!-- Save button -->
          <q-btn flat label="Save" color="positive" @click="saveProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete confirmation dialog -->
    <q-dialog v-model="isDeleteDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Delete</div>
        </q-card-section>

        <q-card-section>
          Are you sure you want to delete this product?
        </q-card-section>

        <q-card-actions align="right">
          <!-- Cancel button -->
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <!-- Delete button -->
          <q-btn flat label="Delete" color="negative" @click="deleteProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useProductStore, Product } from '../stores/productStore';

// Create a product store instance @sinichi007
const productStore = useProductStore();

// Define the type for a column @sinichi007
interface Column {
  name: string;
  label: string;
  field: string;
  align?: 'left' | 'center' | 'right';
}

// Define the columns for the product table @sinichi007
const columns: Column[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'sku', label: 'SKU', field: 'sku', align: 'left' },
  { name: 'title', label: 'Title', field: 'title', align: 'left' },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'left',
  },
  { name: 'category', label: 'Category', field: 'category', align: 'left' },
  { name: 'price', label: 'Price', field: 'price', align: 'left' },
  { name: 'rating', label: 'Total Rating', field: 'rating', align: 'left' },
  { name: 'action', label: 'Action', field: '', align: 'center' }, // Provide a function returning an empty string @sinichi007
];

// Search input value @sinichi007
const search = ref('');

// Edit dialog open state @sinichi007
const isEditDialogOpen = ref(false);

// Delete dialog open state @sinichi007
const isDeleteDialogOpen = ref(false);

// Edited product @sinichi007
const editedProduct = ref<Product>({
  id: 0,
  sku: '',
  title: '',
  description: '',
  category: '',
  price: 0,
  rating: 0,
});

// Product ID to delete @sinichi007
const productIdToDelete = ref<number | null>(null);

// Filtered products based on search input @sinichi007
const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    return (
      product.id.toString().includes(search.value) ||
      product.sku
        .toString()
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      product.title.toLowerCase().includes(search.value.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.value.toLowerCase()) ||
      product.description.toLowerCase().includes(search.value.toLowerCase()) ||
      product.category.toLowerCase().includes(search.value.toLowerCase()) ||
      product.rating.toString().includes(search.value)
    );
  });
});

// Open edit dialog with the selected product @sinichi007
function openEditDialog(product: Product) {
  editedProduct.value = { ...product };
  isEditDialogOpen.value = true;
}

// Save edited product @sinichi007
function saveProduct() {
  productStore.editProduct(editedProduct.value.id, editedProduct.value);
  isEditDialogOpen.value = false;
}

// Confirm delete product @sinichi007
function confirmDelete(id: number) {
  productIdToDelete.value = id;
  isDeleteDialogOpen.value = true;
}

// Delete product @sinichi007
function deleteProduct() {
  if (productIdToDelete.value !== null) {
    productStore.deleteProduct(productIdToDelete.value);
  }
  isDeleteDialogOpen.value = false;
  productIdToDelete.value = null;
}

// Fetch products when the component is mounted @sinichi007
onMounted(() => {
  productStore.fetchProducts();
});
</script>
