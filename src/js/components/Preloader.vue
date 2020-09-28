
<template>
	<transition name="loader">
		<div ref="loader" class="loader" :class="`loader--${theme }`" v-if="!loaded"></div>
	</transition>
</template>

<script>
	export default {
		data () { return {
			loaded: false ,
			theme: 'light' ,
		}},
		created () {
			const t = localStorage.getItem('calcTheme');
            if (t == 'light') { this.theme = 'light'; }
            else if (t === 'dark') { this.theme = 'dark'; }
            else { this.theme = 'light'; }
			window.addEventListener('load', () => {
				setTimeout(() => {
					this.loaded = true;
				} , 500);
			});
		},
	}
</script>