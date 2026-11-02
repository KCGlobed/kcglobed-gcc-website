<template>
  <div class="pay-page">
    <div class="pay-card">
      <header class="pay-header">
        <img src="/img/pay-logo-white.png" alt="GCC School" height="52" />
        <span class="pay-chip"><i class="ti ti-lock"></i>Secured by Cashfree</span>
      </header>

      <section class="pay-status">
        <template v-if="state === 'PAID'">
          <div class="pay-icon ok"><i class="ti ti-circle-check"></i></div>
          <h1>Payment Successful</h1>
          <p>Thank you{{ info?.first_name ? `, ${info.first_name}` : "" }}! We received
            <strong>₹{{ formatInr(info?.amount || 0) }}</strong> for {{ info?.title }}.</p>
          <p>Your invoice will be emailed to <strong>{{ info?.email_masked }}</strong> within a few minutes.</p>
          <dl>
            <dt>Invoice number</dt><dd>{{ info?.order_id }}</dd>
            <dt>Receipt number</dt><dd>{{ info?.payment_id }}</dd>
          </dl>
        </template>

        <template v-else-if="state === 'FAILED'">
          <div class="pay-icon fail"><i class="ti ti-circle-x"></i></div>
          <h1>Payment Failed</h1>
          <p>No money was deducted. If it was, it will be refunded automatically by your bank.</p>
          <NuxtLink v-if="info?.plan_code" :to="`/pay/${info.plan_code}`" class="pay-btn">Try Again</NuxtLink>
        </template>

        <template v-else-if="state === 'ERROR'">
          <div class="pay-icon fail"><i class="ti ti-alert-circle"></i></div>
          <h1>Could not find this payment</h1>
          <p>{{ message }}</p>
        </template>

        <template v-else>
          <div class="pay-spinner" aria-hidden="true"></div>
          <h1>Confirming your payment…</h1>
          <p v-if="slow">This is taking longer than usual. If money was deducted, you will receive the
            invoice by email once the bank confirms. You can close this page.</p>
          <p v-else>Please do not close this page.</p>
        </template>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "blank" });
useHead({
  title: "Payment Status | GCC School",
  meta: [{ name: "robots", content: "noindex, nofollow" }, { name: "theme-color", content: "#3d0f5e" }],
  link: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" }],
});

const route = useRoute();
const orderId = String(route.query.order_id || "");

const state = ref<"PENDING" | "PAID" | "FAILED" | "ERROR">("PENDING");
const info = ref<any>(null);
const message = ref("");
const slow = ref(false);

const formatInr = (n: number) => new Intl.NumberFormat("en-IN").format(n);

let timer: ReturnType<typeof setTimeout> | null = null;
let attempts = 0;

async function check() {
  attempts++;
  try {
    const res: any = await $fetch("/api/pay/verify", { query: { order_id: orderId } });
    info.value = res;
    state.value = res.status;
  } catch (e: any) {
    if (e?.statusCode === 404) {
      state.value = "ERROR";
      message.value = "Please check the link or contact GCC School.";
      return;
    }
  }
  if (state.value === "PENDING") {
    if (attempts >= 10) slow.value = true;
    if (attempts < 40) timer = setTimeout(check, 3000);
  }
}

onMounted(() => {
  if (!orderId) {
    state.value = "ERROR";
    message.value = "Missing order reference.";
    return;
  }
  check();
});
onBeforeUnmount(() => timer && clearTimeout(timer));
</script>

<style scoped>
.pay-page {
  --purple: #521778;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  color: #2b2b3a;
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
  background:
    radial-gradient(900px 500px at 8% 6%, rgba(217, 166, 46, 0.22), transparent 60%),
    radial-gradient(800px 600px at 95% 95%, rgba(160, 90, 230, 0.35), transparent 60%),
    linear-gradient(135deg, #2a0b45 0%, #4a1570 50%, #2f0c4d 100%);
  background-attachment: fixed;
}
.pay-card { width: 100%; max-width: 600px; margin: 0 auto; background: #fff; border-radius: 22px; overflow: hidden; box-shadow: 0 30px 80px rgba(10, 0, 25, 0.45); }
.pay-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: linear-gradient(135deg, #5b1d88, #3d0f5e); color: #fff; padding: 16px 24px; }
.pay-header img { height: 52px; width: auto; margin-left: -8px; }
.pay-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.18); font-size: 0.74rem; font-weight: 600; white-space: nowrap; }
.pay-chip i { color: #d9a62e; }
.pay-status { padding: 40px 24px; text-align: center; }
.pay-status h1 { font-size: 1.5rem; margin: 12px 0; }
.pay-status p { color: #555; line-height: 1.6; }
.pay-icon i { font-size: 4rem; }
.pay-icon.ok i { color: #2e7d32; }
.pay-icon.fail i { color: #c62828; }
dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; text-align: left; max-width: 440px; margin: 24px auto 0; font-size: 0.9rem; }
dt { color: #777; }
dd { margin: 0; font-family: monospace; word-break: break-all; }
.pay-btn { display: inline-block; margin-top: 16px; background: linear-gradient(135deg, #6a2a9a, var(--purple)); color: #fff; padding: 13px 34px; border-radius: 12px; font-weight: 700; text-decoration: none; }
.pay-spinner { width: 48px; height: 48px; margin: 0 auto; border: 4px solid #e2d9f3; border-top-color: var(--purple); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 768px) { .pay-page { padding: 0; align-items: stretch; } .pay-card { border-radius: 0; } }
</style>
