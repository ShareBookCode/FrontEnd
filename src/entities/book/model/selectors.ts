import type { BookSchema } from './types'

interface PartialState {
  book: BookSchema
}

// Селекторы для каталога
export const selectBookCatalogItems = (state: PartialState) =>
  state.book.catalog.entities
export const selectBookCatalogIsLoading = (state: PartialState) =>
  state.book.catalog.isLoading
export const selectBookCatalogError = (state: PartialState) =>
  state.book.catalog.error
export const selectBookCatalogFilters = (state: PartialState) =>
  state.book.catalog.filters

// Селекторы для детальной страницы
export const selectBookDetailsData = (state: PartialState) =>
  state.book.details.data
export const selectBookDetailsIsLoading = (state: PartialState) =>
  state.book.details.isLoading
export const selectBookDetailsError = (state: PartialState) =>
  state.book.details.error
