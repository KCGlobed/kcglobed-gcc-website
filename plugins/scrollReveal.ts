export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    let ticking = false;

    const reveal = (className: string) => {
      const reveals = document.querySelectorAll(className);
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
          reveals[i].classList.add("active");
        }
      }
    };

    // Single throttled scroll handler using requestAnimationFrame
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ["reveal", "reveal2", "reveal3", "reveal4"].forEach((cn) => reveal(`.${cn}`));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }
});
