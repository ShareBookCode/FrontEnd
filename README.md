<<<<<<< HEAD
# ShareBookCode Frontend

Frontend-часть проекта ShareBookCode на `Next.js` с `App Router`.


## Важно про текущее состояние

- Архитектура проекта **не финальная** и будет дополняться по мере разработки.
- Некоторые разделы внизу пока оставлены только заголовками, чтобы структура документа была полной и могла постепенно заполняться.

## Стек технологий

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)


### Основные библиотеки

- `next` — фреймворк, роутинг и серверная часть App Router
- `react`, `react-dom` — UI-слой приложения
- `typescript` — типобезопасность
- `@reduxjs/toolkit`, `react-redux` — глобальное состояние
- `next-intl` — локализация интерфейса
- `@svgr/webpack` — импорт `.svg` как React-компонентов
- `axios` — клиент для HTTP-запросов
- `sass` — стили и переменные
- `clsx` — условное объединение CSS-классов

### Инструменты разработки

- `eslint`, `eslint-config-next` — линтинг кода
- `prettier`, `eslint-plugin-prettier`, `eslint-config-prettier` — форматирование кода
- `eslint-plugin-fsd-lint` — архитектурные правила FSD

## Требования

- `Node.js` 20+
- `pnpm` 9+

Проект принудительно использует `pnpm` (`preinstall: npx only-allow pnpm`).

## Быстрый старт

Минимальный набор команд, чтобы развернуть проект локально.

### 1) Установка зависимостей

```bash
pnpm install
```

### 2) Запуск в development

```bash
pnpm dev
```

После запуска приложение доступно по адресу `http://localhost:3000`.

### 3) Проверка линтинга

```bash
pnpm lint
```

### 4) Production-сборка (локально)

```bash
pnpm build
pnpm start
```

## Архитектура и структура проекта

Базовый подход — `Feature-Sliced Design`:

```text
src/
  app/        # маршруты, layout'ы, провайдеры
  features/   # пользовательские фичи
  widgets/    # крупные UI-блоки
  shared/     # переиспользуемый код, конфиги, стили, иконки
```

### Что где находится сейчас

- `src/app/(auth)` — страницы авторизации
- `src/app/(main)` — основные страницы приложения
- `src/app/providers` — `ReduxProvider`, `I18nProvider`
- `src/features/language-switcher` — переключение языка
- `src/widgets/header-main` — шапка приложения
- `src/shared/config/i18n` — локали и настройки i18n

### Маршруты (текущее состояние)

- `/sign-in` — страница авторизации
- `/sign-up` — страница регистрации
- `/forgot-password` — страница восстановления пароля
- `/` — главная страница
- `/favorites` — страница избранного
- `/chats` — страница чатов
- `/new-book` — страница создания нового объявления
- `/books/[bookId]` — страница книги
- `/profile` — страница профиля
- `/users/[userId]` — страница пользователя
- `/settings/account` — страница настроек аккаунта
- `/settings/about-myself` — страница настроек профиля

### Path aliases

Псевдонимы путей нужны для удобства импорта и избежания длинных относительных путей.

- `@/*` -> `src/*`
- `@app/*` -> `src/app/*`
- `@shared/*` -> `src/shared/*`
- `@widgets/*` -> `src/widgets/*`
- `@features/*` -> `src/features/*`
- `@providers/*` -> `src/app/providers/*`
- `@styles/*` -> `src/shared/styles/*`
- `@icons/*` -> `src/shared/icons/*`

## Локализация

Раздел описывает базовую i18n-конфигурацию.

- Поддерживаемые языки: `ru`, `en`
- Язык по умолчанию: `ru`
- Ключ cookie: `NEXT_LOCALE`

## Текущее состояние реализации

- `Redux` подключен, но store пока со stub reducer (`_stub`)
- Большинство страниц сейчас в виде базовых заготовок

## Стандарты разработки

Раздел фиксирует обязательные правила команды перед созданием Pull Request.

### Линтинг и форматирование

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

### FSD-правила, включенные в проекте

