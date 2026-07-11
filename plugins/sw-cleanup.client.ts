// Unregister any stale service workers safely after the page is fully loaded
export default defineNuxtPlugin(() => {
  if (import.meta.client && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Delay unregistration to ensure all network requests/hydration are completely finished
      setTimeout(() => {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister().then((success) => {
              if (success) {
                console.log('[SW] Unregistered stale service worker safely:', registration.scope);
              }
            });
          }
        });
      }, 2000);
    });
  }
});
