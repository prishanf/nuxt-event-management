
  <template>
    <div class="grid lg:grid-cols-2 h-screen bg-gray-100 dark:bg-gray-950">
      <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52">
        <div class="header text-center mb-6">
          <h1 class="text-xl font-bold mb-px">Login</h1>
        </div>
        <UCard>
          <UForm :state="state" @submit="handleLogin">
            <UFormGroup class="mb-4" name="email" label="Email">
              <UInput v-model="state.email" type="email" placeholder="john@email.com" />
            </UFormGroup>
            <UFormGroup class="mb-4" name="password" label="Password">
              <UInput v-model="state.password" type="password" placeholder="********" />
            </UFormGroup>
            <UFormGroup>
              <UButton :loading="loading" type="submit" color="primary" block>
                Sign In
              </UButton>
            </UFormGroup>
          </UForm>
        </UCard>
      </div>
      <div class="right hidden lg:block"></div>
    </div>
  </template>


<script  setup>
definePageMeta({
  layout:'fullpage'
})
const router = useRouter();
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const handleLogin = async (e) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({ email: e.data.email, password: e.data.password })

    if (error) throw error
    router.push("/");

  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

</script>

<style>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>