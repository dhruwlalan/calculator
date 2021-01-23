///ASSETS///
import './assets/assets';

///MAIN///
import { createApp } from 'vue';
import Preloader from './components/Preloader.vue';

import App from './App.vue';

const app = createApp(App);
const preloader = createApp(Preloader);

preloader.mount('#preloader');
app.mount('#app');

window.oncontextmenu = function (event) {
   event.preventDefault();
   event.stopPropagation();
   return false;
};
