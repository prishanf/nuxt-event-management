<template>
  <div class="mb-4">
    <div class="rounded-md shadow-md overflow-hidden">
      <!-- <img :src="getImageUrl()" alt="Campaign Image" class="w-full h-40 object-cover object-center" /> -->

      <div class="p-4">
        <h3 class="text-lg font-semibold text-primary ">{{ data[0]?.Name }}</h3>
        <p class="text-sm text-gray-500">{{ formatDate(data[0]?.StartDate) }} - {{ formatDate(data[0]?.EndDate) }}</p>

        <div class="mt-4">
          <span class="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">{{ data[0]?.Status
          }}</span>
        </div>

        <div class="mt-4">
          <p class="text-gray-600">{{ data[0]?.Type }}</p>
        </div>
      </div>
    </div>
  </div>

  <UCard>
    <template #header>
      <div class="flex justify-between px-4">
        <h2 class="text-3xl font-semibold text-primary">Invties</h2>
        <UButton variant="outline" @click="openCreateInvite = true">Add New Invite</UButton>
      </div>
    </template>
    <UTable :rows="guests" :sort="{ column: 'Name' }" />
    <USlideover v-model="openCreateInvite">
      <div class="p-4 flex-1">
        <div class="h-full" >
          <GuestForm :onsave="onSave" :eventId="route.params.id"></GuestForm>
        </div>
      </div>
    </USlideover>
  </UCard>
</template>

<script  setup>
const route = useRoute();
const columns = [{
  key: 'FirstName',
  label: 'FirstName',
  sortable: true
}, {
  key: 'LastName',
  label: 'Last Name',
  sortable: true
}, {
  key: 'Status',
  label: 'Status',
  sortable: true
}, {
  key: 'actions',
  label: 'Actions',
  sortable: false
}]

const openCreateInvite = ref(false)
const { data } = await useFetch(`/api/event/${route.params.id}`)

const { data: guests, refresh } = await useFetch(`/api/guest/${route.params.id}`)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
const getImageUrl = () => {
  return 'https://via.placeholder.com/300'
}

function onSave(){
  refresh();
  openCreateInvite.value= false
}
</script>

<style></style>