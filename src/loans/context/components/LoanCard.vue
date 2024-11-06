<template>
  <div class="o-detail-loan__card">
    <div class="o-detail-loan__card-item">
      <p class="o-card__text-gray">Pendiente</p>
      <p class="amount"><span class="point point--danger" /> $ {{ parseInt(balance) - parseInt(totalAmount) | formatNumber }}</p>
    </div>
    <div class="o-detail-loan__card-item">
      <p class="o-card__text-gray">Pagado</p>
      <p class="amount"><span class="point point--success" /> $ {{ totalAmount | formatNumber }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoanCard",

  props: {
    balance: {
      type: [Number, String],
      default: 0
    },

    totalAmount: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>
