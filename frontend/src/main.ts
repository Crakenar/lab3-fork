import './assets/main.css'
import 'primevue/resources/themes/lara-light-green/theme.css'
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button'
import TabMenu from 'primevue/tabmenu';
import Chart from 'primevue/chart';


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue);
app.component('DataTable', DataTable);
app.component('TableColumn', Column);
app.component('AppDropdown', Dropdown);
app.component('AppButton', Button);
app.component('TabMenu', TabMenu);
app.component('AppChart', Chart);

app.mount('#app')
