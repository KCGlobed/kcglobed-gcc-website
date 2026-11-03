<template>
  <div class="pay-page">
    <div v-if="error" class="pay-shell pay-missing">
      <h1>Payment form not found</h1>
      <p>Please check the link or contact GCC School.</p>
    </div>

    <div v-else-if="data" class="pay-shell">
      <!-- ── Left: brand + contact ─────────────────────────────────────── -->
      <aside class="pay-side">
        <div class="pay-brand">
          <span class="pay-secured">Secured by <em>Cashfree</em></span>
          <img src="/img/pay-logo.jpg" alt="GCC School" width="48" height="48" />
          <h2>{{ data.merchant.name }}</h2>
        </div>

        <p class="pay-desc">{{ data.plan.description }}</p>

        <div class="pay-contact">
          <h3>Contact Us</h3>
          <a :href="`mailto:${data.merchant.email}`"><i class="ti ti-mail"></i>{{ data.merchant.email }}</a>
          <a :href="`tel:+91${data.merchant.phone}`"><i class="ti ti-phone"></i>+91 {{ data.merchant.phone }}</a>
          <a :href="`https://wa.me/91${data.merchant.whatsapp}`" target="_blank" rel="noopener">
            <i class="ti ti-brand-whatsapp"></i>+91 {{ data.merchant.whatsapp }}
          </a>
          <a :href="data.merchant.website" target="_blank" rel="noopener" class="pay-web">
            <i class="ti ti-world"></i>{{ data.merchant.website }}
          </a>

          <h3 class="pay-follow">Follow Us</h3>
          <div class="pay-social">
            <a :href="data.merchant.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="ig"><i class="ti ti-brand-instagram"></i></a>
            <a :href="data.merchant.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="in"><i class="ti ti-brand-linkedin"></i></a>
            <a :href="data.merchant.facebook" target="_blank" rel="noopener" aria-label="Facebook" class="fb"><i class="ti ti-brand-facebook"></i></a>
          </div>
        </div>
      </aside>

      <!-- ── Right: form ───────────────────────────────────────────────── -->
      <form class="pay-main" novalidate @submit.prevent="pay">
        <section class="pay-panel">
          <h1>{{ data.plan.title }}</h1>
          <div class="pay-amount">₹ {{ formatInr(data.plan.amount) }}</div>
        </section>

        <section class="pay-panel pay-fields">
          <div class="pay-field" :class="{ invalid: errors.phone }">
            <label for="pf-phone">Phone Number <b>*</b></label>
            <div class="pay-phone">
              <span>+91</span>
              <input id="pf-phone" v-model.trim="form.phone" type="tel" inputmode="numeric" maxlength="10"
                placeholder="Eg. 98XXXXXXX8" autocomplete="tel-national" />
            </div>
            <small v-if="errors.phone">Enter a valid 10-digit mobile number</small>
          </div>

          <div class="pay-field" :class="{ invalid: errors.email }">
            <label for="pf-email">Email ID <b>*</b></label>
            <input id="pf-email" v-model.trim="form.email" type="email" placeholder="Eg. ashok.kumar@gmail.com" autocomplete="email" />
            <small v-if="errors.email">Enter a valid email</small>
          </div>

          <div class="pay-field" :class="{ invalid: errors.name }">
            <label for="pf-name">Name <b>*</b></label>
            <input id="pf-name" v-model.trim="form.name" type="text" placeholder="Eg. Ashok Kumar" autocomplete="name" />
            <small v-if="errors.name">Enter your full name</small>
          </div>

        </section>

        <section class="pay-panel pay-agree-panel">
          <label class="pay-agree">
            <input v-model="form.agree" type="checkbox" />
            <span>I agree to the <a href="/terms-conditions" target="_blank" rel="noopener" class="pay-link">Terms &amp; Conditions</a></span>
          </label>
          <small v-if="errors.agree" class="pay-error">Please accept the Terms &amp; Conditions</small>
        </section>

        <p v-if="serverError" class="pay-error pay-server-error">{{ serverError }}</p>

        <button type="submit" class="pay-btn" :disabled="loading">
          <template v-if="loading"><span class="pay-spin"></span>Please wait...</template>
          <template v-else>Pay ₹ {{ formatInr(data.plan.amount) }} <i class="ti ti-arrow-right"></i></template>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "blank" });

