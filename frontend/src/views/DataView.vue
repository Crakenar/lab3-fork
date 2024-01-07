<template>
  Data
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>
  
  <DataTable
    v-if="tableData.length > 0"
    :value="tableData"
    showGridlines
    tableStyle="min-width: 20rem"
    resizableColumns
    columnResizeMode="fit"
  >
    <TableColumn v-for="col in columns" :key="col" :field="col" :header="col"></TableColumn>
  </DataTable>
</template>

<script setup lang="ts">
import http from '@/http-common';
import { ref, onMounted, type Ref } from 'vue';

const tableData = ref([])
const columns: Ref<string[]> = ref([])
const loading = ref(false)
const error: Ref<string | null> = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    const response = await http.get('/api/export/?tableName=weapons&limit=100')
    tableData.value = response.data;
    columns.value = Object.keys(tableData.value[0]);
  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false
  }
}

onMounted(fetchData);


</script>