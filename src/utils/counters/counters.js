const Counter = {
  counters: {},
  child: [],
}

const CounterReset = {
  name: '',
  value: 0,
}

const CounterSet = {
  name: '',
  value: 0,
}

const CounterIncrement = {
  name: '',
  value: 1,
}

const CounterOperation = {
  inherit: {},
  reset: [],
  set: [],
  increment: [],
}

const CounterResetDefaultValue = 0
const CounterSetDefaultValue = CounterResetDefaultValue
const CounterIncrementDefaultValue = 1

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
    inherit = {},
    resets = [],
    sets = [],
    increments = [],
  } = operations

  // inherit
  const counters = { ...inherit }

  processCountersResets(counters, resets)
  processCountersSets(counters, sets)
  processCountersIncrements(counters, increments)
}

function processCountersResets(counters, resets) {
  resets = convertToArray(resets)

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

function processCountersSets(counters, sets) {
  sets = convertToArray(sets)

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
}

function processCountersIncrements(counters, increments) {
  increments = convertToArray(increments)

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
}

const CounterStyles = {
  none: 0,
  decimal: 1,
}

const COUNTER_STRING_STYLE_NONE = ''

function generateCounterRepresentation(value, style = CounterStyles.decimal) {
  // check for style support
  if (!Number.isInteger(value)) {
    value = Math.floor(Number(value))
  }

  return String(value)
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
  if (style === CounterStyles.none) {
    return COUNTER_STRING_STYLE_NONE
  }

  const counterValue = getInnermostCounterValue(counters, name)

  return generateCounterRepresentation(counterValue, style)
}

export function getCountersString(counters, name, delimiter, style) {
  if (style === CounterStyles.none) {
    return COUNTER_STRING_STYLE_NONE
  }

  const nestedCounterValue = getNestedCounterValue(counters, name)

  return nestedCounterValue.map(counterValue => generateCounterRepresentation(counterValue, style)).join(delimiter)
}
