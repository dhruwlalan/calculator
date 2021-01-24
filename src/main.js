///ASSETS///
import './assets/assets';

///MAIN///
import { createApp } from 'vue';
import './components/vanilla/preloader';

import App from './App.vue';

const app = createApp(App);

app.mount('#app');
