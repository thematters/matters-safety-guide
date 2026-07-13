export type ScenarioId = 'read' | 'participate' | 'publish' | 'money'
export type TaskPriority = 'now' | 'next' | 'help'

export interface GuideTask {
  id: string
  scenarios: ReadonlyArray<ScenarioId | 'all'>
  priority: TaskPriority
}

export function filterTasks<T extends GuideTask>(
  tasks: readonly T[],
  selectedScenarios: readonly ScenarioId[]
): T[] {
  if (selectedScenarios.length === 0) return [...tasks]

  return tasks.filter(
    (task) =>
      task.scenarios.includes('all') ||
      selectedScenarios.some((scenario) => task.scenarios.includes(scenario))
  )
}

export function groupTasks<T extends GuideTask>(tasks: readonly T[]): Record<TaskPriority, T[]> {
  return {
    now: tasks.filter((task) => task.priority === 'now'),
    next: tasks.filter((task) => task.priority === 'next'),
    help: tasks.filter((task) => task.priority === 'help'),
  }
}

export function countCompleted(visibleIds: string[], completedIds: string[]): number {
  const completed = new Set(completedIds)
  return visibleIds.filter((id) => completed.has(id)).length
}

export function statusCounts(statuses: string[]) {
  return statuses.reduce(
    (counts, status) => {
      if (status === 'verified') counts.verified += 1
      if (status === 'pending') counts.pending += 1
      if (status === 'policy') counts.policy += 1
      return counts
    },
    { verified: 0, pending: 0, policy: 0 }
  )
}
