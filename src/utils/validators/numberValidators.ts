export const numbersValidator = (value: number): number => {
  if (typeof value !== 'number') {
    throw new TypeError('El valor debe ser un valor numérico')
  }
  if (value < 0) {
    throw new TypeError('El número debe ser mayor a cero')
  }

  return value
}
