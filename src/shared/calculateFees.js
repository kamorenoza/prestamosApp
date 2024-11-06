import moment from 'moment'
import { utils } from "@/shared/utils";

function getByDay(dateInit, numFees) {
  let data = [];
  let date = moment(dateInit)

  for (let i = 1; i <= numFees; i++) {
    const newDate = moment(date).add(1, 'd')

    data.push(newDate.format('DD-MM-YYYY'))
    date = moment(newDate)
  }

  return data;
}

function getByWeek(dateInit, numFees) {
  let data = [];
  let date = moment(dateInit)

  for (let i = 1; i <= numFees; i++) {
    const newDate = moment(date).add(7, 'd')

    data.push(newDate.format('DD-MM-YYYY'))
    date = moment(newDate)
  }

  return data
}

function getByFortnight(dateInit, numFees) {
  let date = moment(dateInit)

  let day = date.date()
  const month = date.month() + 1
  const year = date.year()

  let data = []

  if (day > 30) day = 30

  let dayFirstFee = day + 15
  if (dayFirstFee > 30) dayFirstFee = dayFirstFee - 30

  let dayNextFee = day
  let calculateMonth = month
  let calculateYear = year
  const sumDay = day + 15

  for (let i = 1; i <= numFees; i++) {
    if (i % 2 !== 0) {
      if (sumDay > 30) calculateMonth = calculateMonth + 1
    } else {
      if (sumDay <= 30) calculateMonth = calculateMonth + 1
    }

    if (calculateMonth > 12) {
        calculateMonth = 1
        calculateYear = calculateYear + 1
    }

    let dateFee2 = ""
    if (i % 2 === 0) {
      dateFee2 = `${utils.pad(calculateMonth)}/${utils.pad(dayNextFee)}/${calculateYear}`
      if (calculateMonth === 2 && dayNextFee > 28) dateFee2 = `02/28/${calculateYear}`
    } else {
      dateFee2 = `${utils.pad(calculateMonth)}/${utils.pad(dayFirstFee)}/${calculateYear}`
      if (calculateMonth === 2 && dayFirstFee > 28) dateFee2 = `02/28/${calculateYear}`
    }

    data.push(moment(dateFee2).format('DD-MM-YYYY'))
  }

  return data
}

function getByMonth(dateInit, numFees) {
  let date = moment(dateInit)

  let day = date.date()
  let month = date.month() + 1
  let year = date.year()

  let data = []

  if (day > 30) day = 30

  for (let i = 1; i <= numFees; i++){
    month = month + 1

    if (month > 12) {
      month = 1
      year = year + 1
    }

    let dateFee2 = month + "/" + day + "/" + year
    if (month === 2 && day > 28) dateFee2 = month + "/" + day + "/" + year

    data.push(moment(dateFee2).format('DD-MM-YYYY'))
  }

  return data;
}

function calculate (dateInit, numFees, type) {
  if (type === 1) return getByDay(dateInit, numFees, type)
  if (type === 8) return getByWeek(dateInit, numFees, type)
  if (type === 15) return getByFortnight(dateInit, numFees, type)
  if (type === 30) return getByMonth(dateInit, numFees, type)
}

export const calculateFees = {
  calculate
}
