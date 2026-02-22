import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import fsdPlugin from 'eslint-plugin-fsd-lint'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
      'fsd-lint': fsdPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',

      // для react компонентов использовать только function-declaration
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression',
        },
      ],

      // Архитектурные правила FSD
      'fsd-lint/no-public-api-sidestep': 'error',
      'fsd-lint/forbidden-imports': 'error',
      'fsd-lint/no-relative-imports': 'error',
      'fsd-lint/no-cross-slice-dependency': 'error',
      'fsd-lint/no-global-store-imports': 'error',
      'fsd-lint/no-ui-in-business-logic': 'error',
      'fsd-lint/ordered-imports': 'warn',
    },
  },

  // во всех ts файлах разрешены только стрелочные функции
  {
    files: ['**/*.ts'],
    rules: {
      'func-style': ['warn', 'expression', { allowArrowFunctions: true }],
    },
  },

  // Исключения для корректной работы Next.js App Router и Shared слоя
  {
    files: [
      'src/app/**/*.{ts,tsx}',
      'src/shared/**/*.{ts,tsx}',
      '**/*.test.{ts,tsx}',
    ],
    rules: {
      'fsd-lint/forbidden-imports': 'off',
      'fsd-lint/no-cross-slice-dependency': 'off',
      'fsd-lint/no-global-store-imports': 'off',
    },
  },

  prettierConfig,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/mockServiceWorker.js',
  ]),
])

export default eslintConfig
