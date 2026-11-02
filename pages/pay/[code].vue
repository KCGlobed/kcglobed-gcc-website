<template>
  <div class="pay-page">
    <div class="pay-bg" aria-hidden="true"></div>

    <div v-if="error" class="pay-shell pay-missing">
      <i class="ti ti-file-alert"></i>
      <h1>Payment form not found</h1>
      <p>Please check the link or contact GCC School.</p>
    </div>

    <template v-else-if="data">
      <div class="pay-shell">
        <!-- Mobile-only top bar -->
        <div class="pay-mobilebar">
          <img src="/img/pay-logo-white.png" alt="GCC School" height="46" />
          <span class="pay-chip"><i class="ti ti-lock"></i>Secured by Cashfree</span>
        </div>

        <!-- ── Left: brand + program + trust + contact ─────────────────────── -->
        <aside class="pay-side">
          <div class="pay-side-top">
            <img src="/img/pay-logo-white.png" alt="GCC School" class="pay-logo" height="62" />
            <span class="pay-chip"><i class="ti ti-lock"></i>Secured by Cashfree</span>
          </div>

          <p class="pay-eyebrow">{{ data.plan.feeType }}</p>
          <h2 class="pay-title">{{ data.plan.title }}</h2>
          <p class="pay-desc">{{ data.plan.description }}</p>

          <div class="pay-program">
            <span class="pay-program-label">Program</span>
            <strong>{{ data.plan.program }}</strong>
            <div class="pay-tags">
              <span><i class="ti ti-calendar-event"></i>{{ data.plan.cohort }}</span>
              <span><i class="ti ti-armchair"></i>{{ data.plan.feeType }}</span>
            </div>
          </div>

          <ul class="pay-trust">
            <li><i class="ti ti-shield-check"></i>100% secure payment via Cashfree</li>
            <li><i class="ti ti-mail-check"></i>Instant receipt on your email</li>
            <li><i class="ti ti-headset"></i>Admissions support whenever you need it</li>
          </ul>

          <div class="pay-contact">
            <a :href="`tel:+91${data.merchant.phone}`"><i class="ti ti-phone"></i>+91 {{ data.merchant.phone }}</a>
            <a :href="`https://wa.me/91${data.merchant.whatsapp}`" target="_blank" rel="noopener">
              <i class="ti ti-brand-whatsapp"></i>+91 {{ data.merchant.whatsapp }}
            </a>
            <a :href="`mailto:${data.merchant.email}`"><i class="ti ti-mail"></i>{{ data.merchant.email }}</a>
            <a :href="data.merchant.website" target="_blank" rel="noopener"><i class="ti ti-world"></i>{{ websiteLabel }}</a>
            <div class="pay-social">
              <a :href="data.merchant.instagram" target="_blank" rel="noopener" aria-label="Instagram"><i class="ti ti-brand-instagram"></i></a>
              <a :href="data.merchant.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="ti ti-brand-linkedin"></i></a>
              <a :href="data.merchant.facebook" target="_blank" rel="noopener" aria-label="Facebook"><i class="ti ti-brand-facebook"></i></a>
            </div>
          </div>
        </aside>

        <!-- ── Right: amount + form ──────────────────────────────────────────── -->
        <form class="pay-main" novalidate @submit.prevent="pay">
          <div class="pay-head">
            <h1>Complete your payment</h1>
            <p>Fill in your details to reserve your seat.</p>
          </div>

          <div class="pay-summary">
            <div>
              <span class="pay-summary-label">Amount payable</span>
              <span class="pay-summary-item">{{ data.plan.feeType }} · {{ data.plan.program }}</span>
            </div>
            <div class="pay-summary-amount">₹{{ formatInr(data.plan.amount) }}</div>
          </div>

          <div class="pay-fields">
            <div class="pay-field" :class="{ invalid: errors.name }">
              <label for="pf-name">Full Name <b>*</b></label>
              <div class="pay-input">
                <i class="ti ti-user"></i>
                <input id="pf-name" v-model.trim="form.name" type="text" placeholder="Eg. Ashok Kumar" autocomplete="name" />
              </div>
              <small v-if="errors.name"><i class="ti ti-alert-circle"></i>Enter your full name</small>
            </div>

            <div class="pay-field" :class="{ invalid: errors.email }">
              <label for="pf-email">Email ID <b>*</b></label>
              <div class="pay-input">
                <i class="ti ti-mail"></i>
                <input id="pf-email" v-model.trim="form.email" type="email" placeholder="Eg. ashok.kumar@gmail.com" autocomplete="email" />
              </div>
              <small v-if="errors.email"><i class="ti ti-alert-circle"></i>Enter a valid email — your receipt is sent here</small>
            </div>

            <div class="pay-field" :class="{ invalid: errors.phone }">
              <label for="pf-phone">Phone Number <b>*</b></label>
              <div class="pay-input pay-phone">
                <span>+91</span>
                <input id="pf-phone" v-model="form.phone" type="tel" inputmode="numeric" maxlength="10"
                  placeholder="98XXXXXXX8" autocomplete="tel-national" />
              </div>
              <small v-if="errors.phone"><i class="ti ti-alert-circle"></i>Enter a valid 10-digit mobile number</small>
            </div>
          </div>

          <label class="pay-agree" :class="{ invalid: errors.agree }">
            <input v-model="form.agree" type="checkbox" />
            <span>I agree to the <a href="/terms-conditions" target="_blank" rel="noopener" class="pay-link">Terms &amp; Conditions</a>
              and <a href="/refund-policy" target="_blank" rel="noopener" class="pay-link">Refund Policy</a></span>
          </label>

          <div v-if="serverError" class="pay-alert" role="alert">
            <i class="ti ti-info-circle"></i>
            <span>{{ serverError }}</span>
          </div>

          <button type="submit" class="pay-btn" :disabled="loading">
            <template v-if="loading"><span class="pay-spin"></span>Opening secure payment…</template>
            <template v-else><i class="ti ti-lock"></i>Pay ₹{{ formatInr(data.plan.amount) }} securely<i class="ti ti-arrow-right"></i></template>
          </button>

          <div class="pay-methods">
            <span><i class="ti ti-shield-lock"></i>Payments secured by <strong>Cashfree</strong></span>
            <span class="pay-method-list">
              <span>UPI</span><span>Cards</span><span>Net Banking</span><span>Wallets</span>
            </span>
          </div>
        </form>
      </div>

      <footer class="pay-footer">
        <span>© {{ year }} GCC School</span>
        <a href="/terms-conditions" target="_blank" rel="noopener">Terms</a>
        <a href="/privacy-policy" target="_blank" rel="noopener">Privacy</a>
        <a href="/refund-policy" target="_blank" rel="noopener">Refunds</a>
      </footer>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "blank" });

