import moment from 'moment'
import {  monthsToString } from './constants'

function startLoading() {
  document.body.classList.add("loading");
}

function stopLoading() {
  document.body.classList.remove("loading");
}

function onlyNumber(value) {
  const number = value ? value.toString().replace(/[^\d]/g, "") : "";

  return number ? new Intl.NumberFormat("de-DE").format(parseInt(number)) : "";
}

function onlyNumberDoc(value) {
  return value ? value.toString().replace(/[^\d]/g, "") : "";
}

function normalizeText(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatNumber (number) {
  return new Intl.NumberFormat('de-DE').format(parseInt(number))
}

function formatDate (dateStr) {
  moment.locale('es-US')
  const date = moment(dateStr)

  const dayNumber = date.date()
  const month = monthsToString(date.month() + 1)
  const year = date.year()

  return `${dayNumber} ${month} ${year}`
}

function pad (numberToPad, size) {
  let number = numberToPad.toString()

  while (number.length < (size || 2)) {
    number = "0" + number
  }
  return number
}

function getUId () {
  const id = Date.now().toString(32) + Math.random().toString(16)
  return String(id).replace(/\./g, '')
}

function sumDays (dateStr, days) {
  if (!days) days = 0

  moment.locale('es-US')
  const date = moment(dateStr)
  const newDate = moment(date).add(parseInt(days), 'd')

  return newDate.format('YYYY-MM-DD')
}

function subtractDays (dateStr, days) {
  if (!days) days = 0

  moment.locale('es-US')
  const date = moment(dateStr)
  const newDate = moment(date).subtract(parseInt(days), 'd')

  return newDate.format('YYYY-MM-DD')
}

function sumMonths (dateStr, months) {
  if (!months) months = 0

  moment.locale('es-US')
  const date = moment(dateStr)
  const newDate = moment(date).add(parseInt(months), 'M')

  return newDate.format('YYYY-MM-DD')
}

function subtractMonths (dateStr, months) {
  if (!months) months = 0

  moment.locale('es-US')
  const date = moment(dateStr)
  const newDate = moment(date).subtract(parseInt(months), 'M')

  return newDate.format('YYYY-MM-DD')
}

function formatDateMonthYear (dateStr) {
  moment.locale('es-US')

  const date = moment(dateStr)
  const month = monthsToString(date.month() + 1)
  const year = date.year()

  return `${month} ${year}`
}

function getLastDay (date) {
  return moment(date).endOf('month').format('YYYY-MM-DD').toString()
}

function getFirstDay (date) {
  return moment(date).startOf('month').format('YYYY-MM-DD').toString()
}

export const utils = {
  startLoading,
  stopLoading,
  onlyNumber,
  onlyNumberDoc,
  normalizeText,
  formatNumber,
  formatDate,
  pad,
  getUId,
  sumDays,
  subtractDays,
  sumMonths,
  subtractMonths,
  formatDateMonthYear,
  getLastDay,
  getFirstDay
}