const route = useRoute();
const code = String(route.params.code || "").toUpperCase();

const { data, error } = await useFetch(`/api/pay/plan/${code}`);

useHead({
  title: data.value ? `${data.value.plan.title} | GCC School` : "Payment | GCC School",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" },
  ],
});

// Indian numbering: 100000 -> 1,00,000
const formatInr = (n: number) => new Intl.NumberFormat("en-IN").format(n);

const form = reactive({ name: "", email: "", phone: "", agree: false });
const errors = reactive<Record<string, boolean>>({});
const loading = ref(false);
const serverError = ref("");

function validate() {
  const checks: Record<string, boolean> = {
    phone: /^[6-9]\d{9}$/.test(form.phone),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email),
    name: form.name.length >= 2,
    agree: form.agree,
  };
  for (const key of Object.keys(checks)) errors[key] = !checks[key];
  return Object.values(checks).every(Boolean);
}

const loadCashfree = () =>
  new Promise<boolean>((resolve) => {
    if ((window as any).Cashfree) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

async function pay() {
  serverError.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    const order: any = await $fetch("/api/pay/start", { method: "POST", body: { code, ...form } });

    if (!(await loadCashfree())) throw new Error("Could not load the payment window. Please try again.");
    const cashfree = (window as any).Cashfree({ mode: order.environment === "PRODUCTION" ? "production" : "sandbox" });

    const result = await cashfree.checkout({ paymentSessionId: order.payment_session_id, redirectTarget: "_modal" });

    // Popup closed by the user without paying — stay on the form.
    if (result?.error && !result?.paymentDetails) {
      serverError.value = result.error.message || "Payment was not completed.";
      return;
    }
    // Paid (or unknown) — the status page confirms with Cashfree.
    await navigateTo(`/pay/status?order_id=${encodeURIComponent(order.order_id)}`);
  } catch (e: any) {
    serverError.value = e?.data?.message || e?.message || "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.pay-page {
  --purple: #61358f;
  --purple-dark: #4e2a75;
  --lavender: #e7e2ee;
  --border: #d7d7de;
  --text: #1f1f2b;
  --muted: #8a8a96;
  --danger: #d32f2f;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--text);
  background-color: #ececf1;
  background-image: repeating-linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 0 180px,
    rgba(255, 255, 255, 0.45) 180px 260px
  );
}

.pay-shell {
  width: 100%;
  max-width: 900px;
  display: grid;
  grid-template-columns: 392px 1fr;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(40, 20, 70, 0.12);
}
.pay-missing { display: block; max-width: 520px; padding: 48px 24px; text-align: center; }

/* ── Left column ───────────────────────────────────────────────────────── */
.pay-side {
  display: flex;
  flex-direction: column;
  background: var(--lavender);
  border-radius: 10px;
  overflow: hidden;
}
.pay-brand {
  position: relative;
  background: var(--purple);
  color: #fff;
  text-align: center;
  padding: 44px 20px 22px;
  border-radius: 10px;
}
.pay-brand img { display: block; margin: 0 auto 10px; border-radius: 6px; }
.pay-brand h2 { margin: 0; color: #fff; font-family: inherit; font-size: 1.45rem; font-weight: 600; letter-spacing: 0.2px; }
.pay-secured {
  position: absolute;
  top: 14px;
  right: 18px;
  font-size: 0.72rem;
  opacity: 0.9;
}
.pay-secured em { font-weight: 700; font-style: italic; }

.pay-desc {
  margin: 0;
  padding: 22px 20px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.55;
  flex: 1;
}

.pay-contact {
  margin: 0 20px 20px;
  padding: 18px 20px 22px;
  background: #fff;
  border-radius: 10px;
}
.pay-contact h3 { margin: 0 0 12px; font-size: 1rem; font-weight: 600; }
.pay-contact a {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  word-break: break-all;
}
.pay-contact a i { font-size: 1.35rem; flex-shrink: 0; }
.pay-contact .pay-web { color: var(--purple); }
.pay-contact .pay-follow { margin-top: 28px; }
.pay-social { display: flex; gap: 22px; }
.pay-social a { margin: 0; }
.pay-social a i { font-size: 1.9rem; }
.pay-social .ig i { color: #e4405f; }
.pay-social .in i { color: #0a66c2; }
.pay-social .fb i { color: #1877f2; }

/* ── Right column ──────────────────────────────────────────────────────── */
.pay-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
}
.pay-panel {
  border: 1px solid #ededf2;
  border-radius: 10px;
  padding: 18px 20px;
  background: #fff;
}
.pay-panel h1 { margin: 0 0 10px; font-size: 1.05rem; font-weight: 500; }
.pay-amount { font-size: 1.2rem; font-weight: 600; }

.pay-fields { display: flex; flex-direction: column; gap: 18px; padding-bottom: 22px; }
.pay-field { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.pay-field label { font-size: 0.98rem; font-weight: 500; }
.pay-field label b { color: var(--danger); font-weight: 500; }
.pay-field input,
.pay-field textarea,
.pay-field select,
.pay-phone {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: #fff;
  font: inherit;
  font-size: 1rem;
  color: var(--text);
  transition: border-color 0.15s, box-shadow 0.15s;
}
.pay-field input,
.pay-field textarea,
.pay-field select { padding: 13px 14px; }
.pay-field input,
.pay-field select,
.pay-phone { height: 54px; }
.pay-phone input { height: 100%; }
.pay-field textarea { resize: vertical; min-height: 56px; }
.pay-field input::placeholder,
.pay-field textarea::placeholder { color: #a3a3ad; }
.pay-field select.empty { color: #a3a3ad; }
.pay-field input:focus,
.pay-field textarea:focus,
.pay-field select:focus,
.pay-phone:focus-within {
  outline: none;
  border-color: var(--purple);
  box-shadow: 0 0 0 3px rgba(97, 53, 143, 0.12);
}
.pay-phone { display: flex; align-items: stretch; overflow: hidden; }
.pay-phone span {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-right: 1px solid var(--border);
  font-weight: 500;
}
.pay-phone input { border: 0; border-radius: 0; box-shadow: none !important; }
.pay-field.invalid input,
.pay-field.invalid textarea,
.pay-field.invalid select,
.pay-field.invalid .pay-phone { border-color: var(--danger); }
.pay-field small,
.pay-error { color: var(--danger); font-size: 0.85rem; }

.pay-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.pay-agree-panel { padding: 16px 20px; }
.pay-agree { display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: 500; margin: 0; }
.pay-agree input { width: 18px; height: 18px; accent-color: var(--purple); cursor: pointer; }
.pay-agree .pay-link { color: var(--purple) !important; font-weight: 600; text-decoration: underline !important; text-underline-offset: 3px; }
.pay-agree .pay-link:hover { color: var(--purple-dark) !important; }
.pay-agree-panel .pay-error { display: block; margin-top: 6px; }

.pay-server-error { margin: 0; padding: 0 4px; }

.pay-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border: 0;
  border-radius: 10px;
  background: var(--purple);
  color: #fff;
  font: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.pay-btn:hover:not(:disabled) { background: var(--purple-dark); }
.pay-btn:active:not(:disabled) { transform: translateY(1px); }
.pay-btn:disabled { opacity: 0.75; cursor: wait; }
.pay-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: pay-spin 0.7s linear infinite;
}
@keyframes pay-spin { to { transform: rotate(360deg); } }

/* ── Mobile ────────────────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .pay-page { padding: 0; align-items: stretch; }
  .pay-shell { grid-template-columns: 1fr; align-content: start; border-radius: 0; box-shadow: none; }
  .pay-side { display: contents; }
  .pay-brand { order: 1; padding-top: 40px; }
  .pay-desc { order: 2; background: var(--lavender); border-radius: 10px; flex: none; }
  .pay-main { order: 3; }
  .pay-contact { order: 4; margin: 0; background: var(--lavender); }
  .pay-row { grid-template-columns: 1fr; }
}
</style>
