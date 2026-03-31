# Архитектура и структура проекта

Базовый подход — `Feature-Sliced Design`:

```text
src/
  app/        # маршруты, layout'ы, провайдеры
  widgets/    # большие самодостаточные компоненты куски функциональности или интерфейса
  features/   # пользовательские фичи
  entities/   # бизнес-сущности, с которыми работает проект, например book
  shared/     # переиспользуемый код, конфиги, стили, иконки
```

## Что где находится сейчас

- `src/mocks` - моки для проекта
- `src/app/(auth)` — страницы авторизации
- `src/app/(main)` — основные страницы приложения
- `src/app/providers` — `ReduxProvider`, `I18nProvider`, `MSWProvider`
- `src/shared/assets` - шрифты, иконки и изображения
- `src/shared/styles` - базовые стили и часто используемые css переменные

## Path aliases

Псевдонимы путей нужны для удобства импорта и избежания длинных относительных путей.

- `@/*` -> `src/*`
- `@mocks/*` -> `src/mocks/*`
- `@app/*` -> `src/app/*`
- `@shared/*` -> `src/shared/*`
- `@widgets/*` -> `src/widgets/*`
- `@features/*` -> `src/features/*`
- `@entities/*` -> `src/entities/*`
- `@providers/*` -> `src/app/providers/*`
- `@styles/*` -> `src/shared/styles/*`
- `@icons/*` -> `src/shared/assets/icons/*`
- `@fonts/*` -> `src/shared/assets/fonts/*`

## Именование файлов

Если в папке ui только один .tsx файл и один файл .module.scss, то именуем их ui

Пример:

```text
ui/
  ui.tsx
  ui.module.scss
```

# Стандарты разработки

Раздел фиксирует обязательные правила команды перед созданием Pull Request.

## Линтинг и форматирование

- ESLint: `eslint.config.mjs`
- Prettier: `.prettierrc`
  - Без точек с запятой (`semi: false`)
  - Одинарные кавычки (`singleQuote: true`)
  - Одинарные кавычки в JSX (`jsxSingleQuote: true`)
  - Пробелы в объектах (`bracketSpacing: true`)
  - Запятые везде (`trailingComma: "all"`)
  - Длина строки: 80 символов (`printWidth: 80`)
  - Отступы: 2 пробела (`tabWidth: 2`)
  - Стрелочные функции без скобок для одного параметра (`arrowParens: "avoid"`)
  - Unix-стиль переносов строк (`endOfLine: "lf"`)
- FSD-правила: `eslint-plugin-fsd-lint`

## FSD-правила, включенные в проекте

- `fsd-lint/no-public-api-sidestep` — нельзя обходить публичный API слайса и импортировать его внутренние файлы напрямую.
- `fsd-lint/forbidden-imports` — проверяет и запрещает импорты, которые нарушают правила слоев и связей в FSD.
- `fsd-lint/no-relative-imports` — нельзя использовать относительные импорты там, где по правилам проекта нужно использовать алиасы.
- `fsd-lint/no-cross-slice-dependency` — запрещает прямые зависимости между слайсами, если они не предусмотрены архитектурой.
- `fsd-lint/no-global-store-imports` — запрещает прямой импорт глобального store в местах, где это ломает изоляцию слоев.
- `fsd-lint/no-ui-in-business-logic` — запрещает смешивать UI-логику с бизнес-логикой.

## Именование веток

Используйте формат:

```text
FRONTEND-<номер_issue>
```

Пример: `FRONTEND-10`.

## Именование коммитов

Каждый коммит должен иметь осмысленное название в формате:

```text
<type>: <короткое описание>
```

Типы коммитов:

• feat — новая функциональность

• fix — исправление бага

• refactor — переработка кода без изменения поведения

Примеры:

```
feat: add user profile page
fix: correct login validation
refactor: split API logic into services
```

# CI

Раздел описывает автоматические проверки в репозитории.

GitHub Actions workflow `.github/workflows/main.yml` запускается на `push` и `pull_request` в `main` и выполняет:

- `pnpm install --frozen-lockfile`
- `pnpm run lint --max-warnings 0`
