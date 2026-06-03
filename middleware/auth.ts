// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return

    const token = localStorage.getItem('gcc_access_token')
    const hasToken = token && token !== 'undefined' && token !== 'null'

    const email = to.query.email as string
    const password = to.query.password as string
    const fromLanding = to.query.from_landing === 'true'

    // Allow auto-login bypass
    if (!hasToken && (email && password)) return

    if (!hasToken) {
        return navigateTo('/login', { replace: true })
    }
})