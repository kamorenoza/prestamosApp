<template>
  <div>
    <title-general title="Clientes" />

    <content-general
      buttonText="Nuevo cliente"
      :buttonAction="goToSave"
      is-search
    >
      <search-input v-model="search" label="Buscar cliente" />

      <client-row v-for="client in clients" :key="client.id" :client="client" />
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue";
import ContentGeneral from "@/shared/components/ContentGeneral.vue";
import SearchInput from "@/shared/components/SearchInput.vue";
import ClientsUc from "@/clients/usecases/clientsUc";
import { mapMutations, mapState } from "vuex";
import ClientRow from "../compoonents/ClientRow.vue";

export default {
  components: {
    TitleGeneral,
    ContentGeneral,
    SearchInput,
    ClientRow,
  },

  data() {
    return {
      search: "",
      uc: new ClientsUc(),
    };
  },

  watch: {
    search(value) {
      this.setClients(this.uc.getClientsByFilter(value));
    },
  },

  computed: {
    ...mapState("clientsStore", ["clients"]),
  },

  methods: {
    goToSave() {
      this.$router.push("/save-client");
    },

    init ()  {
      this.setClients(this.uc.getAllClients());
      this.setClientSelected(null);
      this.setLoanSelected(null)
      this.setBackMainRoute('/clients')
      this.setBackRoute('/clients')
    },

    ...mapMutations("clientsStore", ["setClients", "setClientSelected"]),
    ...mapMutations('loansStore', ['setLoanSelected', 'setBackRoute', 'setBackMainRoute'])
  },

  created() {
    this.init()
  },
};
</script>
