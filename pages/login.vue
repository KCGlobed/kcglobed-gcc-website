<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh;">
    <LayoutTopHeader />
    <LayoutMainNavbar />
    <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #f3f4f8;">
      <FormsLoginForm />
    </div>
    <LayoutMainFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "GCC School | Login",
})

onMounted(() => {
  const token = localStorage.getItem('gcc_access_token')
  if (token) {
    window.location.href = '/myaccount'
  }
})
</script>