///ASSETS///
import './assets/assets';

///MAIN///
import './components/vanilla/preloader';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.mount('#app');
