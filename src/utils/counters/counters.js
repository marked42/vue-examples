// refer to spec https://drafts.csswg.org/css-lists-3/#auto-numbering
import {
  counterStyles,
  generateCounterRepresentation,
  COUNTER_STRING_STYLE_NONE,
} from './counterStyles'

function convertToArray(value) {
  if (Array.isArray(value)) {
    return value
  }

  return value ? [value] : []
}

export function processCounters(operations) {
  if (typeof operations !== 'object') {
    return {}
  }

  const {
    inherits = {},
    resets = [],
    sets = [],
    increments = [],
  } = operations

  // inherit
  const counters = { ...inherits }

  processCountersResets(counters, resets)
  processCountersSets(counters, sets)
  processCountersIncrements(counters, increments)

  return counters
}

export function processCountersResets(counters, resets) {
  resets = convertToArray(resets)

  const CounterResetDefaultValue = 0

  for (let i = 0; i < resets.length; i++) {
    const reset = resets[i]
    const { name, value = CounterResetDefaultValue } = reset

    if (!checkCounterNameAndValue(name, value)) {
      console.error(`reset should have name and value property, instead is ${JSON.stringify(reset)}`)
      continue
    }

    if (counters[name] === undefined) {
      counters[name] = [value]
    } else if (Array.isArray(counters[name])) {
      counters[name].push(value)
    } else {
      console.error(`counters[${name}] should be undefined or Array, instead is ${counters[name]}`)
    }
  }

  return counters
}

function checkCounterNameAndValue(name, value) {
  return typeof name === 'string' && Number.isInteger(value)
}

export function processCountersSets(counters, sets) {
  sets = convertToArray(sets)

  const CounterSetDefaultValue = 0

  for (let i = 0; i < sets.length; i++) {
    const set = sets[i]
    const { name, value = CounterSetDefaultValue } = set

    if (!checkCounterNameAndValue(name, value)) {
      console.error(`set should have name and value property, instead is ${JSON.stringify(set)}`)
      continue
    }

    if (counters[name] === undefined) {
      // create new one if counter of name doesn't exist
      counters[name] = [value]
    } else if (Array.isArray(counters[name]) && counters[name].length > 0) {
      const nestedCounterArray = counters[name]

      nestedCounterArray[nestedCounterArray.length - 1] = value
    } else {
      console.error(`counters[${name}] should be undefined or Array, instead is ${counters[name]}`)
    }
  }

  return counters
}

export function processCountersIncrements(counters, increments) {
  increments = convertToArray(increments)

  const CounterIncrementDefaultValue = 1

  for (let i = 0; i < increments.length; i++) {
    const increment = increments[i]
    const { name, value = CounterIncrementDefaultValue } = increment

    if (!checkCounterNameAndValue(name, value)) {
      console.error(`set should have name and value property, instead is ${JSON.stringify(set)}`)
      continue
    }

    if (counters[name] === undefined) {
      // create new one if counter of name doesn't exist
      counters[name] = [value]
    } else if (Array.isArray(counters[name]) && counters[name].length > 0) {
      const nestedCounterArray = counters[name]

      nestedCounterArray[nestedCounterArray.length - 1] += value
    } else {
      console.error(`counters[${name}] should be undefined or Array, instead is ${counters[name]}`)
    }
  }

  return counters
}

export function getInnermostCounterValue(counters, name) {
  if (typeof counters !== 'object') {
    console.error(`counters must be an object, instead ${JSON.stringify(counters)}`)
  }

  const nestedCounterArray = counters[name]
  const valid = Array.isArray(nestedCounterArray) && nestedCounterArray.length > 0
  const defaultCounterValue = 0

  return valid ? Number(nestedCounterArray[nestedCounterArray.length - 1]) : defaultCounterValue
}

export function getNestedCounterValue(counters, name) {
  if (typeof counters !== 'object') {
    console.error(`counters must be an object, instead ${JSON.stringify(counters)}`)
  }

  const nestedCounterArray = counters[name]
  const valid = Array.isArray(nestedCounterArray) && nestedCounterArray.length > 0
  const defaultCounterValue = 0

  return valid ? nestedCounterArray.map(value => Number(value)) : [defaultCounterValue]
}

export function getCounterString(counters, name, style) {
  if (style === counterStyles.none) {
    return COUNTER_STRING_STYLE_NONE
  }

  const counterValue = getInnermostCounterValue(counters, name)

  return generateCounterRepresentation(counterValue, style)
}

/**
 * when style is not supported, the spec says implementation should fallback to decimal
 * style.
 *
 * 1. Firefox considers counters() function with unsupported style as valid, and follows
 *    the spec. So counters [1, 2, 3] would generate '1.2.3'.
 * 2. Chrome considers counters() function with unsupported style as invalid, and this rule
 *    is ignored, so result is an empty string.
 * 3. This implementation follows the spec, refer to  CSS Counter Styles Level 3
 *    https://drafts.csswg.org/css-counter-styles-3/#generate-a-counter.
 *
 * @export
 * @param {any} counters
 * @param {any} name
 * @param {any} delimiter
 * @param {any} style,
 * @returns modified counters
 */
export function getCountersString(counters, name, delimiter, style) {
  if (style === counterStyles.none) {
    return COUNTER_STRING_STYLE_NONE
  }

  const nestedCounterValue = getNestedCounterValue(counters, name)

  return nestedCounterValue.map(counterValue => generateCounterRepresentation(counterValue, style)).join(delimiter)
}
