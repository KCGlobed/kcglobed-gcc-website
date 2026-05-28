export default defineNuxtRouteMiddleware(() => {
    // Skip on server - localStorage only exists on client
    if (import.meta.server) return

    const token = localStorage.getItem('gcc_access_token')
    if (!token) {
        return navigateTo('/login', { replace: true })
    }
})