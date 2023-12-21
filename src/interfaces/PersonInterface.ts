export type stateTypes = 'complete' | 'incomplete'

export interface Task {
  id: number
  name: string
  state: stateTypes
}

export type taskEdit = Omit<Task, 'state'>
