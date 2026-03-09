import { fixupPluginRules } from '@eslint/compat'
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'

import { baseEslintConfig } from '@packages/config/eslint/base'

export default tseslint.config(
  {
    ignores: ['.next/**', 'next-env.d.ts', '.open-next/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  ...baseEslintConfig,
)
