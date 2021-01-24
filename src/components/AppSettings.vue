<template>
   <div :class="['settings', designTheme]" @click="$emit('openModal')">
      <settings-svg class="settings-btn" />
   </div>
   <transition
      enter-active-class="animation-base modal-slide-down"
      leave-active-class="animation-base modal-slide-up"
   >
      <div :class="['modal', designTheme]" v-show="modal">
         <div class="modal__close" @click="$emit('closeModal')">×</div>
         <div class="modal__content">
            <div class="modal__content--row">
               <h1 class="modal__content--row-heading">Design</h1>
               <div class="modal__content--row-body">
                  <span
                     :class="{ active: design === 'neu-plane' ? true : false }"
                     @click="updateDesignTheme"
                     id="neu-plane"
                     >Neu-Plane</span
                  >
                  <span
                     :class="{ active: design === 'neu-3d' ? true : false }"
                     @click="updateDesignTheme"
                     id="neu-3d"
                     >Neu-3d</span
                  >
                  <span
                     :class="{ active: design === 'material' ? true : false }"
                     @click="updateDesignTheme"
                     id="material"
                     >Material</span
                  >
               </div>
            </div>
            <div class="modal__content--row">
               <h1 class="modal__content--row-heading">Theme</h1>
               <div class="modal__content--row-body">
                  <span
                     :class="{ active: theme === 'light' ? true : false }"
                     @click="updateDesignTheme"
                     id="light"
                     >Light</span
                  >
                  <span
                     :class="{ active: theme === 'dark' ? true : false }"
                     @click="updateDesignTheme"
                     id="dark"
                     >Dark</span
                  >
               </div>
            </div>
         </div>
      </div>
   </transition>
</template>

<script>
import SettingsSvg from './svg/SettingsSvg.vue';

export default {
   components: {
      SettingsSvg,
   },
   props: ['design', 'theme', 'modal'],
   emits: ['changeDesign', 'changeTheme', 'closeModal', 'openModal'],
   methods: {
      updateDesignTheme(e) {
         if (
            e.target.id === 'neu-plane' ||
            e.target.id === 'neu-3d' ||
            e.target.id === 'material'
         ) {
            this.$emit('changeDesign', e.target.id);
         }
         if (e.target.id === 'light' || e.target.id === 'dark') {
            if (e.target.id === 'dark') {
               document.body.style.backgroundColor = '#243441';
            } else {
               document.body.style.backgroundColor = '#eeeeee';
            }
            this.$emit('changeTheme', e.target.id);
         }
         this.$emit('closeModal');
      },
   },
   computed: {
      designTheme() {
         return `${this.design}--${this.theme}`;
      },
   },
};
</script>
