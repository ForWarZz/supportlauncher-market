import '@/scss/pages/admin/home.scss'
import { CountUp } from 'countup.js'

document.addEventListener('DOMContentLoaded', () => {
  const usersCountEl = document.getElementById('users-count')
  const sellersCount = document.getElementById('sellers-count')
  const commandsCount = document.getElementById('commands-count')

  const counters: CountUp[] = []

  if (usersCountEl) applyCount(usersCountEl, counters)
  if (sellersCount) applyCount(sellersCount, counters)
  if (commandsCount) applyCount(commandsCount, counters)

  counters.forEach((cup) => {
    cup.start()
  })
})

function applyCount(el: HTMLElement, list: CountUp[]) {
  const textCount = el.dataset.count || ''
  const count = Number.parseInt(textCount)

  if (!Number.isNaN(count)) {
    el.innerText = '0'
    list.push(new CountUp(el, count))
  } else {
    el.innerText = '#'
  }
}
