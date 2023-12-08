<template>
  <aside class="sticky top-[65px] h-[calc(100vh-65px)] p-2">
    <div
      class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border shadow-lg pb-5 scrollbar-thin scrollbar-thumb-border  scrollbar-thumb-rounded-md">
      <template v-for="(item, i) in menu" :key="i">
        <NuxtLink :to="item.link" class="inline-flex items-center gap-4 p-3 px-4 text-left text-[15px]">
          <Icon v-if="item.icon" :name="item.icon" class="h-5 w-5 text-muted-foreground" />
          <p class="truncate hidden sm:block"> {{ item.title }} </p>
        </NuxtLink>
      </template>
    </div>
  </aside>
</template>
<script setup lang="ts">
const menu = [
  {
    title: "Dashboard",
    icon: "heroicons:home",
    link :'/'
  },
  {
    title: "Conatcts",
    icon: "heroicons:user-group",
    link :'/contact'
  },
  {
    title: "Events",
    icon: "heroicons:academic-cap",
    link :'/event'
  },
  
  {
    title: "Staff",
    icon: "heroicons:user",
  },
  {
    title: "Analytics",
    icon: "heroicons:chart-pie",
    link :'/analytics'
  },
  
];
</script>
