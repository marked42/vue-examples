export function itemValidator(item) {
  return item !== null && typeof item === 'object' && typeof item.label === 'string' && item.value
}

export function listItemsValidator(items) {
  if (!Array.isArray(items)) {
    return false
  }

  return items.every(item => itemValidator(item))
}
