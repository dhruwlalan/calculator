<template>
   <div class="container">
      <h1>Hello, World!!</h1>
      <button @click="this.count++">count: {{ count }}</button>
   </div>
</template>

<script>
export default {
   data() {
      return {
         count: 0,
      };
   },
};
</script>
