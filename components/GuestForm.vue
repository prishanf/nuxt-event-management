<template>
  <h2 class="font-semibold text-center text-2xl mb-3">Add New Guest</h2>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <!-- First Name -->
    <UFormGroup label="First Name" name="FirstName">
      <UInput v-model="state.FirstName" />
    </UFormGroup>

    <!-- Last Name-->
    <UFormGroup label="Last Name" name="LastName">
      <UInput v-model="state.LastName" type="text" />
    </UFormGroup>

    <!-- Email -->
    <UFormGroup label="Email" name="Email">
      <UInput v-model="state.Email" type="text" />
    </UFormGroup>

    <UButton type="submit" size="lg"  block="true">
      Submit
    </UButton>
  </UForm>
</template>

<script setup>

const props = defineProps({
  onsave:Function,
  eventId:String 
})

const state = reactive({
  FirstName: undefined,
  LastName: undefined,
  Email: undefined,
})

const validate = (state) => {
  const errors = []
  if (!state.FirstName) errors.push({ path: 'FirstName', message: 'First Name is required' })
  if (!state.LastName) errors.push({ path: 'LastName', message: 'Last Name is required' })
  if (!state.Email) errors.push({ path: 'Email', message: 'Email required' })
  return errors
}


async function onSubmit(event) {
  const {data} = useFetch(`/api/guest/${props.eventId}`,{
    method:"POST",
    body:event.data
  })
  console.log(event.data)
  props.onsave()
}
</script>
