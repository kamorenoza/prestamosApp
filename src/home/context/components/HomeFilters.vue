<template>
  <div class="m-filters">
    <div @click="setFilterSelected(maxi)" :class="classSelected(maxi)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-up-long" />
      </div>
      <div>
        <p class="m-filters__title">Maxi</p>
      </div>
    </div>

    <div @click="setFilterSelected(all)" :class="classSelected(all)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-ellipsis-vertical" />
      </div>
      <div>
        <p class="m-filters__title">Todos</p>
      </div>
    </div>

    <div @click="setFilterSelected(mini)" :class="classSelected(mini)" class="m-filters__item">
      <div class="m-filters__icon">
        <f-icon icon="fa-down-long" />
      </div>
      <div>
        <p class="m-filters__title">Mini</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TYPE_MAXI, TYPE_MINI, TYPE_OTHERS } from "@/shared/constants"
import { mapMutations, mapState } from "vuex"

export default {
  name: "HomeFilters",

  computed: {
    maxi () {
      return TYPE_MAXI
    },

    mini () {
      return TYPE_MINI
    },

    all () {
      return TYPE_OTHERS
    },

    ...mapState('homeStore', ['filterSelected'])
  },

  methods: {
    classSelected (item) {
      return this.filterSelected === item ? 'm-filters--selected' : ''
    },

    ...mapMutations('homeStore', ['setFilterSelected'])
  }
}
</script>
