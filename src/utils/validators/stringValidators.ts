export const stringValidator = (value: string): string => {
  if (typeof value !== 'string') {
    throw new TypeError('El valor debe ser una cadena de texto')
  }
  if (value.trim() === '' || value === undefined) {
    throw new TypeError('No se permite enviar valores vacíos')
  }

  return value.trim()
}