- `fsd-lint/no-public-api-sidestep` — нельзя обходить публичный API слайса и импортировать его внутренние файлы напрямую.
- `fsd-lint/forbidden-imports` — проверяет и запрещает импорты, которые нарушают правила слоев и связей в FSD.
- `fsd-lint/no-relative-imports` — нельзя использовать относительные импорты там, где по правилам проекта нужно использовать алиасы.
- `fsd-lint/no-cross-slice-dependency` — запрещает прямые зависимости между слайсами, если они не предусмотрены архитектурой.
- `fsd-lint/no-global-store-imports` — запрещает прямой импорт глобального store в местах, где это ломает изоляцию слоев.
- `fsd-lint/no-ui-in-business-logic` — запрещает смешивать UI-логику с бизнес-логикой.

### Именование веток

Используйте формат:

```text
FRONTEND-<номер_issue>
```

Пример: `FRONTEND-10`.

### Code review

- Перед слиянием изменений в `main` обязателен code review.
- Pull Request должен быть проверен и одобрен согласно правилам репозитория (сейчас это code review двумя разработчиками).
- Если в Pull Request есть замечания, их нужно исправить и повторно запросить review.

## CI

Раздел описывает автоматические проверки в репозитории.

GitHub Actions workflow `.github/workflows/main.yml` запускается на `push` и `pull_request` в `main` и выполняет:

- `pnpm install --frozen-lockfile`
- `pnpm run lint --max-warnings 0`

## CODEOWNERS

В этом разделе должны быть указаны актуальные владельцы кода (команды или пользователи), которые отвечают за ревью и сопровождение изменений в репозитории.
Раздел актуализируется после согласования команд и зон ответственности.

## Переменные окружения

В этом разделе должны быть перечислены все переменные окружения проекта: название, обязательность, пример значения и где эта переменная используется.

## Тестирование

В этом разделе должны быть описаны виды тестов в проекте, команды запуска и минимальные требования перед созданием Pull Request.

## API и интеграции

- Данные по книгам будут приходить по REST API.
- Финальный способ интеграции (контракты/клиентский слой/схема взаимодействия) пока не утвержден, команда тестирует варианты.
- Для авторизации пользователей будет использоваться отдельный сервис `Keycloak`.

### Документация

- Keycloak (официальная документация): `https://www.keycloak.org/documentation`
- Документация API сервиса книг: добавить ссылку после финализации backend-контракта (Swagger/OpenAPI или Confluence).

## Деплой

В этом разделе должны быть описаны окружения (dev/stage/prod), процесс деплоя, необходимые проверки перед релизом и ответственные за выпуск.
=======
# Стек технологий

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-%23242730?style=for-the-badge&logo=React)
![TypeScript](https://img.shields.io/badge/Typescript-%233178c7?style=for-the-badge&logo=Typescript&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-%23181818?style=for-the-badge&logoColor=white)
![Redux toolkit](https://img.shields.io/badge/Redux%20toolkit-%23583d88?style=for-the-badge&logo=redux&logoColor=white)
![Next-intl](https://img.shields.io/badge/Next%20intl-%2314213b?style=for-the-badge&logoColor=white)
![Sass](https://img.shields.io/badge/Saas-%23c04180?style=for-the-badge&logo=sass&logoColor=white)
![Svgr](https://img.shields.io/badge/Svgr-%2318171a?style=for-the-badge&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-%23363847?style=for-the-badge&logo=axios)
![Clsx](https://img.shields.io/badge/Clsx-yellow?style=for-the-badge)

## Основные библиотеки

- `next` — фреймворк, роутинг и серверная часть App Router
- `react`, `react-dom` — UI-слой приложения
- `typescript` — типобезопасность
- `msw` — моки данных
- `@reduxjs/toolkit`, `react-redux` — глобальное состояние
- `next-intl` — локализация интерфейса
- `@svgr/webpack` — импорт `.svg` как React-компонентов
- `axios` — клиент для HTTP-запросов
- `sass` — стили и переменные
- `clsx` — условное объединение CSS-классов

Проект принудительно использует `pnpm` (`preinstall: npx only-allow pnpm`).

# Быстрый старт

Минимальный набор команд, чтобы развернуть проект локально.

## 1) Установка зависимостей

```bash
pnpm install
```

## 2) Запуск в development

```bash
pnpm dev
```

После запуска приложение доступно по адресу `http://localhost:3000`.

## 3) Проверка линтинга

```bash
pnpm lint
```

## 4) Production-сборка (локально)

```bash
pnpm build
pnpm start
```

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
>>>>>>> f25ae38bc2c2c5fd97f96b21a81e343048e497c6
