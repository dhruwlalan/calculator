// ASSETS
import './include/assets.js';

// MAIN
import Vue from 'vue';
import App from './App.vue';

new Vue({
	el: '#app',
	render: h => h(App),
})

window.addEventListener('load', () => {
	setTimeout(() => {
		document.getElementById('preloader').remove();
	} , 300)
});