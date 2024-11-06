<template>
  <div class="m-loan-total">
    <div class="m-loan-total__icon">
      <f-icon icon="fa-hand-holding-dollar" />
    </div>

    <div>
      <p class="m-loan-total__subtitle">Saldo general:</p>
      <p class="m-loan-total__text">$ {{ total | formatNumber }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoansTotal",

  props: {
    total: {
      type: [ String, Number ],
      default: 0
    }
  }
}
</script>

