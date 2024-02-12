import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Store } from './store'

import './assets/css/styles.css';

const app = createApp(App);

app.use(router);
app.use(Store);

app.mount('#app');
