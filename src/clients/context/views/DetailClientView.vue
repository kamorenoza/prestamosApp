<template>
  <div>
    <title-general title="" buttonBack="/clients" />
    <div class="m-photo"></div>

    <content-general>
      <div class="o-detail-client">
        <div class="o-detail-client__header">
          <p class="o-detail-client__name">{{ clientSelected.name }}</p>
          <p class="o-detail-client__text">{{ clientSelected.document }}</p>
        </div>

        <client-actions />

        <div class="o-detail-client__body">
          <p class="o-detail-client__title">Datos de contacto</p>

          <p class="o-detail-client__label">Celular</p>
          <p class="o-detail-client__data">{{ clientSelected.mobile }}</p>

          <p class="o-detail-client__label" v-if="clientSelected.tel">
            Teléfono fijo
          </p>
          <p class="o-detail-client__data" v-if="clientSelected.tel">
            {{ clientSelected.tel }}
          </p>

          <p class="o-detail-client__label">Dirección</p>
          <p class="o-detail-client__data">{{ clientSelected.address }}</p>

          <p class="o-detail-client__label">Barrio</p>
          <p class="o-detail-client__data">{{ clientSelected.nbh }}</p>

          <p class="o-detail-client__label" v-if="clientSelected.comments">
            Comentarios
          </p>
          <p class="o-detail-client__data" v-if="clientSelected.comments">
            {{ clientSelected.comments }}
          </p>
        </div>
      </div>
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue";
import ContentGeneral from "@/shared/components/ContentGeneral.vue";
import { mapMutations, mapState } from "vuex";
import ClientActions from "../compoonents/ClientActions.vue";

export default {
  components: {
    TitleGeneral,
    ContentGeneral,
    ClientActions,
  },

  computed: {
    ...mapState("clientsStore", ["clientSelected"]),
  },

  methods: {
    validateClient() {
      if (!this.clientSelected) this.$router.push("/clients");
    },

    ...mapMutations("clientsStore", ["setClientSelected"]),
    ...mapMutations('loansStore', ['setLoanSelected'])
  },

  created() {
    this.validateClient();
    this.setLoanSelected(null)
  },
};
</script>
