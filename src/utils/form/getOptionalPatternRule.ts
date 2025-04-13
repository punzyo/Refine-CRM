interface PatternRule {
  value: RegExp
  message?: string
}

export function getOptionalPatternRule(rules?: { pattern?: PatternRule; validate?: any }) {
  if (!rules) return undefined

  return {
    ...rules,
    validate: (value: string) => {
      if (!value) return true

      const patternValid = rules.pattern ? rules.pattern.value.test(value) : true

      if (!patternValid) return rules.pattern?.message || '格式錯誤'

      if (typeof rules.validate === 'function') {
        return rules.validate(value)
      }

      return true
    },
  }
}
