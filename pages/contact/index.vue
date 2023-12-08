<template>
  <div class="flex justify-between px-4 mb-3">
    <h2 class="text-3xl font-semibold text-primary">Contact</h2>
    <UButton variant="outline" @click="isOpen = true">Create New Contact</UButton>
  </div>
  <div class="p-2 border shadow-lg m-3">
    <UTable :columns="columns" :rows="data" :sort="{ column: 'Name' }" />
  </div>
</template>

<script  setup>
const columns = [{

  key: 'Name',
  label: 'Name',
  sortable: true
}, {
  key: 'Email',
  label: 'Email',
  sortable: true
},
{
  key: 'Phone',
  label: 'Phone',
  sortable: true
},
]

const { data, refresh } = await useFetch('/api/contact')
</script>

<style></style>