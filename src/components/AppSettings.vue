<template>
   <div class="settings" @click="modal = true">
      <settings-svg class="settings-btn" />
   </div>
   <transition name="fade">
      <div class="modal" v-show="modal">
         <div class="modal__close" @click="modal = false">×</div>
         <div class="modal__content">
            <div class="modal__content--row">
               <h1 class="modal__content--row-heading">Design</h1>
               <div class="modal__content--row-body">
                  <span :class="{ active: design === 'neu' }" @click="updateDesignTheme" id="neu"
                     >Neu</span
                  >
                  <span
                     :class="{ active: design === 'glass' }"
                     @click="updateDesignTheme"
                     id="glass"
                     >Glass</span
                  >
                  <span
                     :class="{ active: design === 'material' }"
                     @click="updateDesignTheme"
                     id="material"
                     >Material</span
                  >
               </div>
            </div>
            <div class="modal__content--row">
               <h1 class="modal__content--row-heading">Theme</h1>
               <div class="modal__content--row-body">
                  <span :class="{ active: theme === 'light' }" @click="updateDesignTheme" id="light"
                     >Light</span
                  >
                  <span :class="{ active: theme === 'dark' }" @click="updateDesignTheme" id="dark"
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
   props: ['design', 'theme'],
   emits: ['changeDesign', 'changeTheme'],
   data() {
      return {
         modal: false,
      };
   },
   methods: {
      async updateDesignTheme(e) {
         if (e.target.id === 'neu' || e.target.id === 'glass' || e.target.id === 'material') {
            await this.$emit('changeDesign', e.target.id);
         }
         if (e.target.id === 'light' || e.target.id === 'dark') {
            await this.$emit('changeTheme', e.target.id);
         }
         this.modal = false;
         document.body.removeAttribute('class');
         document.body.classList.add(`${this.designTheme}`);
      },
   },
   computed: {
      designTheme() {
         return `${this.design}--${this.theme}`;
      },
   },
};
</script>
