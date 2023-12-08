<template>
  <h2 class="font-semibold text-center text-2xl mb-3">Create New Event</h2>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <!-- Campaign Name -->
    <UFormGroup label="Campaign Name" name="campaignName">
      <UInput v-model="state.Name" />
    </UFormGroup>

    <!-- Start Date -->
    <UFormGroup label="Start Date" name="startDate">
      <UInput v-model="state.StartDate" type="date" />
    </UFormGroup>

    <!-- End Date -->
    <UFormGroup label="End Date" name="endDate">
      <UInput v-model="state.EndDate" type="date" />
    </UFormGroup>

    <!-- Campaign Status -->
    <UFormGroup label="Campaign Status" name="campaignStatus">
      <USelect v-model="state.Status" :options="status">
      </USelect>
    </UFormGroup>

    <!-- Campaign Type -->
    <UFormGroup label="Campaign Type" name="campaignType">
      <USelect v-model="state.Type" :options="type">
      </USelect>
    </UFormGroup>

    <UButton type="submit" size="xl"  block="true">
      Submit
    </UButton>
  </UForm>
</template>

<script setup>

const props = defineProps({
  onsave:Function 
})
const status = ['Planned', 'In Progress']
const type = ['Conference', 'Webinar']

const state = reactive({
  Name: undefined,
  StartDate: undefined,
  EndDate: undefined,
  Status: undefined,
  Type: undefined,
})

const validate = (state) => {
  const errors = []
  if (!state.Name) errors.push({ path: 'campaignName', message: 'Campaign Name is required' })
  if (!state.StartDate) errors.push({ path: 'startDate', message: 'Start Date is required' })
  if (!state.EndDate) errors.push({ path: 'endDate', message: 'End Date is required' })
  if (!state.Status) errors.push({ path: 'campaignStatus', message: 'Campaign Status is required' })
  if (!state.Type) errors.push({ path: 'campaignType', message: 'Campaign Type is required' })
  return errors
}

async function onSubmit(event) {
  const {data} = useFetch("/api/event",{
    method:"POST",
    body:event.data
  })
  console.log(event.data)
  props.onsave()
}
</script>

<style>

</style>