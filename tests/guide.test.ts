import { describe, expect, it } from 'vitest'
import { countCompleted, filterTasks, groupTasks, statusCounts } from '../src/lib/guide'

const tasks = [
  { id: 'all', scenarios: ['all'] as const, priority: 'now' as const },
  { id: 'read', scenarios: ['read'] as const, priority: 'next' as const },
  { id: 'publish', scenarios: ['publish'] as const, priority: 'help' as const },
]

describe('filterTasks', () => {
  it('returns every task when no scenario is selected', () => {
    expect(filterTasks(tasks, [])).toHaveLength(3)
  })

  it('keeps universal and selected scenario tasks', () => {
    expect(filterTasks(tasks, ['read']).map(({ id }) => id)).toEqual(['all', 'read'])
  })

  it('combines multiple selected scenarios without duplicates', () => {
    expect(filterTasks(tasks, ['read', 'publish']).map(({ id }) => id)).toEqual([
      'all',
      'read',
      'publish',
    ])
  })
})

describe('groupTasks', () => {
  it('groups tasks by action priority', () => {
    const grouped = groupTasks(tasks)
    expect(grouped.now[0]?.id).toBe('all')
    expect(grouped.next[0]?.id).toBe('read')
    expect(grouped.help[0]?.id).toBe('publish')
  })
})

describe('countCompleted', () => {
  it('only counts visible completed tasks', () => {
    expect(countCompleted(['all', 'read'], ['read', 'publish'])).toBe(1)
  })

  it('does not double count duplicated completed ids', () => {
    expect(countCompleted(['all'], ['all', 'all'])).toBe(1)
  })
})

describe('statusCounts', () => {
  it('counts known statuses and ignores unknown values', () => {
    expect(statusCounts(['verified', 'pending', 'verified', 'policy', 'other'])).toEqual({
      verified: 2,
      pending: 1,
      policy: 1,
    })
  })
})

