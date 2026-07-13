const plan = document.querySelector<HTMLElement>('[data-action-plan]')

if (plan) {
  const scenarioButtons = Array.from(
    plan.querySelectorAll<HTMLButtonElement>('[data-scenario-button]')
  )
  const taskCards = Array.from(plan.querySelectorAll<HTMLElement>('[data-task-card]'))
  const checkboxes = Array.from(plan.querySelectorAll<HTMLInputElement>('[data-task-checkbox]'))
  const summary = plan.querySelector<HTMLElement>('[data-plan-summary]')
  const reset = plan.querySelector<HTMLButtonElement>('[data-plan-reset]')
  const liveRegion = document.querySelector<HTMLElement>('[data-live-region]')

  const selected = new Set<string>()

  const visibleCards = () => taskCards.filter((card) => !card.hidden)

  const updateSummary = (announcement?: string) => {
    const visible = visibleCards()
    const completed = visible.filter((card) => {
      const checkbox = card.querySelector<HTMLInputElement>('[data-task-checkbox]')
      return checkbox?.checked
    }).length

    if (summary) {
      const scope = selected.size === 0 ? '完整清單' : '已選情境清單'
      summary.textContent = `${scope}共 ${visible.length} 項，目前標記完成 ${completed} 項。完成數不是安全分數。`
    }

    if (announcement && liveRegion) liveRegion.textContent = announcement
  }

  const applyFilter = () => {
    taskCards.forEach((card) => {
      const scenarios = (card.dataset.scenarios ?? '').split(',')
      const matches =
        selected.size === 0 ||
        scenarios.includes('all') ||
        Array.from(selected).some((scenario) => scenarios.includes(scenario))
      card.hidden = !matches
    })

    plan.querySelectorAll<HTMLElement>('[data-task-group]').forEach((group) => {
      group.hidden = group.querySelectorAll('[data-task-card]:not([hidden])').length === 0
    })

    updateSummary()
  }

  scenarioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const scenario = button.dataset.scenarioButton
      if (!scenario) return

      if (selected.has(scenario)) selected.delete(scenario)
      else selected.add(scenario)

      button.setAttribute('aria-pressed', String(selected.has(scenario)))
      applyFilter()
      updateSummary(`${button.textContent?.trim()}情境${selected.has(scenario) ? '已選取' : '已取消'}`)
    })
  })

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const card = checkbox.closest<HTMLElement>('[data-task-card]')
      const title = card?.querySelector('strong')?.textContent ?? '任務'
      updateSummary(`${title}${checkbox.checked ? '已標記完成' : '已取消完成'}`)
    })
  })

  reset?.addEventListener('click', () => {
    selected.clear()
    scenarioButtons.forEach((button) => button.setAttribute('aria-pressed', 'false'))
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })
    applyFilter()
    updateSummary('情境選擇與完成標記已清除')
  })

  applyFilter()
}

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.hash.slice(1)
    const target = id ? document.getElementById(id) : null
    if (target instanceof HTMLDetailsElement) target.open = true
  })
})

