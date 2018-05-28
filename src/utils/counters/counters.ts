//  * structure of operations object
//  * {
//  *   inherits: { chapter: [1, 2, 3], section: [2, 3] },
//  *   fromParent: true | false,
//  *   resets: [ { name: 'chapter', value: 3 }, { name: 'section', value: 1 } ],
//  *   sets: [ { name: 'chapter', value: 3 }, { name: 'section', value: 1 } ],
//  *   increments: [ { name: 'chapter', value: 3 }, { name: 'section', value: 1 } ],
//  *   usage: {
//  *     counter: [ { name: 'chapter', style: counterStyles.none } ],
//  *     counters: [ { name: 'chapter', delimiter: '.', style: counterStyles.none } ],
//  *   }
//  * }

interface NestedCounters {
  [propName: string]: number[],
}

interface CounterAction {
  name: string,
  value: number;
}

type CounterActions = CounterAction[] | CounterAction

type CounterStyle = string

interface CounterFunctionConfig {
  name: string,
  style: CounterStyle,
}

interface CountersFunctionConfig {
  name: string,
  delimiter: string,
  style: CounterStyle,
}

interface CounterUsage {
  counter: CounterFunctionConfig[] | CounterFunctionConfig,
  counters: CountersFunctionConfig[] | CountersFunctionConfig,
}

interface CounterOperations {
  inherits: NestedCounters,
  fromParent: boolean,
  resets: CounterActions,
  sets: CounterActions,
  increments: CounterActions,
  usage: CounterUsage,
}

declare function processCounters(operations: CounterOperations): void
declare function processCountersResets(counters: NestedCounters, resets: CounterActions, fromParent: boolean): void
declare function processCountersSet(counters: NestedCounters, resets: CounterActions): void
declare function processCountersIncrements(counters: NestedCounters, resets: CounterActions): void
declare function processCountersUsage(counters: NestedCounters, usage: CounterUsage): void
declare function getInnermostCounterValue(counters: NestedCounters, name: string): number
declare function getNestedCounterValue(counters: NestedCounters, name:string): number
declare function getCounterString(counters: NestedCounters, name: string, style: CounterStyle): void
declare function getCountersString(counters: NestedCounters, name: string, delimiter: string, style: CounterStyle): void
type CounterActionType = 'counter-reset' | 'counter-set' | 'counter-increment'
declare function generateCounterCssRuleByType(counterActionType: CounterActionType, config: CounterActions): string
declare function generateCounterAllCssRule(config: CounterActions): string
