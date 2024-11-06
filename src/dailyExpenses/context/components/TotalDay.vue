<template>
  <div class="m-expense-footer">
    <div>
      <p class="m-expense-footer__sub">Total gastos del día: </p>
      <p class="m-expense-footer__total">$ {{ total | formatNumber }}</p>
    </div>
    <div>
      <button @click="openModal()" class="button-rounded">
        <f-icon icon="fa-plus" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotalDay",

  props: {
    total: {
      type: [ Number, String ],
      default: 0
    }
  },

  methods: {
    openModal () {
      this.$bvModal.show('addExpenseModal')
    }
  }
}
</script>