const route = useRoute();
const code = String(route.params.code || "").toUpperCase();

const { data, error } = await useFetch(`/api/pay/plan/${code}`);

useHead({
  title: data.value ? `${data.value.plan.title} | GCC School` : "Payment | GCC School",
  meta: [
    { name: "robots", content: "noindex, nofollow" },
    { name: "theme-color", content: "#3d0f5e" },
  ],
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" },
  ],
});

// Indian numbering: 100000 -> 1,00,000
const formatInr = (n: number) => new Intl.NumberFormat("en-IN").format(n);
const year = new Date().getFullYear();
const websiteLabel = computed(() =>
  String(data.value?.merchant.website || "").replace(/^https?:\/\//, "").replace(/\/$/, ""),
);

const form = reactive({ name: "", email: "", phone: "", agree: false });
const errors = reactive<Record<string, boolean>>({});
const loading = ref(false);
const serverError = ref("");
const submitted = ref(false);

// Phone: digits only, max 10
watch(() => form.phone, (v) => {
  const clean = String(v || "").replace(/\D/g, "").slice(0, 10);
  if (clean !== v) form.phone = clean;
});

function validate() {
  const checks: Record<string, boolean> = {
    name: form.name.length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email),
    phone: /^[6-9]\d{9}$/.test(form.phone),
    agree: form.agree,
  };
  for (const key of Object.keys(checks)) errors[key] = !checks[key];
  return Object.values(checks).every(Boolean);
}

// After the first submit, errors clear live as the user fixes them.
watch(form, () => { if (submitted.value) validate(); });

const loadCashfree = () =>
  new Promise<boolean>((resolve) => {
    if ((window as any).Cashfree) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function friendlyCheckoutError(message = "") {
  if (/abort|cancel|clos/i.test(message)) return "Payment was cancelled. No money was deducted — you can try again.";
  return message || "Payment was not completed. Please try again.";
}

async function pay() {
  submitted.value = true;
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
      serverError.value = friendlyCheckoutError(result.error.message);
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
  --purple: #521778;
  --purple-2: #6a2a9a;
  --purple-deep: #2a0b45;
  --gold: #d9a62e;
  --gold-soft: #f6e7c1;
  --lavender: #f5effa;
  --border: #dcd6e6;
  --text: #1d1a26;
  --muted: #6f6a7d;
  --danger: #d32f2f;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 16px 24px;
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--text);
  background: var(--purple-deep);
  overflow-x: hidden;
}

/* Themed background: purple gradient, gold + violet glows, faint dot grid */
.pay-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(900px 500px at 8% 6%, rgba(217, 166, 46, 0.22), transparent 60%),
    radial-gradient(800px 600px at 95% 95%, rgba(160, 90, 230, 0.35), transparent 60%),
    linear-gradient(135deg, #2a0b45 0%, #4a1570 50%, #2f0c4d 100%);
}
.pay-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
}
.pay-bg::after {
  content: "";
  position: absolute;
  width: 520px;
  height: 520px;
  right: -160px;
  top: -180px;
  border-radius: 50%;
  border: 70px solid rgba(217, 166, 46, 0.07);
}

