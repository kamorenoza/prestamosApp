import { utils } from "@/shared/utils"

function formatDate (dateStr) {
  return utils.formatDate(dateStr)
}

function formatNumber (number) {
  return utils.formatNumber(number)
}

function formatDateMonthYear (number) {
  return utils.formatDateMonthYear(number)
}

export default {
  install (Vue) {
    Vue.filter('formatDate', formatDate)
    Vue.filter('formatNumber', formatNumber)
    Vue.filter('formatDateMonthYear', formatDateMonthYear)
  }
}
