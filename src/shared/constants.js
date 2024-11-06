export const MONTHS = new Map([
  [1, 'Ene'],
  [2, 'Feb'],
  [3, 'Mar'],
  [4, 'Abr'],
  [5, 'May'],
  [6, 'Jun'],
  [7, 'Jul'],
  [8, 'Ago'],
  [9, 'Sep'],
  [10, 'Oct'],
  [11, 'Nov'],
  [12, 'Dic']
])

export const MONTHS_LONG = new Map([
  [1, 'Enero'],
  [2, 'Febrero'],
  [3, 'Marzo'],
  [4, 'Abril'],
  [5, 'Mayo'],
  [6, 'Junio'],
  [7, 'Julio'],
  [8, 'Agosto'],
  [9, 'Septiembre'],
  [10, 'Octubre'],
  [11, 'Noviembre'],
  [12, 'Diciembre']
])

export function monthsToString (month) {
  return MONTHS.get(month)
}

export function monthsLongToString (month) {
  return MONTHS_LONG.get(month)
}

export const TYPE_MAXI = 1
export const TYPE_MINI = 2
export const TYPE_OTHERS = 3