.pay-shell {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 980px;
  display: grid;
  grid-template-columns: 400px 1fr;
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(10, 0, 25, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.06);
}
.pay-missing { display: block; max-width: 520px; padding: 56px 24px; text-align: center; }
.pay-missing i { font-size: 3rem; color: var(--purple); }
.pay-missing h1 { font-size: 1.4rem; margin: 12px 0 6px; }
.pay-missing p { color: var(--muted); margin: 0; }

.pay-mobilebar { display: none; }

.pay-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 0.74rem;
  font-weight: 600;
  white-space: nowrap;
}
.pay-chip i { font-size: 0.9rem; color: var(--gold); }

/* ── Left column ───────────────────────────────────────────────────────── */
.pay-side {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 32px 28px;
  color: #fff;
  background:
    radial-gradient(420px 260px at 100% 0%, rgba(217, 166, 46, 0.2), transparent 70%),
    linear-gradient(160deg, #5b1d88 0%, #3d0f5e 100%);
  overflow: hidden;
}
.pay-side::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  left: -110px;
  bottom: -120px;
  border-radius: 50%;
  border: 40px solid rgba(255, 255, 255, 0.05);
  pointer-events: none;
}
.pay-side-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 24px; }
.pay-logo { height: 62px; width: auto; display: block; margin-left: -10px; }

.pay-eyebrow {
  margin: 0 0 8px;
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
}
.pay-title { margin: 0 0 10px; color: #fff; font-family: inherit; font-size: 1.6rem; line-height: 1.25; font-weight: 700; }
.pay-desc { margin: 0 0 22px; color: rgba(255, 255, 255, 0.78); font-size: 0.93rem; line-height: 1.6; }

.pay-program {
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}
.pay-program-label { display: block; font-size: 0.72rem; letter-spacing: 1.2px; text-transform: uppercase; color: rgba(255, 255, 255, 0.6); }
.pay-program strong { display: block; margin: 4px 0 10px; font-size: 1.12rem; }
.pay-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.pay-tags span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(217, 166, 46, 0.16);
  color: var(--gold-soft);
  font-size: 0.78rem;
  font-weight: 600;
}

.pay-trust { list-style: none; margin: 22px 0 0; padding: 0; display: grid; gap: 12px; }
.pay-trust li { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: rgba(255, 255, 255, 0.88); }
.pay-trust i {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--gold);
  font-size: 1.05rem;
}

