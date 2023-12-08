
 <template>
  <NuxtLink :to="`/event/${item?.Id}`">
  <UCard class="shadow-lg">
    <template #header >
      <h2 class="text-gray-600 text-base font-semibold truncate">{{item?.Name}}</h2>
   
     </template>
     <p class="text-sm text-gray-500">{{ item?.StartDate }} - {{ item?.EndDate }}</p>

<div class="mt-4">
  <span class="inline-block px-2 py-1 bg-primary text-white text-xs font-semibold rounded" >{{ item?.Status
  }}</span>
</div>

<div class="mt-4">
  <p class="text-gray-600">{{ item?.Type }}</p>
</div>

  </UCard>
</NuxtLink>
</template>
<script lang="ts" setup>
defineProps({
  item:Object,

})
</script>

<style>

</style>