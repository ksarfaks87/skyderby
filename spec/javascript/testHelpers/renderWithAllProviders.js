import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { createStore } from 'redux/store'
import TranslationsProvider from 'components/TranslationsProvider'

export const queryClient = new QueryClient()

const renderWithAllProviders = (ui, initialState) => {
  const store = createStore(initialState)
  const history = createMemoryHistory()

  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TranslationsProvider>
          <Router history={history}>{ui}</Router>
        </TranslationsProvider>
      </Provider>
    </QueryClientProvider>
  )

  return { ...screen, history }
}

export default renderWithAllProviders
