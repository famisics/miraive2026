import { baseEslintConfig } from '@packages/config/eslint/base'

export default [
  {
    ignores: ['dist/**', '.wrangler/**'],
  },
  ...baseEslintConfig,
]
