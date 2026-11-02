<template>
  <div class="pay-page">
    <div class="pay-card">
      <header class="pay-header">
        <img src="/img/pay-logo.jpg" alt="GCC School" width="48" height="48" />
        <div>
          <small>Paying to</small>
          <strong>GCC School</strong>
        </div>
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
useHead({ title: "Payment Status | GCC School", meta: [{ name: "robots", content: "noindex, nofollow" }] });

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
.pay-page { --purple: #61358f; min-height: 100vh; background: #f3f4f7; padding: 32px 16px; color: #2b2b3a; }
.pay-card { max-width: 640px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 30px rgba(0, 0, 0, 0.08); }
.pay-header { display: flex; align-items: center; gap: 16px; background: var(--purple); color: #fff; padding: 20px 24px; }
.pay-header img { border-radius: 4px; }
.pay-header small { display: block; opacity: 0.85; }
.pay-header strong { font-size: 1.25rem; font-weight: 600; }
.pay-status { padding: 40px 24px; text-align: center; }
.pay-status h1 { font-size: 1.5rem; margin: 12px 0; }
.pay-status p { color: #555; line-height: 1.6; }
.pay-icon i { font-size: 4rem; }
.pay-icon.ok i { color: #2e7d32; }
.pay-icon.fail i { color: #c62828; }
dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 16px; text-align: left; max-width: 440px; margin: 24px auto 0; font-size: 0.9rem; }
dt { color: #777; }
dd { margin: 0; font-family: monospace; word-break: break-all; }
.pay-btn { display: inline-block; margin-top: 16px; background: var(--purple); color: #fff; padding: 12px 32px; border-radius: 6px; text-decoration: none; }
.pay-spinner { width: 48px; height: 48px; margin: 0 auto; border: 4px solid #e2d9f3; border-top-color: var(--purple); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 768px) { .pay-page { padding: 0; } .pay-card { border-radius: 0; } }
</style>
