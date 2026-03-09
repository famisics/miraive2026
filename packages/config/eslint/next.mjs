import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'

import { importOrderRules } from './base.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export const nextEslintConfig = [
  {
    ignores: ['.next/**', 'next-env.d.ts', '.open-next/**'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      ...importOrderRules,
    },
  },
]

export default nextEslintConfig
