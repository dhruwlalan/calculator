// ASSETS
import './include/assets.js';

// MAIN
import Vue from 'vue';
import App from './App.vue';
import Preloader from './components/Preloader.vue';

new Vue({
	el: '#preloader',
	render: h => h(Preloader),
});

new Vue({
	el: '#app',
	render: h => h(App),
});

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};