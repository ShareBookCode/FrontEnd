# ShareBook

## Описание проекта

ShareBook — платформа для обмена книгами и другой печатной продукцией, на которой люди самостоятельно выставляют свои книги с целью обменять их на другие или безвозмездно отдать. Пользователь может найти нужную ему книгу, прочитать о ней, добавить в избранное и связаться с её владельцем через чат.

Прямых конкурентов у проекта нет, однако в мире уже давно развивается и набирает обороты такое явление как буккроссинг. Работает это так: в некоторых крупных городах есть точки, куда люди могут принести книги или взять себе имеющиеся там. Подход ShareBook имеет явные преимущества по сравнению с описанной концепцией: можно не выходя из дома посмотреть, какие книги доступны для обмена в твоём городе, выставить свои книги. Более того, благодаря возможности связи «отдающего» и «забирающего», есть возможность обмениваться книгами не навсегда, а на определённый срок — например, на неделю или на месяц.

ShareBook даёт книгам вторую жизнь, предотвращая их выбрасывание и тем самым снижая выбросы CO₂ путём сокращения объёмов производства: один и тот же экземпляр вместо того, чтобы пылиться на полке после прочтения, может быть прочитан ещё огромным количеством людей.

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

# Участие в разработке

Подробная информация об архитектуре проекта, стандартах разработки и CI описана в [docs/contributing.md](docs/contributing.md).