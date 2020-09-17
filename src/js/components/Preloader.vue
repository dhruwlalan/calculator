
<template>
	<transition name="loader">
		<div class="loader" v-if="!loaded"></div>
	</transition>
</template>

<script>
	export default {
		data () {
			return {
				loaded: false ,
			}
		} ,
		created () {
			window.addEventListener('load', () => {
				setTimeout(() => {
					this.loaded = true;
				} , 500);
			});
		} ,
	}
</script>