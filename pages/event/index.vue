<template>
  <div>
    <div class="flex justify-between px-4">
      <h2 class="text-3xl font-semibold text-primary">Events</h2>
      <UButton variant="outline"  @click="isOpen = true">Create New Event</UButton>
    </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-5 gap-4">
    <EventCard v-for="item in data" :item="item">

    </EventCard>
  </div>
  </div>
  
    <UModal v-model="isOpen">
      <div class="p-4">
        <EventForm :onsave="onSave"></EventForm>
      </div>
      
    </UModal>

</template>

<script  setup>
const isOpen = ref(false)

const {data,refresh} = await useFetch('/api/event')

const state = reactive({
  eventName: undefined,
  eventDate: undefined,
  eventTime: undefined,
  eventLocation: undefined,
  eventDescription: undefined,
})

function onSave(){
  refresh();
  isOpen.value= false
}

const validate = (state) => {
  const errors = []
  if (!state.eventName) errors.push({ path: 'eventName', message: 'Event Name is required' })
  if (!state.eventDate) errors.push({ path: 'eventDate', message: 'Event Date is required' })
  if (!state.eventTime) errors.push({ path: 'eventTime', message: 'Event Time is required' })
  if (!state.eventLocation) errors.push({ path: 'eventLocation', message: 'Event Location is required' })
  if (!state.eventDescription) errors.push({ path: 'eventDescription', message: 'Event Description is required' })
  return errors
}

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
}
</script>

<style>

</style>