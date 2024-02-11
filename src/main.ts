import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { StoreStatus } from './store'

import './assets/css/styles.css';

const app = createApp(App);

app.use(router);
app.use(StoreStatus);

app.mount('#app');
