<template>
  <div>
    <title-general :title="title" :buttonBack="buttonBack" />

    <content-general buttonText="Guardar" :buttonAction="save">
      <input-general
        v-model="name"
        :validate="validate"
        class="border-bottom pl-2"
        label="Nombre completo"
        icon="fa-user"
      />
      <input-general
        v-model="document"
        :validate="validate"
        is-document
        :max="15"
        class="border-bottom pl-2"
        label="Cédula"
        icon="fa-id-card"
      />
      <input-general
        v-model="mobile"
        :validate="validate"
        is-document
        :max="15"
        class="border-bottom pl-2"
        label="Celular"
        icon="fa-mobile-screen"
      />
      <input-general
        v-model="tel"
        class="border-bottom pl-2"
        is-document
        :max="10"
        label="Fijo"
        icon="fa-phone"
      />
      <input-general
        v-model="address"
        :validate="validate"
        class="border-bottom pl-2"
        label="Dirección"
        icon="fa-map-pin"
      />
      <input-general
        v-model="nbh"
        :validate="validate"
        class="border-bottom pl-2"
        label="Barrio"
        icon="fa-map-pin"
      />
      <input-general
        v-model="comments"
        class="border-bottom pl-2"
        label="Comentarios"
        icon="fa-message"
      />
    </content-general>
  </div>
</template>

<script>
import TitleGeneral from "@/shared/components/TitleGeneral.vue";
import ContentGeneral from "@/shared/components/ContentGeneral.vue";
import InputGeneral from "@/shared/components/InputGeneral.vue";
import ClientsUc from "@/clients/usecases/clientsUc";
import { mapMutations, mapState } from "vuex";
import { notification } from "@/shared/notification";

export default {
  components: {
    TitleGeneral,
    ContentGeneral,
    InputGeneral,
  },

  data() {
    return {
      name: "",
      document: "",
      mobile: "",
      tel: "",
      address: "",
      nbh: "",
      comments: "",
      id: "",
      validate: false,
      uc: new ClientsUc(),
    };
  },

  computed: {
    title() {
      return this.id ? "Editar cliente" : "Nuevo cliente";
    },

    isValidData() {
      return (
        this.name && this.document && this.mobile && this.address && this.nbh
      );
    },

    buttonBack() {
      return this.clientSelected ? "/detail-client" : "/clients";
    },

    ...mapState("clientsStore", ["clientSelected"]),
  },

  methods: {
    async save() {
      this.validate = true;

      if (this.isValidData) {
        if (this.uc.getClientByDocument(this.document) && !this.id) {
          return notification.notify("Cliente ya existe");
        }

        const response = this.uc.saveClient(
          this.name,
          this.document,
          this.mobile,
          this.tel,
          this.address,
          this.nbh,
          this.comments,
          this.id
        );

        this.setClients(response.clients);
        this.setClientSelected(response.client);

        await notification.notify("Cliente guardado correctamente");
        this.$router.push("/detail-client");
      }
    },

    fillData() {
      if (this.clientSelected) {
        this.name = this.clientSelected.name;
        this.document = this.clientSelected.document;
        this.mobile = this.clientSelected.mobile;
        this.tel = this.clientSelected.tel;
        this.address = this.clientSelected.address;
        this.nbh = this.clientSelected.nbh;
        this.comments = this.clientSelected.comments;
        this.id = this.clientSelected.id;
      }
    },

    ...mapMutations("clientsStore", ["setClients", "setClientSelected"]),
  },

  created() {
    this.fillData();
  },
};
</script>
