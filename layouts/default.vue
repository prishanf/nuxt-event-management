<template>
  <div class="">
    <!-- Header -->
    <AppTopBar />
    <div class="grid grid-cols-12 gap-4">
      <!-- Sidebar -->
      <AppMenu class="col-span-2" />
      <!-- Main Section -->
      <main class="p-5 col-span-10">
       <slot></slot>
      </main>
    </div>
  </div>
</template>


<script lang="ts" setup>

</script>

<style>

</style>