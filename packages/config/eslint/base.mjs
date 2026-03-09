import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

export const importOrderRules = {
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'index'],
      'newlines-between': 'always',
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      pathGroups: [
        { pattern: '@packages/**', group: 'internal', position: 'before' },
        { pattern: '@web/**', group: 'internal', position: 'after' },
        { pattern: '@api/**', group: 'internal', position: 'after' },
        { pattern: '**/*.module.css', group: 'index', position: 'after' },
        { pattern: '**/*.css', group: 'index', position: 'after' },
      ],
    },
  ],
}

export const baseEslintConfig = tseslint.config(
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importOrderRules,
    },
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...importOrderRules,
    },
  },
)

export default baseEslintConfig
