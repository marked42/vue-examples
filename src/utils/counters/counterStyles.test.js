import {
  counterStyles,
  generateCounterRepresentation,
} from './counterStyles'

describe('generateCounterRepresentation', () => {
  it('should return empty string when style is none', () => {
    expect(generateCounterRepresentation(0, counterStyles.none)).toEqual('')
  })

  it('should fallback to decimal when style is not supported', () => {
    const unsupportedStyle = -1

    expect(generateCounterRepresentation(0, unsupportedStyle)).toEqual('0')
  })

  it('should generate decimal representation of counter value by default', () => {
    expect(generateCounterRepresentation(0)).toEqual('0')
  })

  it('should generate decimal representation correctly', () => {
    expect(generateCounterRepresentation(0, counterStyles.decimal)).toEqual('0')
  })
})
