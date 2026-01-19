<template>
  <div class="pre-payment-declaration-area pb-50">
    <div class="container">
      <div class="section-title">
        <h2>Pre-Payment Declaration</h2>
        <p>Before payment, applicant must accept all declarations.</p>
      </div>
      <div class="declaration-content pt-20">
         <form>
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="dec1">
                <label class="form-check-label" for="dec1">
                    I hereby declare that all personal, academic, and professional information submitted by me is true, complete, and accurate to the best of my knowledge.
                </label>
            </div>
             <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="dec2">
                <label class="form-check-label" for="dec2">
                    I understand that my eligibility will be verified at multiple stages, including document verification, exam, interview, and enrollment.
                </label>
            </div>
             <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="dec3">
                <label class="form-check-label" for="dec3">
                   I acknowledge that submission of application or payment of fees does not guarantee selection or admission to GCC School.
                </label>
            </div>
             <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="dec4">
                <label class="form-check-label" for="dec4">
                    I understand that if I am found ineligible, provide incorrect information, or fail verification at any stage, my application may be cancelled without any claim for refund, as per GCC School policy.
                </label>
            </div>
             <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="dec5">
                <label class="form-check-label" for="dec5">
                    If I am a working professional, I confirm that I have disclosed my employment status correctly and understand that full-time availability and resignation from current employment (if selected) is mandatory before enrollment.
                </label>
            </div>
             <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="dec6">
                <label class="form-check-label" for="dec6">
                    I agree to receive all official communication related to NFET, interviews, and admission only via email and GCC School dashboard. Payment button remains disabled until acceptance.
                </label>
            </div>
         </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrePaymentDeclaration",
};
</script>
