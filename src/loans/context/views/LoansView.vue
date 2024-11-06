<template>
  <div>
    <title-general title="Préstamos" />

    <content-general
      buttonText="Nuevo préstamo"
      :buttonAction="goToSave"
      has-filters
    >
      <loans-filters />
      <search-input v-model="search" label="Buscar" />

      <loans-total :total="loans.total" />

      <div class="l-loans">
        <loan-row
          v-for="loan in loans.loansFilter"
          :key="loan.id"
          :loan="loan"
          :name="getName(loan.clientId)"
          back-route="/loans"
        />
      </div>
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral";
import ContentGeneral from "@/shared/components/ContentGeneral";
import SearchInput from "@/shared/components/SearchInput";
import LoansFilters from "@/loans/context/components/LoansFilters";
import LoansUc from "@/loans/usecases/loansUc";
import { mapMutations, mapState } from "vuex";
import LoansTotal from "@/loans/context/components/LoansTotal";
import LoanRow from "@/loans/context/components/LoanRow";
import ClientsUc from "@/clients/usecases/clientsUc";

export default {
  name: "LoansView",

  components: {
    LoanRow,
    LoansTotal,
    LoansFilters,
    SearchInput,
    ContentGeneral,
    TitleGeneral
  },

  data () {
    return {
      search: '',
      uc: new LoansUc(),
      clientsUc: new ClientsUc()
    }
  },

  watch: {
    filterSelected () {
      this.init()
    },

    search () {
      this.init()
    }
  },

  computed: {
    ...mapState('loansStore', ['filterSelected', 'loans'])
  },

  methods: {
    goToSave () {
      this.$router.push("/clients")
    },

    init () {
      this.setLoans(this.uc.getAllLoans(this.filterSelected, this.search))
      this.setBackMainRoute('/loans')
      this.setBackRoute('/loans')
    },

    getName (clientId) {
      const client = this.clientsUc.getClientById(clientId)

      return client.name
    },

    ...mapMutations('loansStore', ['setLoans', 'setBackRoute', 'setBackMainRoute'])
  },

  created() {
    this.init()
  }
}
</script>
