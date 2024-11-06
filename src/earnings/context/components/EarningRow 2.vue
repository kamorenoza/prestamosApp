<template>
  <div class="mb-3">
    <p class="text-book">{{ earning.name }}</p>
    <div class="d-flex align-items-center">
      <div class="icon-earnings"></div>
      <div>
        <p class="text-li mb-1">{{ earning.date | formatDate }}</p>
        <p class="text-li text-book">$ {{ earning.interes | formatNumber }}</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EarningRow",

  props: {
    earning: {
      type: Object
    }
  }
}
</script>
