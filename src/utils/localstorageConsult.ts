export function getItems<T>(nameVariable: string): T[] | [] {
  const itemsConsult = localStorage.getItem(nameVariable)
  return itemsConsult ? JSON.parse(itemsConsult) : []
}

export function postItems<T>(nameVariable: string, insertItems: T[]): void {
  localStorage.setItem(nameVariable, JSON.stringify(insertItems))
}
