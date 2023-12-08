
<template>
  <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur shadow-md px-3">
    <!-- Container of flex -->
    <div class="flex h-16 items-center justify-between">
      <!-- Logo and page title -->
      <div class="flex items-center gap-3">
        <!-- Logo -->
        <img src="https://img.logoipsum.com/296.svg" alt="Analytics logo" class="h-7 w-7 object-contain" />
        <!-- Page title -->
        <NuxtLink class="text-xl font-bold" to="/">Event Manager</NuxtLink>
      </div>

      <!-- Right side of header -->
      <div class="flex items-center gap-5">
        <button @click="toggleTheme"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background">
          <Icon name="heroicons:sun" class="h-5 w-5" />

        </button>
        <UDropdown :items="profileMenuOptions" :popper="{ placement: 'bottom-start' }">
          <UButton color="white" class="rounded-full" icon="i-heroicons-user-circle" size="md" />
        </UDropdown>
        <!-- Profile Dropdown menu -->
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const mode = useColorMode();
const toggleTheme = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

const userData = ref(user)
// Items that will be displayed in menu
const profileMenuOptions = [
  [
    {
      label: `${userData.value.email}`,
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      }
    },
    {
      label: 'Logout',
      click : singOut,
    }
      
  ]
];

function singOut(){
  supabase.auth.signOut()

}
</script>

<style></style>