.pay-contact {
  position: relative;
  z-index: 1;
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: grid;
  gap: 9px;
}
.pay-side .pay-trust + .pay-contact { margin-top: 26px; }
.pay-contact a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.88rem;
  word-break: break-all;
  transition: color 0.15s;
}
.pay-contact a:hover { color: #fff; }
.pay-contact a i { font-size: 1.1rem; color: rgba(255, 255, 255, 0.6); }
.pay-social { display: flex; gap: 10px; margin-top: 6px; }
.pay-social a {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.15s, transform 0.15s;
}
.pay-social a i { margin: 0; color: #fff; font-size: 1.15rem; }
.pay-social a:hover { background: var(--gold); transform: translateY(-2px); }

/* ── Right column ──────────────────────────────────────────────────────── */
.pay-main { display: flex; flex-direction: column; justify-content: center; gap: 18px; padding: 34px 36px 28px; margin: 0; }
.pay-head h1 { margin: 0; font-size: 1.45rem; font-weight: 700; color: var(--text); }
.pay-head p { margin: 4px 0 0; color: var(--muted); font-size: 0.93rem; }

.pay-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  padding: 16px 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--lavender), #fbf8fd);
  border: 1px solid #ebe1f4;
  border-left: 4px solid var(--gold);
}
.pay-summary-label { display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
.pay-summary-item { display: block; margin-top: 3px; font-size: 0.9rem; font-weight: 600; color: var(--text); }
.pay-summary-amount { font-size: 1.75rem; font-weight: 800; color: var(--purple); white-space: nowrap; letter-spacing: -0.5px; }

.pay-fields { display: flex; flex-direction: column; gap: 16px; }
.pay-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.pay-field label { font-size: 0.9rem; font-weight: 600; color: var(--text); margin: 0; }
.pay-field label b { color: var(--danger); font-weight: 600; }
.pay-input {
  display: flex;
  align-items: center;
  height: 52px;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.pay-input > i { padding-left: 15px; font-size: 1.15rem; color: #a59fb3; }
.pay-input input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 14px 0 10px;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 1rem;
  color: var(--text);
}
.pay-input input::placeholder { color: #b0aabd; }
.pay-input:focus-within { border-color: var(--purple); box-shadow: 0 0 0 4px rgba(82, 23, 120, 0.1); }
.pay-input:focus-within > i { color: var(--purple); }
.pay-phone span {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 14px;
  background: #faf8fc;
  border-right: 1.5px solid var(--border);
  font-weight: 600;
  color: var(--text);
}
.pay-phone input { padding-left: 14px; letter-spacing: 0.5px; }
.pay-field.invalid .pay-input { border-color: var(--danger); }
.pay-field.invalid .pay-input:focus-within { box-shadow: 0 0 0 4px rgba(211, 47, 47, 0.1); }
.pay-field small { display: flex; align-items: center; gap: 5px; color: var(--danger); font-size: 0.82rem; }

.pay-agree {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 2px 0 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--muted);
  cursor: pointer;
}
.pay-agree input { flex-shrink: 0; width: 18px; height: 18px; margin: 1px 0 0; accent-color: var(--purple); cursor: pointer; }
.pay-agree.invalid { color: var(--danger); }
.pay-agree .pay-link { color: var(--purple) !important; font-weight: 600; text-decoration: underline !important; text-underline-offset: 3px; }
.pay-agree .pay-link:hover { color: var(--purple-2) !important; }

.pay-alert {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #fff4e5;
  border: 1px solid #ffd8a8;
  color: #8a4b00;
  font-size: 0.9rem;
  line-height: 1.45;
}
.pay-alert i { font-size: 1.15rem; margin-top: 1px; }

.pay-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 56px;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--purple-2), var(--purple));
  color: #fff;
  font: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(82, 23, 120, 0.32);
  transition: transform 0.15s, box-shadow 0.15s, filter 0.15s;
}
.pay-btn i { font-size: 1.15rem; }
.pay-btn .ti-arrow-right { transition: transform 0.15s; }
.pay-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 14px 30px rgba(82, 23, 120, 0.4); filter: brightness(1.06); }
.pay-btn:hover:not(:disabled) .ti-arrow-right { transform: translateX(3px); }
.pay-btn:active:not(:disabled) { transform: translateY(0); }
.pay-btn:disabled { opacity: 0.8; cursor: wait; }
.pay-spin {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: pay-spin 0.7s linear infinite;
}
@keyframes pay-spin { to { transform: rotate(360deg); } }

.pay-methods {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.8rem;
  color: var(--muted);
}
.pay-methods > span:first-child { display: inline-flex; align-items: center; gap: 6px; }
.pay-methods i { font-size: 1rem; color: #2e7d32; }
.pay-method-list { display: inline-flex; flex-wrap: wrap; gap: 6px; }
.pay-method-list span { padding: 3px 8px; border-radius: 6px; background: #f3f1f6; color: #5b5568; font-weight: 600; font-size: 0.72rem; }

.pay-footer {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 18px;
  margin-top: 22px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.55);
}
.pay-footer a { color: rgba(255, 255, 255, 0.7); text-decoration: none; }
.pay-footer a:hover { color: #fff; }

/* ── Mobile ────────────────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .pay-page { padding: 0 0 20px; justify-content: flex-start; }
  .pay-shell { grid-template-columns: 1fr; border-radius: 0 0 22px 22px; box-shadow: 0 20px 50px rgba(10, 0, 25, 0.4); }
  .pay-mobilebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 20px;
    background: linear-gradient(135deg, #5b1d88, #3d0f5e);
  }
  .pay-mobilebar img { height: 46px; width: auto; margin-left: -8px; }
  .pay-main { order: 1; padding: 24px 20px; }
  .pay-side { order: 2; padding: 28px 20px 24px; }
  .pay-side-top { display: none; }
  .pay-title { font-size: 1.35rem; }
  .pay-summary { padding: 14px 16px; }
  .pay-summary-amount { font-size: 1.45rem; }
  .pay-methods { justify-content: center; text-align: center; }
}
</style>
