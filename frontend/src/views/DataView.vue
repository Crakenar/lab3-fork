<template>
  Data
  <div v-if="loading">Loading...</div>
  <div v-if="error">{{ error }}</div>

  <div>
    <label for="table-select">Select a table: </label>
    <AppDropdown
      id="table-select"
      v-model="selectedTable"
      :options="availableTables"
      placeholder="Select a Table"
      class="w-full md:w-14rem m-vertical-medium"
      @change="handleTableSelect"
    />
  </div>

  <div class="card">
    <TabMenu @tab-change="handleTabChange" class="p-horizontal-medium" :model="tabs" />
  </div>

  
  <DataTable
    v-if="tableData.length > 0 && selectedTabIndex === 0"
    :value="tableData"
    showGridlines
    tableStyle="min-width: 20rem"
    resizableColumns
    columnResizeMode="fit"
  >
    <template #header>
      <div style="text-align: left">
        <AppButton icon="pi pi-external-link" label="Export Data" @click="exportCSV" />
      </div>
    </template>
    <TableColumn v-for="col in columns" :key="col" :field="col" :header="col"></TableColumn>
  </DataTable>

  <div v-if="tableData.length > 0 && selectedTabIndex === 1">
    Chart
    <AppChart type="bar" :data="brandmodelCounts" />
  </div>


</template>

<script setup lang="ts">
import http from '@/http-common';
import type { MenuItem } from 'primevue/menuitem';
import type { TabMenuChangeEvent } from 'primevue/tabmenu';
import { ref, onMounted, type Ref } from 'vue';

interface WeaponRecord {
    brandmodel: string;
    producer: string;
    weapontype: string;
    weaponkind: string;
    weaponseries: string;
    weaponnumber: string;
    weaponcaliber: string;
    trunks: string;
    graduationyear: string;
    organunit: string;
    reasonsearch: string;
    insertdate: string;
    theftdate: string;
}

interface CountResult {
    [key: string]: number;
}

const tableData = ref([])
const columns: Ref<string[]> = ref([])
const loading = ref(false)
const error: Ref<string | null> = ref('')

const availableTables: Ref<string[]> = ref([])
const selectedTable: Ref<string | null> = ref(null)

const tabs: Ref<MenuItem[]> = ref([
  { label: 'Table view', icon: 'pi pi-home' },
  { label: 'Chart view', icon: 'pi pi-chart-line' }
])
const selectedTabIndex: Ref<number> = ref(0)

const brandmodelCounts: Ref<CountResult> = ref({})
const weaponkindCounts: Ref<CountResult> = ref({})
const producerCounts: Ref<CountResult> = ref({})

const fetchData = async (tableName: string) => {
  loading.value = true
  try {
    const response = await http.get(`/api/export/?tableName=${tableName}&limit=100`)
    tableData.value = response.data;
    columns.value = Object.keys(tableData.value[0]);

    brandmodelCounts.value = countItemsByField(tableData.value, 'brandmodel');
    weaponkindCounts.value = countItemsByField(tableData.value, 'weaponkind');
    producerCounts.value = countItemsByField(tableData.value, 'producer');

  } catch (err) {
    error.value = (err as Error).message;
  } finally {
    loading.value = false
  }
}

const getAllTables = async () => {
  try {
    const response = await http.get('/api/export/available-tables')
    availableTables.value = response.data;

    if (availableTables.value.length > 0) {
      selectedTable.value = availableTables.value[0];
      fetchData(selectedTable.value);
    }
  } catch (err) {
    error.value = (err as Error).message;
  }
}

const handleTableSelect = (e: { value: string; }) => {
  fetchData(e.value);
}

const exportCSV = () => {
  const csvSeparator = ',';
  const csvNewLine = '\r\n';
  const csvColumns = columns.value.join(csvSeparator);
  const csvData = tableData.value.map((row: any) => {
    return columns.value.map((col: string) => {
      let cell = row[col];
      if (cell == null) cell = ''; // Convert undefined or null to empty string
      cell = cell.toString().replace(/"/g, '""'); // Escape double quotes
      if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`; // Quote cells with commas or quotes
      return cell;
    }).join(csvSeparator);
  }).join(csvNewLine);

  const csv = `${csvColumns}${csvNewLine}${csvData}`;
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }); // Prepend the BOM character
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${selectedTable.value}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleTabChange = (event: TabMenuChangeEvent) => {
  // eslint-disable-next-line no-debugger
  debugger;
  selectedTabIndex.value = event.index;
}

const countItemsByField = (data: WeaponRecord[], field: keyof WeaponRecord): CountResult => {
    const res = data.reduce((acc: CountResult, item: WeaponRecord) => {
        const key = item[field];
        if (key) {
            acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
    }, {});

    return res;
}


onMounted(getAllTables);


</script>

<style scoped>
  .m-vertical-medium {
    margin: 1rem 0rem;
  }
  .p-horizontal-medium {
    padding: 1rem 0rem;
  }
</style>