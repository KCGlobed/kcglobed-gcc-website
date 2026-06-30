// Unregister any stale service workers so new pages (like /exam) are never intercepted
export default defineNuxtPlugin(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((success) => {
          if (success) console.log('[SW] Unregistered stale service worker:', registration.scope);
        });
      }
    });
  }
});
