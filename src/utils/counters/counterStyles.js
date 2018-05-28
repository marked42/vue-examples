
export const counterStyles = {
  none: 'none',
  decimal: 'decimal',
}

export const COUNTER_STRING_STYLE_NONE = ''

// TODO: add more counter style support
export function generateCounterRepresentation(value, style = counterStyles.decimal) {
  // check for style support
  if (!Number.isInteger(value)) {
    value = Math.floor(Number(value))
  }

  switch (style) {
    case counterStyles.decimal:
      return String(value)
    case counterStyles.none:
      return ''
    default:
      return String(value)
  }
}
