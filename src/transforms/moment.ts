
export const cloneDate = (date: Date) => {
  return new Date(date.getTime())
}

export type HumanDate = ReturnType<typeof dateToHuman>
export const dateToHuman = (date: Date) => {
  const week = date.getDay()
  return {
    day: date.getDate(),
    week: week === 0 ? 7 : week,
    month: date.getMonth() + 1,
    year: date.getFullYear()
  }
}

export const isSameHumanDay = (target: HumanDate, target2: HumanDate) => {
  const isSameDay = target.day === target2.day
  const isSameMonth = target.month === target2.month
  const isSameYear = target.year === target2.year
  return isSameDay && isSameMonth && isSameYear
}

export const humanToDate = (humanDate: Omit<HumanDate, 'week'>) => {
  const date = new Date()
  date.setDate(humanDate.day)
  date.setFullYear(humanDate.year)
  date.setMonth(humanDate.month - 1)
  return date
}

export const humanDateToYMD = ({ year, month, day }: Partial<Omit<HumanDate, 'week'>>, separator = '-') => {
  const _month = month ? separator + String(month).padStart(2, '0') : ''
  const _day = day ? separator + String(day).padStart(2, '0') : ''
  return `${year}${_month}${_day}`
}

export const dateToYMD = (date: Date | string, separator?: string) => {
  const _date = typeof date === 'string' ? new Date(date) : date
  return humanDateToYMD(dateToHuman(_date), separator)
}

export const ymdToDate = (date: string) => {
  const [year, month, day] = date.split('-').map(Number)
  return humanToDate({ year, month, day })
}

export const toLocalString = (date: string) => {
  return date ? new Date(date).toLocaleString() : date
}
