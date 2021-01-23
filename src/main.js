///ASSETS///
import './assets/assets';

///MAIN///
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.mount('#app');

window.oncontextmenu = function (event) {
   event.preventDefault();
   event.stopPropagation();
   return false;
};
