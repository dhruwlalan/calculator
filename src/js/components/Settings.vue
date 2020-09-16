<template>
	<div>
		<div class="settings" @click="showModal = !showModal">
			<svg width="1em" height="1em" viewBox="0 0 16 16" class="settings-btn" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
			  <path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"/>
			</svg>
		</div>
		<transition name="modal-fade" @enter="showInnerModal = true">
			<div class="modal" v-if="showModal">
				<transition name="modal-zoom">
					<div class="modal__body" v-if="showInnerModal">
						<div class="modal__close" @click="exitModal">×</div>
						<div class="modal__content">
							<div class="modal__content--card">
								<h1 class="modal__content--card-heading">Design</h1>
								<div class="modal__content--card-body">
									<span>Neumorphic</span>
									<span>Material</span>
								</div>
							</div>
							<div class="modal__content--card">
								<h1 class="modal__content--card-heading">Theme</h1>
								<div class="modal__content--card-body">
									<span>Light</span>
									<span>Dark</span>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		props: ['theme'] ,
		data () {
			return {
				showModal: false ,
				showInnerModal: false ,
				selectedTheme: '' ,
				mode: 'light' ,
			}
		} ,
		methods: {
			exitModal () {
				this.showInnerModal = false;
				setTimeout(() => {
					this.showModal = false;
				}, 300);
			} ,
		} ,
	}
</script>

<style lang="scss">
</style>