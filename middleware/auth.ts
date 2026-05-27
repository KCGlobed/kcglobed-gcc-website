export default defineNuxtRouteMiddleware((to) => {
    // Only run on client
    if (import.meta.server) return

    const token = localStorage.getItem('gcc_access_token')

    if (!token) {
        return navigateTo('/login', { replace: true })
    }
})